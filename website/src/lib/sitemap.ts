import { localeOptions } from './content';
import { STRUCTURIZR_ARTICLE_SLUG, articleLocales, structurizrArticle } from './articles';

const siteOrigin = 'https://maplespire.ca';
const legalKinds = ['termsofservice', 'privacystatement'] as const;

const absolute = (path: string) => `${siteOrigin}${path}`;

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const alternateLinks = (pathForLocale: (locale: string) => string) => [
  ...localeOptions.map((option) => (
    `<xhtml:link rel="alternate" hreflang="${escapeXml(option.htmlLang)}" href="${escapeXml(absolute(pathForLocale(option.locale)))}" />`
  )),
  `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absolute(pathForLocale('en')))}" />`,
].join('');

const urlEntry = (location: string, pathForLocale: (locale: string) => string) => (
  `<url><loc>${escapeXml(absolute(location))}</loc>${alternateLinks(pathForLocale)}</url>`
);

const articleEntry = (location: string) => {
  const links = [
    ...localeOptions
      .filter((option) => (articleLocales as readonly string[]).includes(option.locale))
      .map((option) => (
        `<xhtml:link rel="alternate" hreflang="${escapeXml(option.htmlLang)}" href="${escapeXml(absolute(`/${option.locale}/${STRUCTURIZR_ARTICLE_SLUG}/`))}" />`
      )),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absolute(`/en/${STRUCTURIZR_ARTICLE_SLUG}/`))}" />`,
  ].join('');
  return `<url><loc>${escapeXml(absolute(location))}</loc><lastmod>${structurizrArticle.en.isoDate}</lastmod>${links}</url>`;
};

export function renderSitemap(): string {
  const landingEntries = localeOptions.map((option) => (
    urlEntry(`/${option.locale}/`, (locale) => `/${locale}/`)
  ));
  const legalEntries = legalKinds.flatMap((kind) => localeOptions.map((option) => (
    urlEntry(`/${option.locale}/${kind}/`, (locale) => `/${locale}/${kind}/`)
  )));

  const articleEntries = articleLocales.map((locale) => articleEntry(`/${locale}/${STRUCTURIZR_ARTICLE_SLUG}/`));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...landingEntries,
    ...articleEntries,
    ...legalEntries,
    '</urlset>',
  ].join('');
}

export function renderSitemapIndex(): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `<sitemap><loc>${siteOrigin}/sitemap-0.xml</loc></sitemap>`,
    '</sitemapindex>',
  ].join('');
}
