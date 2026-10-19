import { describe, expect, it } from 'vitest';
import { localeOptions } from './content';
import { renderLlmsFullTxt, renderLlmsTxt } from './llms';
import { renderSitemap } from './sitemap';
import { alternateTourVideoFor, posterLanguages, tourVideoFor, tourVideos, videoCopy, videoObject, videoPosterPath } from './video';

describe('product tour video', () => {
  it('plays the French recording on the French page and the English one elsewhere', () => {
    expect(tourVideoFor('fr').youtubeId).toBe('9KxfEjkmCxo');
    for (const { locale } of localeOptions.filter((option) => option.locale !== 'fr')) {
      expect(tourVideoFor(locale).youtubeId).toBe('ZCAHP50Zly8');
    }
  });

  it('falls back to English for a locale without its own recording, and links the other language', () => {
    for (const locale of ['es', 'it', 'de'] as const) {
      expect(tourVideoFor(locale)).toBe(tourVideos.en);
      expect(alternateTourVideoFor(locale)).toBe(tourVideos.fr);
    }
    expect(alternateTourVideoFor('fr')).toBe(tourVideos.en);
  });

  it('uses the English poster for a recording whose language has no poster yet', () => {
    const withoutPoster = { ...tourVideos.en, language: 'de' as const, youtubeId: 'placeholder' };
    expect(posterLanguages.has('de')).toBe(false);
    expect(videoPosterPath(withoutPoster)).toBe('/media/video-tour-en.webp');
    expect(videoPosterPath(withoutPoster, 'png')).toBe('/media/video-tour-en.png');
    expect(videoPosterPath(tourVideos.fr)).toBe('/media/video-tour-fr.webp');
  });

  it('ships both poster formats for every listed poster language', () => {
    // Vite lists the files in public/media; scripts/seo-output.test.mjs also checks the built pages.
    const shipped = new Set(Object.keys(import.meta.glob('/public/media/video-tour-*.{webp,png}')).map((path) => path.replace(/^\/public/, '')));
    for (const language of posterLanguages) {
      for (const format of ['webp', 'png'] as const) {
        expect(shipped, videoPosterPath({ language }, format)).toContain(videoPosterPath({ language }, format));
      }
    }
  });

  it.each(localeOptions.map((option) => option.locale))('%s has complete section copy', (locale) => {
    expect(Object.values(videoCopy[locale]).every((text) => text.trim().length > 0)).toBe(true);
  });

  it('describes a VideoObject with the fields Google requires', () => {
    const object = videoObject(tourVideos.en, 'https://maplespire.ca/', 'https://maplespire.ca/en/');
    expect(object).toMatchObject({ '@type': 'VideoObject', name: expect.any(String), description: expect.any(String), uploadDate: expect.any(String) });
    expect(object.thumbnailUrl[0]).toBe('https://maplespire.ca/media/video-tour-en.png');
    expect(object.embedUrl).toBe('https://www.youtube-nocookie.com/embed/ZCAHP50Zly8');
    expect(object.hasPart.at(-1)?.endOffset).toBeGreaterThan(object.hasPart.at(-1)?.startOffset ?? 0);
  });

  it('lists the video on every landing page in the sitemap', () => {
    const sitemap = renderSitemap();
    expect(sitemap).toContain('xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"');
    expect(sitemap.match(/<video:video>/g)).toHaveLength(localeOptions.length);
    expect(sitemap).toContain('<video:player_loc>https://www.youtube-nocookie.com/embed/9KxfEjkmCxo</video:player_loc>');
  });

  it('points LLM crawlers at both recordings', () => {
    for (const text of [renderLlmsTxt(), renderLlmsFullTxt()]) {
      expect(text).toContain('https://www.youtube.com/watch?v=ZCAHP50Zly8');
      expect(text).toContain('https://www.youtube.com/watch?v=9KxfEjkmCxo');
    }
  });
});
