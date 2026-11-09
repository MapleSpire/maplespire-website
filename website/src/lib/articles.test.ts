import { describe, expect, it } from 'vitest';
import {
  SPOTLIGHT_ARTICLE_SLUG,
  STRUCTURIZR_ARTICLE_SLUG,
  articleLocales,
  inlineCode,
  spotlightArticlePath,
  structurizrArticle,
  structurizrArticlePath,
} from './articles';
import { copy, localeOptions } from './content';
import { spotlightArticle } from './spotlightArticle';

const english = structurizrArticle.en;

function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings);
  return [];
}

describe('Structurizr comparison article', () => {
  it('is published in every site locale', () => {
    expect([...articleLocales]).toEqual(localeOptions.map(({ locale }) => locale));
    expect(Object.keys(structurizrArticle).sort()).toEqual([...articleLocales].sort());
  });

  it('links each landing page to the article in its own language', () => {
    for (const locale of articleLocales) {
      expect(structurizrArticlePath(locale)).toBe(`/${locale}/${STRUCTURIZR_ARTICLE_SLUG}/`);
    }
  });

  it.each([...articleLocales])('%s mirrors the English structure, sources and date', (locale) => {
    const article = structurizrArticle[locale];
    expect(collectStrings(article).every((text) => text.trim().length > 0)).toBe(true);
    expect(article.isoDate).toBe(english.isoDate);
    expect(article.sections.map((section) => section.id).length).toBe(english.sections.length);
    article.sections.forEach((section, index) => {
      const reference = english.sections[index];
      expect(section.paragraphs?.length).toBe(reference.paragraphs?.length);
      expect(section.table?.rows.length).toBe(reference.table?.rows.length);
      expect(section.table?.columns.slice(1)).toEqual(reference.table?.columns.slice(1));
      expect(section.links?.map((link) => link.url)).toEqual(reference.links?.map((link) => link.url));
    });
  });

  it('is actually translated, not copied from English', () => {
    for (const locale of articleLocales.filter((locale) => locale !== 'en')) {
      const article = structurizrArticle[locale];
      expect(article.title, locale).not.toBe(english.title);
      expect(article.summary, locale).not.toBe(english.summary);
      article.sections.forEach((section, index) => {
        // "Sources" is spelled the same in French.
        if (locale === 'fr' && section.title === 'Sources') return;
        expect(section.title, `${locale} section ${index}`).not.toBe(english.sections[index].title);
      });
    }
  });
});

const spotlightEnglish = spotlightArticle.en;
/** The literal keys, shortcuts and filters of a text, in order. */
const codeRuns = (value: unknown) => collectStrings(value).flatMap((text) => inlineCode(text).filter((part) => part.code).map((part) => part.text));

describe('Spotlight article', () => {
  it('is published in every site locale, under the same slug', () => {
    expect(Object.keys(spotlightArticle).sort()).toEqual([...articleLocales].sort());
    for (const locale of articleLocales) {
      expect(spotlightArticlePath(locale)).toBe(`/${locale}/${SPOTLIGHT_ARTICLE_SLUG}/`);
    }
  });

  it('is linked from every landing page in its own language', () => {
    for (const locale of articleLocales) {
      expect(copy[locale].governance.spotlightLabel).toBe(spotlightArticle[locale].title);
      expect(copy[locale].governance.spotlightCta.trim()).not.toBe('');
    }
  });

  it.each([...articleLocales])('%s mirrors the English structure, date, video and literal syntax', (locale) => {
    const article = spotlightArticle[locale];
    expect(collectStrings(article).every((text) => text.trim().length > 0)).toBe(true);
    expect(article.isoDate).toBe('2026-11-08');
    expect(article.video).toMatchObject({ set: 'spotlight', id: spotlightEnglish.video?.id });
    expect(article.sections.length).toBe(spotlightEnglish.sections.length);
    article.sections.forEach((section, index) => {
      const reference = spotlightEnglish.sections[index];
      if (locale !== 'fr') expect(section.id).toBe(reference.id);
      expect(Boolean(section.lead)).toBe(Boolean(reference.lead));
      expect(section.paragraphs?.length).toBe(reference.paragraphs?.length);
      expect(section.bullets?.length).toBe(reference.bullets?.length);
      expect(section.table?.rows.length).toBe(reference.table?.rows.length);
      // The example column is syntax, identical in every language.
      expect(section.table?.rows.map((row) => row[1])).toEqual(reference.table?.rows.map((row) => row[1]));
    });
    // Every key, shortcut and filter stays literal, and backticks are balanced.
    expect(codeRuns(article.sections)).toEqual(codeRuns(spotlightEnglish.sections));
    for (const text of collectStrings(article)) expect(text.split('`').length % 2, text).toBe(1);
    // Metadata is plain text.
    for (const text of [article.title, article.seoTitle, article.description, article.summary, article.verdict, article.ctaTitle]) {
      expect(text).not.toContain('`');
    }
    expect(article.title).toContain('⌘K');
  });

  it('is actually translated, not copied from English', () => {
    for (const locale of articleLocales.filter((locale) => locale !== 'en')) {
      const article = spotlightArticle[locale];
      expect(article.title, locale).not.toBe(spotlightEnglish.title);
      expect(article.summary, locale).not.toBe(spotlightEnglish.summary);
      expect(article.video?.title, locale).not.toBe(spotlightEnglish.video?.title);
      article.sections.forEach((section, index) => {
        expect(section.title, `${locale} section ${index}`).not.toBe(spotlightEnglish.sections[index].title);
      });
    }
  });

  it('never claims YouTube subtitles: the captions are part of the image', () => {
    for (const locale of articleLocales) {
      expect(spotlightArticle[locale].video?.captionsNote, locale).not.toMatch(/YouTube/);
    }
  });

  it('renders backtick runs as code', () => {
    expect(inlineCode('Press `⌘K` or `Ctrl K`.')).toEqual([
      { code: false, text: 'Press ' },
      { code: true, text: '⌘K' },
      { code: false, text: ' or ' },
      { code: true, text: 'Ctrl K' },
      { code: false, text: '.' },
    ]);
    expect(inlineCode('No code here')).toEqual([{ code: false, text: 'No code here' }]);
  });
});
