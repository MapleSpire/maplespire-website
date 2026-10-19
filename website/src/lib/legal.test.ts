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

  // The code is public under AGPL-3.0: the terms once said a "future source publication"
  // was "not a promise", in every language, after the repository had been released.
  it.each(localeOptions.map(({ locale }) => locale))('%s terms state the published AGPL-3.0 source', (locale) => {
    const text = legalCopy[locale].termsDocument.sections
      .flatMap((section) => section.paragraphs ?? []).join(' ');
    expect(text).toContain('https://github.com/MapleSpire/maplespire');
    expect(text).toContain('AGPL-3.0');
    expect(text).not.toMatch(/future source|publication future|futura publica|futura pubblicazione|künftige Veröffentlichung|未来公开|将来のソース|향후 소스|भविष्य में सोर्स|نشر مستقبلي/i);
  });

  // Prevalence: English governs a divergence between versions, except where the law (in
  // Québec, the Charter of the French language) requires the French version to prevail.
  const PREVALENCE: Record<string, [english: string, quebec: string]> = {
    fr: ['version anglaise prévaut', 'Québec'], en: ['English version prevails', 'Québec'],
    es: ['prevalece la versión en inglés', 'Quebec'], it: ['prevale la versione inglese', 'Québec'],
    de: ['englische Fassung maßgeblich', 'Québec'], pt: ['prevalece a versão em inglês', 'Quebec'],
    zh: ['以英文版本为准', '魁北克'], ja: ['英語版が優先', 'ケベック'], ko: ['영어 버전이 우선', '퀘벡'],
    hi: ['अंग्रेज़ी संस्करण मान्य', 'क्यूबेक'], ar: ['تسود النسخة الإنجليزية', 'كيبيك'],
  };
  it.each(localeOptions.map(({ locale }) => locale))('%s terms say which version prevails', (locale) => {
    const text = legalCopy[locale].termsDocument.sections
      .flatMap((section) => section.paragraphs ?? []).join(' ');
    const [english, quebec] = PREVALENCE[locale];
    expect(text).toContain(english);
    expect(text).toContain(quebec);
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
