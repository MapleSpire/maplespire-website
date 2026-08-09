import { describe, expect, it } from 'vitest';
import { alternativeProducts, alternativesCopy, filterAlternativeProducts, statusTone } from './alternatives';

const locales = ['fr', 'en', 'zh', 'ja', 'ko', 'hi'] as const;

describe('honest alternatives comparison', () => {
  it('covers the requested market set plus relevant diagram-as-code options', () => {
    expect(alternativeProducts).toHaveLength(15);
    expect(new Set(alternativeProducts.map(({ id }) => id)).size).toBe(15);
    expect(alternativeProducts.map(({ id }) => id)).toEqual(expect.arrayContaining([
      'maplespire', 'icepanel', 'archyl', 'structurizr', 'c4-model', 'visio',
      'lucidchart', 'creately', 'smartdraw', 'drawio', 'excalidraw', 'archi',
      'mermaid', 'plantuml', 'd2',
    ]));
  });

  it('links every claim set to official HTTPS sources', () => {
    for (const product of alternativeProducts) {
      expect(product.sources.length).toBeGreaterThan(0);
      expect(product.sources.every(({ url }) => url.startsWith('https://'))).toBe(true);
    }
  });

  it('does not present pending MapleSpire releases as available today', () => {
    const maplespire = alternativeProducts.find(({ id }) => id === 'maplespire');
    expect(maplespire?.deployment).toBe('pending');
    expect(maplespire?.sourceCode).toBe('announced');
    expect(alternativesCopy.en.takes.maplespire).toMatch(/not released yet/i);
  });

  it('treats C4 Model as a method rather than a product', () => {
    const c4 = alternativeProducts.find(({ id }) => id === 'c4-model');
    expect(c4).toMatchObject({ approach: 'method', sharedModel: 'na', collaboration: 'na', offline: 'na', deployment: 'na' });
  });

  it('keeps MapleSpire visible as the comparison baseline for every filter', () => {
    for (const filter of ['model', 'drawing', 'code', 'method'] as const) {
      const filtered = filterAlternativeProducts(filter);
      expect(filtered[0]?.id).toBe('maplespire');
      expect(filtered.filter(({ id }) => id === 'maplespire')).toHaveLength(1);
      expect(filtered.slice(1).every((product) => product.group === filter)).toBe(true);
    }
  });

  it.each(locales)('%s has complete labels, prices and candid summaries', (locale) => {
    const localized = alternativesCopy[locale];
    expect(Object.keys(localized.filters)).toHaveLength(5);
    expect(Object.keys(localized.prices)).toHaveLength(alternativeProducts.length);
    expect(Object.keys(localized.takes)).toHaveLength(alternativeProducts.length);
    expect(localized.caveat).not.toMatch(/Archy/i);
    for (const product of alternativeProducts) {
      expect(localized.prices[product.id].trim().length).toBeGreaterThan(0);
      expect(localized.takes[product.id].trim().length).toBeGreaterThan(16);
    }
  });

  it('uses visually distinct status tones', () => {
    expect(statusTone('native')).toBe('strong');
    expect(statusTone('experimental')).toBe('conditional');
    expect(statusTone('no')).toBe('unavailable');
    expect(statusTone('na')).toBe('na');
  });
});
