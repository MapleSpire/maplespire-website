import { randomUUID, timingSafeEqual } from 'node:crypto'
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import type { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'
import {
  CONTACT_BODY_MAX_BYTES,
  ContactSubmissionSchema,
  type ContactQueueMessage,
} from './contact-schema.js'

const sqs = new SQSClient({})

export interface SubmitDependencies {
  now: () => number
  newRequestId: () => string
  maximumSubmitAgeMs: number
  originVerifyToken: string
  enqueue: (message: ContactQueueMessage) => Promise<void>
}

function positiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

async function enqueueWithSqs(message: ContactQueueMessage): Promise<void> {
  const queueUrl = process.env.CONTACT_QUEUE_URL
  if (!queueUrl) throw new Error('CONTACT_QUEUE_URL is not configured')
  await sqs.send(new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(message),
  }))
}

const defaultDependencies: SubmitDependencies = {
  now: Date.now,
  newRequestId: randomUUID,
  maximumSubmitAgeMs: positiveInteger(process.env.MAXIMUM_SUBMIT_AGE_MS, 86_400_000),
  originVerifyToken: process.env.ORIGIN_VERIFY_TOKEN ?? '',
  enqueue: enqueueWithSqs,
}

function tokenMatches(provided: string | undefined, expected: string): boolean {
  if (!provided || !expected) return false
  const left = Buffer.from(provided, 'utf8')
  const right = Buffer.from(expected, 'utf8')
  return left.length === right.length && timingSafeEqual(left, right)
}

function json(statusCode: number, body: Record<string, unknown>): APIGatewayProxyStructuredResultV2 {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
    body: JSON.stringify(body),
  }
}

function decodedBody(event: APIGatewayProxyEventV2): string | null {
  if (typeof event.body !== 'string') return null
  try {
    return event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body
  } catch {
    return null
  }
}

export function createSubmitHandler(overrides: Partial<SubmitDependencies> = {}) {
  const dependencies = { ...defaultDependencies, ...overrides }

  return async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {
    if (!dependencies.originVerifyToken) {
      console.error('contact.submit.origin_verification_not_configured')
      return json(503, { error: 'Contact service temporarily unavailable' })
    }
    const originToken = event.headers?.['x-maplespire-origin-verify']
      ?? event.headers?.['X-MapleSpire-Origin-Verify']
    if (!tokenMatches(originToken, dependencies.originVerifyToken)) {
      return json(404, { error: 'Not found' })
    }

    const contentType = event.headers?.['content-type'] ?? event.headers?.['Content-Type'] ?? ''
    if (!contentType.toLowerCase().startsWith('application/json')) {
      return json(415, { error: 'Content-Type must be application/json' })
    }

    const raw = decodedBody(event)
    if (raw === null || Buffer.byteLength(raw, 'utf8') > CONTACT_BODY_MAX_BYTES) {
      return json(400, { error: 'Invalid request' })
    }

    let input: unknown
    try {
      input = JSON.parse(raw)
    } catch {
      return json(400, { error: 'Invalid request' })
    }
    const parsed = ContactSubmissionSchema.safeParse(input)
    if (!parsed.success) return json(400, { error: 'Invalid request' })

    const now = dependencies.now()
    const age = now - parsed.data.startedAt
    if (age < -30_000 || age > dependencies.maximumSubmitAgeMs) {
      return json(400, { error: 'Invalid request timing' })
    }

    const requestId = dependencies.newRequestId()
    // Silent acceptance avoids teaching automated submitters how to bypass the
    // two low-cost bot signals. Nothing is queued in either case.
    if (parsed.data.website.length > 0) {
      return json(202, { accepted: true, requestId })
    }

    const message: ContactQueueMessage = {
      version: 1,
      requestId,
      receivedAt: new Date(now).toISOString(),
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      subject: parsed.data.subject,
      message: parsed.data.message,
      locale: parsed.data.locale,
    }

    try {
      await dependencies.enqueue(message)
      return json(202, { accepted: true, requestId })
    } catch (error) {
      // Never log the request body, name, email or subject.
      console.error('contact.submit.enqueue_failed', {
        requestId,
        error: error instanceof Error ? error.message : String(error),
      })
      return json(503, { error: 'Contact service temporarily unavailable', requestId })
    }
  }
}

export const handler = createSubmitHandler()
