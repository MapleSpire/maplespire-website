import type { ContactQueueMessage } from './contact-schema.js'

export const SUPPORT_DESTINATION = 'support@maplespire.ca'
export const DEFAULT_EMAIL_FROM = 'MapleSpire <no-reply@maplespire.ca>'

export interface OutgoingEmail {
  to: string
  subject: string
  html: string
  text: string
  replyTo?: string
  tags: Record<string, string>
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function safeReference(requestId: string): string {
  return requestId.slice(0, 8)
}

export function supportNotification(contact: ContactQueueMessage): OutgoingEmail {
  const reference = safeReference(contact.requestId)
  const htmlMessage = escapeHtml(contact.message).replaceAll('\n', '<br>')
  return {
    to: SUPPORT_DESTINATION,
    replyTo: contact.email,
    subject: `[MapleSpire contact ${reference}] ${contact.subject}`,
    html: `<!doctype html>
<html lang="en"><body style="font-family:Arial,sans-serif;color:#24262d;line-height:1.5">
  <h1 style="font-size:20px">New MapleSpire website contact</h1>
  <p><strong>Reference:</strong> ${reference}</p>
  <p><strong>Name:</strong> ${escapeHtml(contact.name)}<br>
  <strong>Email:</strong> ${escapeHtml(contact.email)}<br>
  ${contact.company ? `<strong>Company:</strong> ${escapeHtml(contact.company)}<br>` : ''}
  <strong>Locale:</strong> ${contact.locale}<br>
  <strong>Subject:</strong> ${escapeHtml(contact.subject)}</p>
  <div style="border-left:4px solid #b98570;padding-left:16px">${htmlMessage}</div>
</body></html>`,
    text: [
      'New MapleSpire website contact',
      `Reference: ${reference}`,
      `Name: ${contact.name}`,
      `Email: ${contact.email}`,
      ...(contact.company ? [`Company: ${contact.company}`] : []),
      `Locale: ${contact.locale}`,
      `Subject: ${contact.subject}`,
      '',
      contact.message,
    ].join('\n'),
    tags: { kind: 'support', locale: contact.locale },
  }
}

export function visitorReceipt(contact: ContactQueueMessage): OutgoingEmail {
  const reference = safeReference(contact.requestId)
  if (contact.locale === 'fr') {
    return {
      to: contact.email,
      subject: 'Nous avons bien reçu votre message — MapleSpire',
      html: `<!doctype html>
<html lang="fr"><body style="font-family:Arial,sans-serif;color:#24262d;line-height:1.5">
  <h1 style="font-size:20px">Merci de nous avoir écrit.</h1>
  <p>Bonjour ${escapeHtml(contact.name)},</p>
  <p>Votre message a bien été transmis à l’équipe MapleSpire. Nous vous répondrons dès que possible.</p>
  <p><strong>Référence&nbsp;:</strong> ${reference}</p>
  <p style="color:#64666d">Cet accusé de réception est automatique.</p>
</body></html>`,
      text: [
        `Bonjour ${contact.name},`,
        '',
        'Votre message a bien été transmis à l’équipe MapleSpire. Nous vous répondrons dès que possible.',
        `Référence : ${reference}`,
        '',
        'Cet accusé de réception est automatique.',
      ].join('\n'),
      tags: { kind: 'receipt', locale: 'fr' },
    }
  }

  return {
    to: contact.email,
    subject: 'We received your message — MapleSpire',
    html: `<!doctype html>
<html lang="en"><body style="font-family:Arial,sans-serif;color:#24262d;line-height:1.5">
  <h1 style="font-size:20px">Thank you for reaching out.</h1>
  <p>Hello ${escapeHtml(contact.name)},</p>
  <p>Your message has been delivered to the MapleSpire team. We will reply as soon as possible.</p>
  <p><strong>Reference:</strong> ${reference}</p>
  <p style="color:#64666d">This is an automated acknowledgement.</p>
</body></html>`,
    text: [
      `Hello ${contact.name},`,
      '',
      'Your message has been delivered to the MapleSpire team. We will reply as soon as possible.',
      `Reference: ${reference}`,
      '',
      'This is an automated acknowledgement.',
    ].join('\n'),
    tags: { kind: 'receipt', locale: 'en' },
  }
}
