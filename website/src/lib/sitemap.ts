import { localeOptions } from './content';
import { STRUCTURIZR_ARTICLE_SLUG, articleLocales, structurizrArticle } from './articles';
import { tourVideoFor, videoPosterPath, youtubeEmbedUrl } from './video';
import type { Locale } from './content';

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

const urlEntry = (location: string, pathForLocale: (locale: string) => string, extra = '') => (
  `<url><loc>${escapeXml(absolute(location))}</loc>${alternateLinks(pathForLocale)}${extra}</url>`
);

/** Google video sitemap entry for the product tour embedded on each landing page. */
const videoEntry = (locale: Locale) => {
  const video = tourVideoFor(locale);
  return [
    '<video:video>',
    `<video:thumbnail_loc>${escapeXml(absolute(videoPosterPath(video, 'png')))}</video:thumbnail_loc>`,
    `<video:title>${escapeXml(video.title)}</video:title>`,
    `<video:description>${escapeXml(video.description)}</video:description>`,
    `<video:player_loc>${escapeXml(youtubeEmbedUrl(video))}</video:player_loc>`,
    '<video:duration>149</video:duration>',
    `<video:publication_date>${escapeXml(video.uploadDate)}</video:publication_date>`,
    '<video:family_friendly>yes</video:family_friendly>',
    '</video:video>',
  ].join('');
};

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
    urlEntry(`/${option.locale}/`, (locale) => `/${locale}/`, videoEntry(option.locale))
  ));
  const legalEntries = legalKinds.flatMap((kind) => localeOptions.map((option) => (
    urlEntry(`/${option.locale}/${kind}/`, (locale) => `/${locale}/${kind}/`)
  )));

  const articleEntries = articleLocales.map((locale) => articleEntry(`/${locale}/${STRUCTURIZR_ARTICLE_SLUG}/`));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">',
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
