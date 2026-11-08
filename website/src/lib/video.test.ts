import { describe, expect, it } from 'vitest';
import { localeOptions } from './content';
import { renderLlmsFullTxt, renderLlmsTxt } from './llms';
import { renderSitemap } from './sitemap';
import {
  alternateTourVideoFor,
  durationSeconds,
  posterLanguages,
  spotlightVideos,
  tourVideoFor,
  tourVideos,
  videoClock,
  videoCopy,
  videoObject,
  videoPosterPath,
  videoSetIds,
} from './video';

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
    const shipped = new Set(Object.keys(import.meta.glob('/public/media/video-*.{webp,png}')).map((path) => path.replace(/^\/public/, '')));
    for (const set of videoSetIds) {
      for (const language of posterLanguages) {
        for (const format of ['webp', 'png'] as const) {
          expect(shipped, videoPosterPath({ language, set }, format)).toContain(videoPosterPath({ language, set }, format));
        }
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
    // The tour on every landing page, Spotlight on every Spotlight article.
    expect(sitemap.match(/<video:video>/g)).toHaveLength(localeOptions.length * 2);
    expect(sitemap).toContain('<video:player_loc>https://www.youtube-nocookie.com/embed/9KxfEjkmCxo</video:player_loc>');
    expect(sitemap.match(/<video:duration>149<\/video:duration>/g)).toHaveLength(localeOptions.length);
    expect(sitemap.match(/<video:duration>71<\/video:duration>/g)).toHaveLength(localeOptions.length);
    expect(sitemap).toContain('<loc>https://maplespire.ca/fr/spotlight/</loc>');
    expect(sitemap).toContain('<video:player_loc>https://www.youtube-nocookie.com/embed/fr5TGKGyUSY</video:player_loc>');
    expect(sitemap).toContain('<video:thumbnail_loc>https://maplespire.ca/media/video-spotlight-en.png</video:thumbnail_loc>');
  });

  it('points LLM crawlers at both recordings of both videos', () => {
    for (const text of [renderLlmsTxt(), renderLlmsFullTxt()]) {
      expect(text).toContain('https://www.youtube.com/watch?v=ZCAHP50Zly8');
      expect(text).toContain('https://www.youtube.com/watch?v=9KxfEjkmCxo');
      expect(text).toContain('https://www.youtube.com/watch?v=-cyOGFnw9pQ');
      expect(text).toContain('https://www.youtube.com/watch?v=fr5TGKGyUSY');
    }
  });
});

describe('Spotlight video', () => {
  it('plays the French recording on the French page and the English one elsewhere', () => {
    expect(tourVideoFor('fr', 'spotlight').youtubeId).toBe('fr5TGKGyUSY');
    for (const { locale } of localeOptions.filter((option) => option.locale !== 'fr')) {
      expect(tourVideoFor(locale, 'spotlight').youtubeId).toBe('-cyOGFnw9pQ');
      expect(alternateTourVideoFor(locale, 'spotlight')).toBe(spotlightVideos.fr);
    }
    expect(alternateTourVideoFor('fr', 'spotlight')).toBe(spotlightVideos.en);
  });

  it('keeps the product tour as the default set', () => {
    expect(tourVideoFor('en')).toBe(tourVideos.en);
    expect(videoPosterPath(tourVideos.en)).toBe('/media/video-tour-en.webp');
  });

  it('has its own posters, 71 seconds and the published chapters', () => {
    expect(videoPosterPath(spotlightVideos.en)).toBe('/media/video-spotlight-en.webp');
    expect(videoPosterPath(spotlightVideos.fr, 'png')).toBe('/media/video-spotlight-fr.png');
    for (const video of [spotlightVideos.en, spotlightVideos.fr]) {
      expect(video.duration).toBe('PT1M11S');
      expect(durationSeconds(video)).toBe(71);
      expect(video.uploadDate).toBe('2026-11-08T12:00:00-05:00');
      expect(video.chapters).toHaveLength(4);
    }
    expect(spotlightVideos.en.chapters.map((chapter) => chapter.start)).toEqual([0, 18, 37, 53]);
    expect(spotlightVideos.fr.chapters.map((chapter) => chapter.start)).toEqual([0, 18, 37, 54]);
    expect(durationSeconds(tourVideos.en)).toBe(149);
    expect(videoClock(71)).toBe('1:11');
  });

  it('describes a VideoObject that ends with the recording', () => {
    const object = videoObject(spotlightVideos.fr, 'https://maplespire.ca/', 'https://maplespire.ca/fr/spotlight/');
    expect(object['@id']).toBe('https://maplespire.ca/fr/spotlight/#video');
    expect(object.thumbnailUrl[0]).toBe('https://maplespire.ca/media/video-spotlight-fr.png');
    expect(object.embedUrl).toBe('https://www.youtube-nocookie.com/embed/fr5TGKGyUSY');
    expect(object.duration).toBe('PT1M11S');
    expect(object.hasPart.at(-1)?.endOffset).toBe(71);
  });
});
