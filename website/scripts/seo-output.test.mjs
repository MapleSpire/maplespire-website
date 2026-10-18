import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const locales = ['fr', 'en', 'zh', 'ja', 'ko', 'hi'];
const articleLocales = ['fr', 'en'];
const articleSlug = 'maplespire-vs-structurizr';
const languageUrls = {
  'fr-CA': 'https://maplespire.ca/fr/',
  'en-CA': 'https://maplespire.ca/en/',
  'zh-Hans': 'https://maplespire.ca/zh/',
  ja: 'https://maplespire.ca/ja/',
  ko: 'https://maplespire.ca/ko/',
  hi: 'https://maplespire.ca/hi/',
  'x-default': 'https://maplespire.ca/en/',
};

const htmlFor = (locale) => readFile(join(dist, locale, 'index.html'), 'utf8');
const capture = (html, pattern, label) => {
  const match = html.match(pattern);
  assert.ok(match, `Missing ${label}`);
  return match[1];
};

function alternateMap(html) {
  return Object.fromEntries([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
    .map((match) => [match[1], match[2]]));
}

function distPathForHref(href, currentLocale) {
  const url = new URL(href, `https://maplespire.ca/${currentLocale}/`);
  if (url.origin !== 'https://maplespire.ca') return null;
  const path = decodeURIComponent(url.pathname);
  if (path.endsWith('/')) return join(dist, path, 'index.html');
  return join(dist, path);
}

test('robots.txt allows the public site, hides technical routes and points to the sitemap index', async () => {
  const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, /^Disallow: \/api\/$/m);
  assert.match(robots, /^Disallow: \/app\/$/m);
  assert.match(robots, /^Sitemap: https:\/\/maplespire\.ca\/sitemap-index\.xml$/m);
});

test('the sitemap contains only canonical localized URLs with complete reciprocal alternates', async () => {
  const index = await readFile(join(dist, 'sitemap-index.xml'), 'utf8');
  assert.match(index, /https:\/\/maplespire\.ca\/sitemap-0\.xml/);
  const sitemap = await readFile(join(dist, 'sitemap-0.xml'), 'utf8');
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  const expected = [
    ...locales.flatMap((locale) => [
      `https://maplespire.ca/${locale}/`,
      `https://maplespire.ca/${locale}/termsofservice/`,
      `https://maplespire.ca/${locale}/privacystatement/`,
    ]),
    ...articleLocales.map((locale) => `https://maplespire.ca/${locale}/${articleSlug}/`),
  ].sort();
  const localizedEverywhere = expected.length - articleLocales.length;
  assert.deepEqual(locations, expected);
  assert.ok(!sitemap.includes('<loc>https://maplespire.ca/</loc>'));
  assert.ok(!sitemap.includes('<loc>https://maplespire.ca/termsofservice/</loc>'));
  assert.ok(!sitemap.includes('<loc>https://maplespire.ca/privacystatement/</loc>'));
  assert.equal((sitemap.match(/hreflang="x-default"/g) ?? []).length, expected.length);
  for (const locale of Object.keys(languageUrls)) {
    assert.equal(
      (sitemap.match(new RegExp(`hreflang="${locale}"`, 'g')) ?? []).length,
      ['fr-CA', 'en-CA', 'x-default'].includes(locale) ? expected.length : localizedEverywhere,
      `sitemap alternate count for ${locale}`,
    );
  }
});

test('legal documents are prerendered, localized and reciprocal', async () => {
  for (const kind of ['termsofservice', 'privacystatement']) {
    const rootHtml = await readFile(join(dist, kind, 'index.html'), 'utf8');
    assert.equal(capture(rootHtml, /<link rel="canonical" href="([^"]+)"/, `${kind} root canonical`), `https://maplespire.ca/en/${kind}/`);
    assert.match(rootHtml, /<meta name="robots" content="noindex,follow">/);
    assert.match(rootHtml, new RegExp(`<meta http-equiv="refresh" content="0;url=\\/en\\/${kind}\\/">`));

    for (const locale of locales) {
      const html = await readFile(join(dist, locale, kind, 'index.html'), 'utf8');
      assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${locale}/${kind} must contain one H1`);
      assert.equal(capture(html, /<link rel="canonical" href="([^"]+)"/, `${locale}/${kind} canonical`), `https://maplespire.ca/${locale}/${kind}/`);
      assert.equal(Object.keys(alternateMap(html)).length, locales.length + 1, `${locale}/${kind} hreflang count`);
      assert.equal((html.match(/<meta property="og:locale:alternate"/g) ?? []).length, locales.length - 1);
      assert.match(html, /<meta name="twitter:image:alt" content="[^"]+">/);
      assert.match(html, /support@maplespire\.ca/);
      assert.doesNotMatch(html, /\uFFFD|Ã.|Â.|â€|â€™/);
    }
  }
});

