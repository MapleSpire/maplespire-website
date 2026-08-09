import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
import type { SQSBatchResponse, SQSEvent } from 'aws-lambda'
import { ContactQueueMessageSchema } from './contact-schema.js'
import {
  DEFAULT_EMAIL_FROM,
  supportNotification,
  visitorReceipt,
  type OutgoingEmail,
} from './contact-templates.js'

const ses = new SESv2Client({})

export interface DeliveryDependencies {
  sendEmail: (email: OutgoingEmail) => Promise<void>
}

async function sendWithSes(email: OutgoingEmail): Promise<void> {
  const source = process.env.EMAIL_FROM ?? DEFAULT_EMAIL_FROM
  await ses.send(new SendEmailCommand({
    FromEmailAddress: source,
    Destination: { ToAddresses: [email.to] },
    ReplyToAddresses: email.replyTo ? [email.replyTo] : undefined,
    Content: {
      Simple: {
        Subject: { Data: email.subject, Charset: 'UTF-8' },
        Body: {
          Html: { Data: email.html, Charset: 'UTF-8' },
          Text: { Data: email.text, Charset: 'UTF-8' },
        },
      },
    },
    EmailTags: Object.entries(email.tags).map(([Name, Value]) => ({ Name, Value })),
  }))
}

const defaultDependencies: DeliveryDependencies = { sendEmail: sendWithSes }

export function createDeliveryHandler(overrides: Partial<DeliveryDependencies> = {}) {
  const dependencies = { ...defaultDependencies, ...overrides }

  return async (event: SQSEvent): Promise<SQSBatchResponse> => {
    const batchItemFailures: SQSBatchResponse['batchItemFailures'] = []

    for (const record of event.Records) {
      try {
        const parsed = ContactQueueMessageSchema.parse(JSON.parse(record.body))
        // The support notification goes first. A visitor never receives a
        // positive acknowledgement before the operational copy is accepted.
        await dependencies.sendEmail(supportNotification(parsed))
        await dependencies.sendEmail(visitorReceipt(parsed))
      } catch (error) {
        // SQS/Lambda is at-least-once. The short reference in both messages
        // makes a rare retry duplicate recognizable without logging PII here.
        console.error('contact.delivery.failed', {
          messageId: record.messageId,
          error: error instanceof Error ? error.message : String(error),
        })
        batchItemFailures.push({ itemIdentifier: record.messageId })
      }
    }

    return { batchItemFailures }
  }
}

export const handler = createDeliveryHandler()
