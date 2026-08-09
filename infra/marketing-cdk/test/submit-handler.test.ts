import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { describe, expect, it, vi } from 'vitest'
import { createSubmitHandler, type SubmitDependencies } from '../lambda/contact-submit.js'

const NOW = Date.parse('2026-08-02T12:00:00.000Z')
const REQUEST_ID = '11111111-2222-4333-8444-555555555555'
const ORIGIN_TOKEN = 'test-cloudfront-origin-verification-token'

function event(body: unknown, overrides: Partial<APIGatewayProxyEventV2> = {}): APIGatewayProxyEventV2 {
  const { headers, ...eventOverrides } = overrides
  return {
    version: '2.0',
    routeKey: 'POST /api/contact',
    rawPath: '/api/contact',
    rawQueryString: '',
    headers: {
      'content-type': 'application/json',
      'x-maplespire-origin-verify': ORIGIN_TOKEN,
      ...headers,
    },
    requestContext: {} as APIGatewayProxyEventV2['requestContext'],
    isBase64Encoded: false,
    body: JSON.stringify(body),
    ...eventOverrides,
  }
}

function createTestHandler(overrides: Partial<SubmitDependencies> = {}) {
  return createSubmitHandler({ originVerifyToken: ORIGIN_TOKEN, ...overrides })
}

function validBody() {
  return {
    name: '  Ada Lovelace  ',
    email: ' ADA@EXAMPLE.COM ',
    subject: ' Self-hosting question ',
    message: 'Could you help our team evaluate self-hosting MapleSpire?',
    locale: 'en',
    consent: true,
    startedAt: NOW - 5_000,
    website: '',
  }
}

function bodyOf(result: { body?: string }) {
  return JSON.parse(result.body ?? '{}') as Record<string, unknown>
}

describe('contact submit handler', () => {
  it('rejects direct execute-api requests that do not carry the CloudFront origin token', async () => {
    const enqueue = vi.fn(async () => undefined)
    const handler = createTestHandler({ now: () => NOW, enqueue })

    const result = await handler(event(validBody(), {
      headers: { 'x-maplespire-origin-verify': undefined },
    }))

    expect(result.statusCode).toBe(404)
    expect(enqueue).not.toHaveBeenCalled()
  })

  it('strictly validates, normalizes and durably enqueues an accepted contact', async () => {
    const enqueue = vi.fn(async () => undefined)
    const handler = createTestHandler({
      now: () => NOW,
      newRequestId: () => REQUEST_ID,
      maximumSubmitAgeMs: 86_400_000,
      enqueue,
    })

    const result = await handler(event(validBody()))

    expect(result.statusCode).toBe(202)
    expect(bodyOf(result)).toEqual({ accepted: true, requestId: REQUEST_ID })
    expect(result.headers).toMatchObject({ 'cache-control': 'no-store' })
    expect(enqueue).toHaveBeenCalledOnce()
    expect(enqueue).toHaveBeenCalledWith({
      version: 1,
      requestId: REQUEST_ID,
      receivedAt: '2026-08-02T12:00:00.000Z',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      subject: 'Self-hosting question',
      message: 'Could you help our team evaluate self-hosting MapleSpire?',
      locale: 'en',
    })
  })

  it('accepts the website contract with an optional company', async () => {
    const enqueue = vi.fn(async () => undefined)
    const handler = createTestHandler({
      now: () => NOW,
      newRequestId: () => REQUEST_ID,
      enqueue,
    })
    const body = validBody()
    const websiteBody = {
      name: body.name,
      email: body.email,
      company: 'Analytical Engines Inc.',
      subject: body.subject,
      message: body.message,
      website: body.website,
      locale: body.locale,
      consent: body.consent,
      startedAt: body.startedAt,
    }

    const result = await handler(event(websiteBody))

    expect(result.statusCode).toBe(202)
    expect(enqueue).toHaveBeenCalledWith(expect.objectContaining({
      company: 'Analytical Engines Inc.',
      subject: 'Self-hosting question',
    }))
  })

  it('does not discard a valid fast human submission', async () => {
    const enqueue = vi.fn(async () => undefined)
    const handler = createTestHandler({ now: () => NOW, enqueue })

    const result = await handler(event({ ...validBody(), startedAt: NOW }))

    expect(result.statusCode).toBe(202)
    expect(enqueue).toHaveBeenCalledOnce()
  })

  it.each([
    ['consent', ({ consent: _consent, ...body }: ReturnType<typeof validBody>) => body],
    ['subject', ({ subject: _subject, ...body }: ReturnType<typeof validBody>) => body],
  ])('requires %s', async (_field, omitField) => {
    const enqueue = vi.fn(async () => undefined)
    const handler = createTestHandler({ now: () => NOW, enqueue })

    const result = await handler(event(omitField(validBody())))

    expect(result.statusCode).toBe(400)
    expect(enqueue).not.toHaveBeenCalled()
  })

  it('rejects unknown fields and malformed requests instead of accepting a loose payload', async () => {
    const enqueue = vi.fn(async () => undefined)
    const handler = createTestHandler({ now: () => NOW, enqueue })

    const result = await handler(event({ ...validBody(), admin: true }))

    expect(result.statusCode).toBe(400)
    expect(enqueue).not.toHaveBeenCalled()
  })

  it('requires JSON and refuses oversized bodies before parsing them', async () => {
    const handler = createTestHandler({ now: () => NOW, enqueue: vi.fn(async () => undefined) })
    const wrongType = await handler(event(validBody(), { headers: { 'content-type': 'text/plain' } }))
    const oversized = await handler(event(validBody(), { body: 'x'.repeat(16 * 1024 + 1) }))

    expect(wrongType.statusCode).toBe(415)
    expect(oversized.statusCode).toBe(400)
  })

  it('silently accepts but does not enqueue a filled honeypot', async () => {
    const enqueue = vi.fn(async () => undefined)
    const handler = createTestHandler({
      now: () => NOW,
      newRequestId: () => REQUEST_ID,
      enqueue,
    })

    const result = await handler(event({ ...validBody(), website: 'https://spam.example' }))

    expect(result.statusCode).toBe(202)
    expect(bodyOf(result)).toEqual({ accepted: true, requestId: REQUEST_ID })
    expect(enqueue).not.toHaveBeenCalled()
  })

  it('rejects stale and future timestamps', async () => {
    const handler = createTestHandler({
      now: () => NOW,
      maximumSubmitAgeMs: 60_000,
      enqueue: vi.fn(async () => undefined),
    })

    expect((await handler(event({ ...validBody(), startedAt: NOW - 60_001 }))).statusCode).toBe(400)
    expect((await handler(event({ ...validBody(), startedAt: NOW + 30_001 }))).statusCode).toBe(400)
  })

  it('returns a retriable service error rather than claiming success when enqueue fails', async () => {
    const handler = createTestHandler({
      now: () => NOW,
      newRequestId: () => REQUEST_ID,
      enqueue: vi.fn(async () => { throw new Error('queue unavailable') }),
    })
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    const result = await handler(event(validBody()))

    expect(result.statusCode).toBe(503)
    expect(bodyOf(result)).toEqual({
      error: 'Contact service temporarily unavailable',
      requestId: REQUEST_ID,
    })
    expect(errorSpy).toHaveBeenCalledWith('contact.submit.enqueue_failed', {
      requestId: REQUEST_ID,
      error: 'queue unavailable',
    })
  })
})
