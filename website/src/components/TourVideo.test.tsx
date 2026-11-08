import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { spotlightArticle } from '../lib/spotlightArticle';
import TourVideo from './TourVideo';

const copyFor = (locale: 'en' | 'fr' | 'ar') => {
  const { play, watchOnYoutube, otherLanguage, captionsNote } = spotlightArticle[locale].video!;
  return { play, watchOnYoutube, otherLanguage, captionsNote };
};

describe('TourVideo', () => {
  it('renders the landing product tour as its own section by default', () => {
    const { container } = render(<TourVideo locale="en" />);
    expect(container.querySelector('section#video')).not.toBeNull();
    expect(container.querySelector('img')?.getAttribute('src')).toBe('/media/video-tour-en.webp');
    expect(screen.getByText('2:29')).toBeInTheDocument();
  });

  it('embeds the Spotlight video without a section, poster first, then youtube-nocookie on play', () => {
    const { container } = render(<TourVideo locale="ar" set="spotlight" copy={copyFor('ar')} embedded />);
    expect(container.querySelector('section')).toBeNull();
    expect(container.querySelector('iframe')).toBeNull();
    expect(container.querySelector('img')?.getAttribute('src')).toBe('/media/video-spotlight-en.webp');
    expect(screen.getByText('1:11')).toBeInTheDocument();
    // English chapter titles inside an Arabic page are marked left-to-right.
    expect(container.querySelector('ol')?.getAttribute('dir')).toBe('ltr');

    fireEvent.click(screen.getByRole('link', { name: new RegExp(copyFor('ar').play) }));
    expect(container.querySelector('iframe')?.getAttribute('src')).toMatch(/^https:\/\/www\.youtube-nocookie\.com\/embed\/-cyOGFnw9pQ\?autoplay=1/);
  });

  it('plays the French recording from a chapter link on the French page', () => {
    const { container } = render(<TourVideo locale="fr" set="spotlight" copy={copyFor('fr')} embedded />);
    expect(container.querySelector('img')?.getAttribute('src')).toBe('/media/video-spotlight-fr.webp');
    fireEvent.click(screen.getByText('Portées, astuces et navigation vers un résultat'));
    expect(container.querySelector('iframe')?.getAttribute('src')).toContain('/embed/fr5TGKGyUSY?autoplay=1');
    expect(container.querySelector('iframe')?.getAttribute('src')).toContain('&start=37');
  });
});