test('the Structurizr comparison article is prerendered in French and English with reciprocal alternates', async () => {
  for (const locale of articleLocales) {
    const html = await readFile(join(dist, locale, articleSlug, 'index.html'), 'utf8');
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${locale} article must contain one H1`);
    assert.equal(capture(html, /<link rel="canonical" href="([^"]+)"/, `${locale} article canonical`), `https://maplespire.ca/${locale}/${articleSlug}/`);
    assert.deepEqual(alternateMap(html), {
      'fr-CA': `https://maplespire.ca/fr/${articleSlug}/`,
      'en-CA': `https://maplespire.ca/en/${articleSlug}/`,
      'x-default': `https://maplespire.ca/en/${articleSlug}/`,
    });
    assert.match(html, /<table class="article-table">/);
    assert.match(html, /https:\/\/github\.com\/MapleSpire\/maplespire/);
    assert.doesNotMatch(html, /�|Ã.|Â.|â€|â€™/);
  }
});

test('localized HTML has unique metadata, absolute self-canonicals and reciprocal hreflang', async () => {
  const titles = new Set();
  const descriptions = new Set();

  for (const locale of locales) {
    const html = await htmlFor(locale);
    const title = capture(html, /<title>([^<]+)<\/title>/, `${locale} title`);
    const description = capture(html, /<meta name="description" content="([^"]+)"/, `${locale} description`);
    const canonical = capture(html, /<link rel="canonical" href="([^"]+)"/, `${locale} canonical`);

    assert.equal(canonical, `https://maplespire.ca/${locale}/`);
    assert.doesNotThrow(() => new URL(canonical));
    assert.deepEqual(alternateMap(html), languageUrls, `${locale} hreflang set is incomplete or non-reciprocal`);
    titles.add(title);
    descriptions.add(description);
  }

  assert.equal(titles.size, locales.length);
  assert.equal(descriptions.size, locales.length);
});

test('each locale has one H1 plus prerendered main, factual answers and comparison content', async () => {
  for (const locale of locales) {
    const html = await htmlFor(locale);
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${locale} must contain one H1`);
    assert.match(html, /<main id="main-content">/);
    assert.match(html, /<section class="ms-facts" id="facts"/);
    assert.equal((html.match(/<dt>/g) ?? []).length, 5, `${locale} factual answer count`);
    assert.match(html, /<section class="ms-alternatives" id="alternatives"/);
    assert.match(html, /<table class="ms-alternatives-table">/);
    assert.match(html, /<tbody><tr class="is-featured">/);
  }
});

test('hero media is preloaded and full React hydration is deferred off the critical load path', async () => {
  for (const locale of locales) {
    const html = await htmlFor(locale);
    assert.match(html, /<link rel="preload" href="\/media\/story-before\.webp" as="image" type="image\/webp" fetchpriority="high">/);
    assert.doesNotMatch(html, /<link rel="preload" href="\/media\/story-product\.webp"/);
    assert.match(html, /<astro-island[^>]+client="idle"/);
    assert.doesNotMatch(html, /<astro-island[^>]+client="load"/);
  }
});

test('JSON-LD is parseable, uses stable entity IDs and states the published license and FAQ', async () => {
  for (const locale of locales) {
    const html = await htmlFor(locale);
    const raw = capture(html, /<script type="application\/ld\+json">([^<]+)<\/script>/, `${locale} JSON-LD`);
    const graph = JSON.parse(raw);
    assert.deepEqual(graph['@graph'].map((node) => node['@type']), ['Organization', 'WebSite', 'SoftwareApplication', 'SoftwareSourceCode', 'FAQPage', 'VideoObject']);
    assert.deepEqual(graph['@graph'].slice(0, 4).map((node) => node['@id']), [
      'https://maplespire.ca/#organization',
      'https://maplespire.ca/#website',
      'https://maplespire.ca/#software',
      'https://maplespire.ca/#source-code',
    ]);
    const [, , software, sourceCode, faq] = graph['@graph'];
    assert.equal(software.isAccessibleForFree, true);
    assert.equal(software.url, 'https://maplespire.ca/en/');
    assert.equal(software.license, 'https://www.gnu.org/licenses/agpl-3.0.html');
    assert.ok(Array.isArray(software.featureList));
    assert.equal(sourceCode.codeRepository, 'https://github.com/MapleSpire/maplespire');
    assert.equal(faq.mainEntity.length, 5);
    // The product tour: French recording on /fr/, English everywhere else.
    const video = graph['@graph'][5];
    const youtubeId = locale === 'fr' ? '9KxfEjkmCxo' : 'ZCAHP50Zly8';
    assert.equal(software.subjectOf['@id'], video['@id']);
    assert.equal(video.embedUrl, `https://www.youtube-nocookie.com/embed/${youtubeId}`);
    assert.ok(video.name && video.description && video.uploadDate && video.thumbnailUrl.length);
    assert.ok(html.includes(`href="https://www.youtube.com/watch?v=${youtubeId}"`), `${locale} links the tour video`);
    assert.doesNotMatch(raw, /"(?:aggregateRating|review)"/);
    assert.doesNotMatch(raw, /Apache/);
  }
});

