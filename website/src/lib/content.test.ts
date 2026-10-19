import { describe, expect, it } from 'vitest';
import { REPOSITORY_URL, copy, localeOptions } from './content';

const locales = ['fr', 'en', 'es', 'it', 'de', 'zh', 'ja', 'ko', 'hi'] as const;

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

  it.each(locales)('%s announces the released open-source code and self-hosting', (locale) => {
    const content = copy[locale];
    expect(content.hero.open).toContain('AGPL-3.0');
    expect(content.governance.items).toHaveLength(4);
    expect(collectStrings(content).join(' ')).toContain('github.com/MapleSpire/maplespire');
  });

  it('no longer describes the source code or self-hosting as upcoming', () => {
    const text = collectStrings(copy).join(' ');
    expect(text).not.toMatch(/coming soon|bientôt|announced|annoncé|not been published|pas encore publié|prévu|planned|próximamente|anunciado|todavía no (?:se ha )?publicado|prossimamente|annunciato|non ancora pubblicato|demnächst|angekündigt|noch nicht veröffentlicht|即将推出|近日公開|곧 공개|जल्द उपलब्ध/i);
  });

  it('points GitHub links at the public repository', () => {
    expect(REPOSITORY_URL).toBe('https://github.com/MapleSpire/maplespire');
  });
});
