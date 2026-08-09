import type { SQSEvent, SQSRecord } from 'aws-lambda'
import { describe, expect, it, vi } from 'vitest'
import { createDeliveryHandler } from '../lambda/contact-delivery.js'
import { SUPPORT_DESTINATION, type OutgoingEmail } from '../lambda/contact-templates.js'

const CONTACT = {
  version: 1 as const,
  requestId: '11111111-2222-4333-8444-555555555555',
  receivedAt: '2026-08-02T12:00:00.000Z',
  name: 'Élodie <Architecte>',
  email: 'elodie@example.com',
  subject: 'Question architecture',
  message: 'Voici mon message privé avec <script>alert(1)</script>.',
  locale: 'fr' as const,
}

function event(body: unknown, messageId = 'message-1'): SQSEvent {
  return {
    Records: [{
      messageId,
      body: typeof body === 'string' ? body : JSON.stringify(body),
    } as SQSRecord],
  }
}

describe('contact delivery handler', () => {
  it('sends the fixed support notification followed by a localized visitor receipt', async () => {
    const sent: OutgoingEmail[] = []
    const handler = createDeliveryHandler({ sendEmail: vi.fn(async (email) => { sent.push(email) }) })

    const result = await handler(event(CONTACT))

    expect(result).toEqual({ batchItemFailures: [] })
    expect(sent).toHaveLength(2)
    expect(sent[0]).toMatchObject({
      to: SUPPORT_DESTINATION,
      replyTo: 'elodie@example.com',
      tags: { kind: 'support', locale: 'fr' },
    })
    expect(sent[0]?.html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;')
    expect(sent[0]?.html).not.toContain('<script>alert(1)</script>')
    expect(sent[1]).toMatchObject({
      to: 'elodie@example.com',
      subject: 'Nous avons bien reçu votre message — MapleSpire',
      tags: { kind: 'receipt', locale: 'fr' },
    })
    expect(sent[1]?.html).toContain('Bonjour Élodie &lt;Architecte&gt;')
    expect(sent[1]?.html).not.toContain(CONTACT.message)
    expect(sent[1]?.text).not.toContain(CONTACT.message)
  })

  it('uses the English acknowledgement for an English submission', async () => {
    const sent: OutgoingEmail[] = []
    const handler = createDeliveryHandler({ sendEmail: vi.fn(async (email) => { sent.push(email) }) })

    await handler(event({ ...CONTACT, locale: 'en', name: 'Ada' }))

    expect(sent[1]?.subject).toBe('We received your message — MapleSpire')
    expect(sent[1]?.html).toContain('Hello Ada')
  })

  it('reports a partial batch failure so SQS retries any failed delivery', async () => {
    let calls = 0
    const handler = createDeliveryHandler({
      sendEmail: vi.fn(async () => {
        calls += 1
        if (calls === 2) throw new Error('SES throttled')
      }),
    })
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    const result = await handler(event(CONTACT, 'retry-me'))

    expect(result).toEqual({ batchItemFailures: [{ itemIdentifier: 'retry-me' }] })
    expect(errorSpy).toHaveBeenCalledWith('contact.delivery.failed', {
      messageId: 'retry-me',
      error: 'SES throttled',
    })
  })

  it('sends malformed queue records to retry and eventually the DLQ without calling SES', async () => {
    const sendEmail = vi.fn(async () => undefined)
    const handler = createDeliveryHandler({ sendEmail })
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    const result = await handler(event('{not-json', 'poison'))

    expect(result).toEqual({ batchItemFailures: [{ itemIdentifier: 'poison' }] })
    expect(sendEmail).not.toHaveBeenCalled()
  })
})
