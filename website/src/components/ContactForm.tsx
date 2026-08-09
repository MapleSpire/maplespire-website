import { useRef, useState } from 'react';
import type { SubmitEvent } from 'react';
import type { SiteCopy } from '../lib/content';
import { legalCopy } from '../lib/legal';

type ContactFormProps = {
  content: SiteCopy;
  endpoint: string;
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm({ content, endpoint }: ContactFormProps) {
  const legal = legalCopy[content.locale];
  const [status, setStatus] = useState<FormStatus>('idle');
  const startedAt = useRef(Date.now());

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus('sending');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          company: String(data.get('company') ?? '').trim() || undefined,
          subject: data.get('subject'),
          message: data.get('message'),
          website: data.get('website'),
          consent: data.get('consent') === 'on',
          startedAt: startedAt.current,
          locale: content.locale,
        }),
      });

      if (!response.ok) throw new Error(`Contact request failed: ${response.status}`);
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-busy={status === 'sending'}>
      <div className="form-row">
        <label>
          <span>{content.contact.name}</span>
          <input name="name" autoComplete="name" required minLength={2} maxLength={100} />
        </label>
        <label>
          <span>{content.contact.email}</span>
          <input name="email" type="email" autoComplete="email" inputMode="email" required maxLength={254} />
        </label>
      </div>
      <label>
        <span>{content.contact.company}</span>
        <input name="company" autoComplete="organization" maxLength={160} />
      </label>
      <label>
        <span>{content.contact.subject}</span>
        <input name="subject" required minLength={2} maxLength={160} />
      </label>
      <label>
        <span>{content.contact.message}</span>
        <textarea name="message" required rows={5} minLength={10} maxLength={5000} placeholder={content.contact.messagePlaceholder} />
      </label>
      <label className="honey-field" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent-field">
        <input name="consent" type="checkbox" required />
        <span>{content.contact.consent}</span>
      </label>
      <div className="form-submit-row">
        <button className="button button-primary submit-button" type="submit" disabled={status === 'sending'}>
          <span>{status === 'sending' ? content.contact.sending : content.contact.submit}</span>
          <i aria-hidden="true">↗</i>
        </button>
        <small>
          {content.contact.privacy}{' '}
          <a href={`/${content.locale}/privacystatement/`}>{legal.privacy}</a>
        </small>
      </div>
      <p
        className={`form-status form-status-${status}`}
        role="status"
        aria-live="polite"
      >
        {status === 'success' && content.contact.success}
        {status === 'error' && content.contact.error}
      </p>
    </form>
  );
}