test('llms.txt and llms-full.txt summarize the product for AI crawlers', async () => {
  const summary = await readFile(join(dist, 'llms.txt'), 'utf8');
  assert.match(summary, /^# MapleSpire\n\n> /);
  assert.match(summary, /AGPL-3\.0/);
  assert.match(summary, /https:\/\/github\.com\/MapleSpire\/maplespire/);
  for (const locale of locales) assert.ok(summary.includes(`https://maplespire.ca/${locale}/`), `llms.txt links ${locale}`);
  for (const locale of articleLocales) assert.ok(summary.includes(`https://maplespire.ca/${locale}/${articleSlug}/`));
  const full = await readFile(join(dist, 'llms-full.txt'), 'utf8');
  assert.match(full, /## Frequently asked questions/);
  assert.match(full, /### Structurizr/);
  assert.doesNotMatch(full, /Apache|undefined|\[object Object\]/);
  const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
  for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) assert.match(robots, new RegExp(`^User-agent: ${bot}$`, 'm'));
});

test('the root is a noindex fallback that follows the visitor language like the CDN redirect', async () => {
  const html = await readFile(join(dist, 'index.html'), 'utf8');
  assert.equal(capture(html, /<link rel="canonical" href="([^"]+)"/, 'root canonical'), 'https://maplespire.ca/en/');
  assert.deepEqual(alternateMap(html), languageUrls);
  assert.match(html, /<meta name="robots" content="noindex,follow">/);
  assert.match(html, /<meta http-equiv="refresh" content="0;url=\/en\/">/);
  assert.match(html, /window\.location\.replace\(path \+ window\.location\.search \+ window\.location\.hash\)/);
  assert.match(html, /navigator\.languages/);
  assert.match(html, /maplespire_locale/);
});

test('the generated 404 is useful and explicitly excluded from indexing', async () => {
  const html = await readFile(join(dist, '404.html'), 'utf8');
  assert.match(html, /<meta name="robots" content="noindex,follow">/);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
  for (const locale of locales) assert.match(html, new RegExp(`href="/${locale}/"`));
});

test('important internal links resolve to generated static files and app links use the application domain', async () => {
  for (const locale of locales) {
    const html = await htmlFor(locale);
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
    const hrefs = [...html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)].map((match) => match[1]);

    assert.ok(hrefs.includes('https://app.maplespire.ca'), `${locale} must keep the editor on app.maplespire.ca`);
    assert.ok(!hrefs.some((href) => /^\/(?:app|login|invite|share|embed|org|platform|auth)(?:\/|$)/.test(href)));

    for (const href of hrefs) {
      if (href.startsWith('#')) {
        assert.ok(ids.has(href.slice(1)), `${locale} has broken fragment link ${href}`);
        continue;
      }
      if (/^(?:mailto:|https:\/\/app\.maplespire\.ca|https:\/\/github\.com|https:\/\/docs\.|https:\/\/icepanel\.|https:\/\/www\.|https:\/\/lucid\.|https:\/\/creately\.|https:\/\/plus\.|https:\/\/mermaid\.|https:\/\/plantuml\.|https:\/\/d2lang\.|https:\/\/c4model\.)/.test(href)) continue;
      const target = distPathForHref(href, locale);
      if (target) assert.ok(existsSync(target), `${locale} internal link does not resolve: ${href} -> ${target}`);
    }
  }
});
