import { z } from 'zod'

export const CONTACT_BODY_MAX_BYTES = 16 * 1024

const unsafeControls = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/
const singleLineControls = /[\u0000-\u001F\u007F]/

const cleanSingleLine = (minimum: number, maximum: number) =>
  z.string()
    .trim()
    .min(minimum)
    .max(maximum)
    .refine((value) => !singleLineControls.test(value), 'control characters are not allowed')

export const ContactSubmissionSchema = z.object({
  name: cleanSingleLine(2, 100),
  email: z.string().trim().toLowerCase().email().max(254),
  company: cleanSingleLine(1, 160).optional(),
  subject: cleanSingleLine(2, 160),
  message: z.string()
    .trim()
    .min(10)
    .max(5_000)
    .refine((value) => !unsafeControls.test(value), 'control characters are not allowed'),
  locale: z.enum(['en', 'fr']),
  consent: z.literal(true),
  startedAt: z.number().int().positive(),
  // Deliberately named like a normal field so generic form-filling bots trip it.
  // It is hidden and must remain empty for real visitors.
  website: z.string().max(200).optional().default(''),
}).strict()

export type ContactSubmission = z.infer<typeof ContactSubmissionSchema>

export const ContactQueueMessageSchema = z.object({
  version: z.literal(1),
  requestId: z.string().uuid(),
  receivedAt: z.string().datetime(),
  name: cleanSingleLine(2, 100),
  email: z.string().trim().toLowerCase().email().max(254),
  company: cleanSingleLine(1, 160).optional(),
  subject: cleanSingleLine(2, 160),
  message: z.string().min(10).max(5_000).refine((value) => !unsafeControls.test(value)),
  locale: z.enum(['en', 'fr']),
}).strict()

export type ContactQueueMessage = z.infer<typeof ContactQueueMessageSchema>
