import type { Locale } from './content';

/**
 * The product tour on YouTube, in English and in French. The French page plays the
 * French recording; every other locale plays the English one (captions on YouTube).
 * Shared by the landing section, the VideoObject structured data, the video sitemap
 * and llms.txt, so the four never drift apart.
 */

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@MapleSpire';
/** The poster, in the video's language: WebP on the page, PNG for crawlers (thumbnails). */
export const videoPosterPath = (video: { language: string }, format: 'webp' | 'png' = 'webp') => `/media/video-tour-${video.language}.${format}`;

export type VideoLanguage = 'en' | 'fr';

export type TourVideo = {
  language: VideoLanguage;
  htmlLang: string;
  youtubeId: string;
  title: string;
  description: string;
  /** ISO 8601 */
  duration: string;
  uploadDate: string;
  chapters: Array<{ start: number; label: string }>;
};

const shared = { duration: 'PT2M29S', uploadDate: '2026-10-18T12:00:00-04:00' } as const;

export const tourVideos: Record<VideoLanguage, TourVideo> = {
  en: {
    ...shared,
    language: 'en',
    htmlLang: 'en',
    youtubeId: 'ZCAHP50Zly8',
    title: 'MapleSpire — One living C4 model for every architecture diagram',
    description:
      'A 2½-minute tour of MapleSpire, the free, open-source (AGPL-3.0) C4 architecture modeling tool: the AI drafts a real C4 model from a description, every diagram is a view of one shared model, offline-first editing, tags and perspectives, flows, AI-drafted architecture decision records, drafts with review and merge, live collaboration, share links and exports, an MCP server for coding agents, and a 3D view.',
    chapters: [
      { start: 0, label: 'Still fighting your diagram tool?' },
      { start: 12, label: 'Describe your system, the AI builds a real C4 model' },
      { start: 27, label: 'Make it yours: shapes, logos, connections' },
      { start: 36, label: 'Context → containers → components' },
      { start: 45, label: 'Every box is a real model object' },
      { start: 56, label: 'Offline-first' },
      { start: 63, label: 'Tags and perspectives' },
      { start: 74, label: 'Flows played on the diagram' },
      { start: 82, label: 'AI-drafted architecture decision records' },
      { start: 93, label: 'Drafts: review and merge changes' },
      { start: 102, label: 'Live collaboration and comments' },
      { start: 111, label: 'Share links and exports' },
      { start: 120, label: 'MCP for coding agents' },
      { start: 125, label: '3D, themes and decorations' },
    ],
  },
  fr: {
    ...shared,
    language: 'fr',
    htmlLang: 'fr',
    youtubeId: '9KxfEjkmCxo',
    title: "MapleSpire — Un seul modèle C4 vivant pour tous vos diagrammes d'architecture",
    description:
      "Une visite de 2 min 30 de MapleSpire, l'outil de modélisation d'architecture C4 gratuit et open source (AGPL-3.0) : l'IA rédige un vrai modèle C4 à partir d'une description, chaque diagramme est une vue d'un seul modèle partagé, édition hors ligne, étiquettes et perspectives, flux, brouillons de décisions d'architecture rédigés par l'IA, brouillons avec revue et fusion, collaboration en direct, liens de partage et exports, serveur MCP pour les agents de code, et vue 3D.",
    chapters: [
      { start: 0, label: 'Encore en train de vous battre avec votre outil de diagrammes ?' },
      { start: 12, label: "Décrivez votre système, l'IA construit un vrai modèle C4" },
      { start: 27, label: 'Appropriez-vous-le : formes, logos, connexions' },
      { start: 36, label: 'Contexte → conteneurs → composants' },
      { start: 45, label: 'Chaque boîte est un vrai objet du modèle' },
      { start: 56, label: 'Hors ligne d’abord' },
      { start: 63, label: 'Étiquettes et perspectives' },
      { start: 74, label: 'Des flux joués sur le diagramme' },
      { start: 82, label: "Décisions d'architecture rédigées par l'IA" },
      { start: 93, label: 'Brouillons : revue et fusion des changements' },
      { start: 102, label: 'Collaboration en direct et commentaires' },
      { start: 111, label: 'Liens de partage et exports' },
      { start: 120, label: 'MCP pour les agents de code' },
      { start: 125, label: '3D, thèmes et décorations' },
    ],
  },
};

export const videoLanguageFor = (locale: Locale): VideoLanguage => (locale === 'fr' ? 'fr' : 'en');
export const tourVideoFor = (locale: Locale): TourVideo => tourVideos[videoLanguageFor(locale)];
export const youtubeWatchUrl = (video: TourVideo) => `https://www.youtube.com/watch?v=${video.youtubeId}`;
/** youtube-nocookie: no YouTube cookie until the visitor presses play. */
export const youtubeEmbedUrl = (video: TourVideo) => `https://www.youtube-nocookie.com/embed/${video.youtubeId}`;

