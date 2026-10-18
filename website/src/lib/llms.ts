import { alternativeProducts, alternativesCopy } from './alternatives';
import { STRUCTURIZR_ARTICLE_SLUG, articleLocales, structurizrArticle } from './articles';
import { LICENSE_ID, LICENSE_URL, REPOSITORY_URL, copy, localeOptions } from './content';
import { YOUTUBE_CHANNEL_URL, tourVideos, youtubeWatchUrl } from './video';

/**
 * Plain-text summaries for LLM crawlers and answer engines (https://llmstxt.org).
 * Generated from the same copy as the pages so the two never drift apart.
 */

const siteOrigin = 'https://maplespire.ca';
const appUrl = 'https://app.maplespire.ca';
const en = copy.en;
const article = structurizrArticle.en;
const articleUrl = (locale: string) => `${siteOrigin}/${locale}/${STRUCTURIZR_ARTICLE_SLUG}/`;

const summary = [
  `> MapleSpire is a free, open-source (${LICENSE_ID}) and self-hostable C4 architecture modeling tool.`,
  '> Objects and relationships live once in a shared model that every diagram references, tags and technologies',
  '> are governed in organization-wide catalogs, and teams edit together in real time, including offline.',
].join('\n');

const keyFacts = [
  `- License: ${LICENSE_ID} (${LICENSE_URL}). Source code: ${REPOSITORY_URL}`,
  '- Price: free. No per-editor licensing. A free hosted demo is available for evaluation only, not production.',
  '- Self-hosting: Docker Compose with PostgreSQL 16, Redis, a sync server and the web app.',
  '- Modeling: native C4 (people, software systems, containers, components), one shared model per landscape, drill-down diagrams, flows and architecture decision records (ADRs).',
  '- Governance: organization-wide tags and tag groups referenced by ID (rename, recolor, merge and archive apply everywhere); a managed technology catalog with aliases, icons, lifecycle (active, deprecated, retired, merged) and a submission and approval workflow; the version in use is recorded per technology usage.',
  '- Access: organization roles, team read/write grants per landscape inherited downward, OIDC single sign-on with Google or Microsoft, audit log of administrative actions.',
  '- Change management: drafts with a change list and three-way merge with conflict detection; per-diagram history and landscape restore points.',
  '- Collaboration: real-time co-editing with CRDTs; offline-first editing that syncs on reconnect.',
  '- Interoperability: imports Structurizr DSL; exports Structurizr DSL, Mermaid, JSON, CSV, Markdown, HTML, SVG and PNG.',
  '- Current limits: drafts have no formal approval step yet; owning teams and custom properties are not yet editable in the interface; the self-hosted sync server runs as a single instance.',
  '- Origin: Canadian project (Québec).',
];

const videoLinks = [
  `- [${tourVideos.en.title}](${youtubeWatchUrl(tourVideos.en)}): 2:29 product tour in English, English and French captions`,
  `- [${tourVideos.fr.title}](${youtubeWatchUrl(tourVideos.fr)}): the same tour narrated in French`,
];

export function renderLlmsTxt(): string {
  return [
    '# MapleSpire',
    '',
    summary,
    '',
    '## Key facts',
    '',
    ...keyFacts,
    '',
    '## Pages',
    '',
    ...localeOptions.map((option) => `- [${copy[option.locale].meta.title}](${siteOrigin}/${option.locale}/): ${option.name} landing page`),
    ...articleLocales.map((locale) => `- [${structurizrArticle[locale].title}](${articleUrl(locale)}): ${structurizrArticle[locale].description}`),
    '',
    '## Product',
    '',
    `- [Source code on GitHub](${REPOSITORY_URL}): ${LICENSE_ID} repository with Docker Compose setup`,
    `- [Hosted demo](${appUrl}): free evaluation instance, not for production`,
    '',
    '## Video',
    '',
    ...videoLinks,
    `- [YouTube channel](${YOUTUBE_CHANNEL_URL}): MapleSpire product videos`,
    '',
    '## Optional',
    '',
    `- [Full text for LLMs](${siteOrigin}/llms-full.txt): landing copy, FAQ, market comparison and the Structurizr article in one file`,
    `- [Terms of service](${siteOrigin}/en/termsofservice/)`,
    `- [Privacy statement](${siteOrigin}/en/privacystatement/)`,
    '',
  ].join('\n');
}

export function renderLlmsFullTxt(): string {
  const alternatives = alternativesCopy.en;
  const tokens = alternatives.tokens;
  const comparison = alternativeProducts.map((product) => [
    `### ${product.name}`,
    '',
    `- Approach: ${tokens.approach[product.approach]}`,
    `- C4 support: ${tokens.c4[product.c4]}`,
    `- Connected model: ${tokens.sharedModel[product.sharedModel]}`,
    `- Teamwork: ${tokens.collaboration[product.collaboration]}`,
    `- Offline editing: ${tokens.offline[product.offline]}`,
    `- Self-hosting: ${tokens.deployment[product.deployment]}`,
    `- Source: ${tokens.sourceCode[product.sourceCode]}`,
    `- Public entry point: ${alternatives.prices[product.id]}`,
    `- Best fit and limits: ${alternatives.takes[product.id]}`,
    `- Sources: ${product.sources.map((source) => source.url).join(', ')}`,
    '',
  ].join('\n'));

  const articleBody = article.sections.map((section) => [
    `### ${section.title}`,
    '',
    ...(section.paragraphs ?? []).flatMap((paragraph) => [paragraph, '']),
    ...(section.table
      ? [
          `| ${section.table.columns.join(' | ')} |`,
          `| ${section.table.columns.map(() => '---').join(' | ')} |`,
          ...section.table.rows.map((row) => `| ${row.join(' | ')} |`),
          '',
        ]
      : []),
    ...(section.links ?? []).map((link) => `- [${link.label}](${link.url})`),
    ...(section.links ? [''] : []),
  ].join('\n'));

  return [
    '# MapleSpire — full reference',
    '',
    summary,
    '',
    `Canonical site: ${siteOrigin}/en/ · Source: ${REPOSITORY_URL} · License: ${LICENSE_ID}`,
    '',
    '## Key facts',
    '',
    ...keyFacts,
    '',
    '## What MapleSpire does',
    '',
    en.hero.body,
    '',
    ...en.chapters.flatMap((chapter) => [`### ${chapter.title}`, '', chapter.body, '']),
    `### ${en.governance.title}`,
    '',
    en.governance.body,
    '',
    ...en.governance.items.map((item) => `- **${item.title}**: ${item.body}`),
    '',
    '## Product tour video',
    '',
    tourVideos.en.description,
    '',
    ...videoLinks,
    '',
    'Chapters:',
    '',
    ...tourVideos.en.chapters.map((chapter) => (
      `- ${Math.floor(chapter.start / 60)}:${String(chapter.start % 60).padStart(2, '0')} ${chapter.label}`
    )),
    '',
    '## Frequently asked questions',
    '',
    ...en.facts.items.flatMap((item) => [`### ${item.question}`, '', item.answer, '']),
    '## Market comparison',
    '',
    alternatives.body,
    '',
    `${alternatives.verified} ${alternatives.caveat}`,
    '',
    ...comparison,
    `## ${article.title}`,
    '',
    `Source page: ${articleUrl('en')} (French: ${articleUrl('fr')}). ${article.updatedLabel} ${article.updatedDate}.`,
    '',
    article.summary,
    '',
    article.verdict,
    '',
    ...articleBody,
    '## Contact',
    '',
    'support@maplespire.ca',
    '',
  ].join('\n');
}
