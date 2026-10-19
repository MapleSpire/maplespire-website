import { describe, expect, it } from 'vitest';
import { localeOptions } from './content';
import { legalCopy } from './legal';

const SOFT_HYPHEN = '\u00AD';

describe('legal documents', () => {
  it.each(localeOptions.map(({ locale }) => locale))('%s has both documents with content', (locale) => {
    for (const document of [legalCopy[locale].termsDocument, legalCopy[locale].privacyDocument]) {
      expect(document.title.trim().length).toBeGreaterThan(0);
      expect(document.sections.length).toBeGreaterThan(0);
      expect(document.title).not.toContain(SOFT_HYPHEN);
    }
  });

  // The legal H1 is 46px+ on a phone: one unbreakable word wider than ~16 characters
  // ("Nutzungsbedingungen") widened the whole /de/ page to ~550px at a 375px viewport.
  it('gives every long H1 word a break hint so the heading fits a phone', () => {
    for (const { locale } of localeOptions) {
      for (const document of [legalCopy[locale].termsDocument, legalCopy[locale].privacyDocument]) {
        const heading = document.heading ?? document.title;
        expect(heading.replaceAll(SOFT_HYPHEN, ''), `${locale} heading text`).toBe(document.title);
        const longest = Math.max(...heading.split(/[\s\u00AD]+/).map((part) => [...part].length));
        expect(longest, `${locale}: ${document.title}`).toBeLessThanOrEqual(16);
      }
    }
  });
});
