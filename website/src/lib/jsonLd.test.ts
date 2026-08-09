import { describe, expect, it } from 'vitest';
import { serializeJsonLd } from './jsonLd';

// Written as code points on purpose: both characters are invisible in an editor.
const LINE_SEPARATOR = String.fromCharCode(0x2028);
const PARAGRAPH_SEPARATOR = String.fromCharCode(0x2029);

describe('inline JSON-LD serialization', () => {
  it('never emits a character sequence that can close the script element', () => {
    const serialized = serializeJsonLd({ name: 'MapleSpire</script><img src=x onerror=alert(1)>' });

    expect(serialized).not.toContain('<');
    expect(serialized).not.toContain('>');
    expect(serialized.toLowerCase()).not.toContain('</script');
  });

  it('escapes the separators that break inline parsing', () => {
    const serialized = serializeJsonLd({ note: `line${LINE_SEPARATOR}break${PARAGRAPH_SEPARATOR}end` });

    expect(serialized).toContain('\\u2028');
    expect(serialized).toContain('\\u2029');
    expect(serialized).not.toContain(LINE_SEPARATOR);
    expect(serialized).not.toContain(PARAGRAPH_SEPARATOR);
  });

  it('leaves the published structured data unchanged after escaping', () => {
    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Organization', name: 'MapleSpire & Co', sameAs: ['https://github.com/MapleSpire'] },
        { '@type': 'WebSite', description: 'Modélisation C4 <vivante>', inLanguage: ['fr-CA', 'en'] },
      ],
    };

    expect(JSON.parse(serializeJsonLd(graph))).toEqual(graph);
  });
});
