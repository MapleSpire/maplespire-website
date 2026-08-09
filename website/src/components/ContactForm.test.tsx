import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCopy } from '../lib/content';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts the complete consent-aware contact payload', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);

    render(<ContactForm content={getCopy('en')} endpoint="/api/contact" />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada Lovelace' } });
    fireEvent.change(screen.getByLabelText('Work email'), { target: { value: 'ada@example.com' } });
    fireEvent.change(screen.getByLabelText('Organization (optional)'), { target: { value: 'Analytical Engines' } });
    fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Self-hosting MapleSpire' } });
    fireEvent.change(screen.getByLabelText('Your message'), {
      target: { value: 'We would like to discuss our deployment.' },
    });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /send the message/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [url, request] = fetchMock.mock.calls[0] as [string, RequestInit];
    const payload = JSON.parse(request.body as string);

    expect(url).toBe('/api/contact');
    expect(request.method).toBe('POST');
    expect(payload).toMatchObject({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      company: 'Analytical Engines',
      subject: 'Self-hosting MapleSpire',
      message: 'We would like to discuss our deployment.',
      website: '',
      consent: true,
      locale: 'en',
    });
    expect(payload.startedAt).toEqual(expect.any(Number));
    expect(await screen.findByText(/confirmation is on its way/i)).toBeInTheDocument();
  });

  it('keeps the user message and announces an error when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    render(<ContactForm content={getCopy('fr')} endpoint="/api/contact" />);

    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Jean Tremblay' } });
    fireEvent.change(screen.getByLabelText('Courriel professionnel'), { target: { value: 'jean@example.ca' } });
    fireEvent.change(screen.getByLabelText('Sujet'), { target: { value: 'Déploiement interne' } });
    fireEvent.change(screen.getByLabelText('Votre message'), {
      target: { value: 'Nous aimerions discuter de notre architecture.' },
    });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /envoyer le message/i }));

    expect(await screen.findByText(/n’a pas pu partir/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Votre message')).toHaveValue('Nous aimerions discuter de notre architecture.');
  });
});