export type VideoSectionCopy = {
  eyebrow: string;
  title: string;
  body: string;
  play: string;
  watchOnYoutube: string;
  otherLanguage: string;
  captionsNote: string;
};

export const videoCopy: Record<Locale, VideoSectionCopy> = {
  fr: {
    eyebrow: 'Visite guidée',
    title: 'MapleSpire en 2 minutes 30.',
    body: "De la description d'un système à un modèle C4 vivant : IA, vues reliées, hors ligne, décisions d'architecture, brouillons, collaboration, MCP et 3D.",
    play: 'Lire la vidéo',
    watchOnYoutube: 'Voir sur YouTube',
    otherLanguage: 'English version',
    captionsNote: 'Sous-titres français et anglais disponibles sur YouTube.',
  },
  en: {
    eyebrow: 'Product tour',
    title: 'MapleSpire in 2½ minutes.',
    body: 'From a system description to a living C4 model: AI, connected views, offline editing, decision records, drafts, collaboration, MCP and 3D.',
    play: 'Play the video',
    watchOnYoutube: 'Watch on YouTube',
    otherLanguage: 'Version française',
    captionsNote: 'English and French captions available on YouTube.',
  },
  zh: {
    eyebrow: '产品导览',
    title: '两分半钟了解 MapleSpire。',
    body: '从系统描述到持续更新的 C4 模型：AI、互相关联的视图、离线编辑、架构决策记录、草稿、实时协作、MCP 与 3D。',
    play: '播放视频',
    watchOnYoutube: '在 YouTube 上观看',
    otherLanguage: 'Version française',
    captionsNote: '视频为英文，YouTube 上提供英文和法文字幕。',
  },
  ja: {
    eyebrow: 'プロダクトツアー',
    title: '2分半でわかる MapleSpire。',
    body: 'システムの説明から生きた C4 モデルへ：AI、つながったビュー、オフライン編集、意思決定記録、ドラフト、共同編集、MCP、3D。',
    play: '動画を再生',
    watchOnYoutube: 'YouTube で見る',
    otherLanguage: 'Version française',
    captionsNote: '動画は英語です。YouTube で英語・フランス語の字幕を利用できます。',
  },
  ko: {
    eyebrow: '제품 둘러보기',
    title: '2분 30초 만에 보는 MapleSpire.',
    body: '시스템 설명에서 살아 있는 C4 모델까지: AI, 연결된 뷰, 오프라인 편집, 아키텍처 결정 기록, 초안, 실시간 협업, MCP, 3D.',
    play: '동영상 재생',
    watchOnYoutube: 'YouTube에서 보기',
    otherLanguage: 'Version française',
    captionsNote: '영상은 영어이며 YouTube에서 영어·프랑스어 자막을 제공합니다.',
  },
  hi: {
    eyebrow: 'प्रोडक्ट टूर',
    title: 'ढाई मिनट में MapleSpire।',
    body: 'सिस्टम के विवरण से जीवित C4 मॉडल तक: AI, जुड़े हुए व्यू, ऑफ़लाइन एडिटिंग, आर्किटेक्चर निर्णय रिकॉर्ड, ड्राफ़्ट, लाइव सहयोग, MCP और 3D।',
    play: 'वीडियो चलाएँ',
    watchOnYoutube: 'YouTube पर देखें',
    otherLanguage: 'Version française',
    captionsNote: 'वीडियो अंग्रेज़ी में है; YouTube पर अंग्रेज़ी और फ़्रेंच उपशीर्षक उपलब्ध हैं।',
  },
};

/** The VideoObject for structured data (schema.org), shared by the page and its tests. */
export function videoObject(video: TourVideo, siteUrl: string, pageUrl: string) {
  const watch = youtubeWatchUrl(video);
  return {
    '@type': 'VideoObject',
    '@id': `${pageUrl}#video`,
    name: video.title,
    description: video.description,
    inLanguage: video.htmlLang,
    thumbnailUrl: [
      new URL(videoPosterPath(video, 'png'), siteUrl).href,
      `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    ],
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: watch,
    embedUrl: youtubeEmbedUrl(video),
    url: watch,
    isFamilyFriendly: true,
    hasPart: video.chapters.map((chapter, index) => ({
      '@type': 'Clip',
      name: chapter.label,
      startOffset: chapter.start,
      endOffset: video.chapters[index + 1]?.start ?? 149,
      url: `${watch}&t=${chapter.start}s`,
    })),
  };
}
