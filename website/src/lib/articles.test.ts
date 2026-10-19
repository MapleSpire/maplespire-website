import { describe, expect, it } from 'vitest';
import { STRUCTURIZR_ARTICLE_SLUG, articleLocales, structurizrArticle, structurizrArticlePath } from './articles';
import { localeOptions } from './content';

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
