import { describe, expect, it } from 'vitest';
import { copy, localeOptions } from './content';

const locales = ['fr', 'en', 'zh', 'ja', 'ko', 'hi'] as const;

function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings);
  return [];
}

describe('localized site content', () => {
  it('exposes every supported locale exactly once', () => {
    expect(localeOptions.map(({ locale }) => locale)).toEqual(locales);
    expect(new Set(localeOptions.map(({ htmlLang }) => htmlLang)).size).toBe(locales.length);
  });

  it.each(locales)('%s contains a complete landing-page translation', (locale) => {
    const content = copy[locale];
    expect(content.locale).toBe(locale);
    expect(content.chapters).toHaveLength(3);
    expect(content.openSource.proofs).toHaveLength(3);
    expect(content.facts.items).toHaveLength(5);
    expect(content.footer.copyright).toContain('© 2026 MapleSpire');
    expect(collectStrings(content).every((text) => text.trim().length > 0)).toBe(true);
  });

  it('does not claim that unpublished source or self-hosting packages are already available', () => {
    const text = collectStrings(copy).join(' ');
    expect(text).not.toMatch(/Apache-2\.0|codeRepository|self-hostable\.|auto-hébergeable\.|开源且可自行托管|オープンソース、セルフホスト対応|오픈 소스이고 직접 호스팅|ओपन सोर्स और सेल्फ-होस्ट करने योग्य/i);
  });
});
