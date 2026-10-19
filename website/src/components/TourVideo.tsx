import { useState } from 'react';
import { localeOptions } from '../lib/content';
import type { Locale } from '../lib/content';
import {
  alternateTourVideoFor,
  tourVideoFor,
  videoCopy,
  videoPosterPath,
  youtubeEmbedUrl,
  youtubeWatchUrl,
} from '../lib/video';

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

/**
 * Click-to-play YouTube facade: the page ships a local poster and no YouTube script,
 * frame or cookie until the visitor presses play (then youtube-nocookie). Chapters are
 * real links to the YouTube timestamps, so crawlers and no-JS readers get them too.
 */
export default function TourVideo({ locale }: { locale: Locale }) {
  const text = videoCopy[locale];
  const video = tourVideoFor(locale);
  const other = alternateTourVideoFor(locale);
  // Chapter titles are in the recording's language: mark it, so an Arabic page lays
  // out English titles left-to-right instead of reordering their punctuation.
  const chapterLanguage = video.language === locale
    ? {}
    : { lang: video.htmlLang, dir: localeOptions.find((option) => option.locale === video.language)?.dir ?? 'ltr' };
  const [start, setStart] = useState<number | null>(null);

  const play = (seconds: number) => setStart(seconds);
  const embed = start === null
    ? null
    : `${youtubeEmbedUrl(video)}?autoplay=1&rel=0&hl=${video.language}&cc_lang_pref=${video.language}${start ? `&start=${start}` : ''}`;

  return (
    <section className="ms-open-source ms-video" id="video" aria-labelledby="video-title">
      <div className="ms-open-source-heading">
        <p className="eyebrow"><span />{text.eyebrow}</p>
        <h2 id="video-title">{text.title}</h2>
        <p>{text.body}</p>
      </div>

      <div className="ms-video-layout">
        <div className="ms-video-frame">
          {embed ? (
            <iframe
              key={embed}
              src={embed}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <a
              className="ms-video-poster"
              href={youtubeWatchUrl(video)}
              onClick={(event) => { event.preventDefault(); play(0); }}
              aria-label={`${text.play} — ${video.title}`}
            >
              <img src={videoPosterPath(video)} alt="" width={1920} height={1080} loading="lazy" decoding="async" />
              <span className="ms-video-play" aria-hidden="true"><i /></span>
              <span className="ms-video-duration" aria-hidden="true">2:29</span>
            </a>
          )}
        </div>

        <div className="ms-video-side">
          <ol className="ms-video-chapters" {...chapterLanguage}>
            {video.chapters.map((chapter) => (
              <li key={chapter.start}>
                <a
                  href={`${youtubeWatchUrl(video)}&t=${chapter.start}s`}
                  onClick={(event) => { event.preventDefault(); play(chapter.start); }}
                >
                  <time dateTime={`PT${chapter.start}S`}>{clock(chapter.start)}</time>
                  <span>{chapter.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="ms-video-links">
            <a href={youtubeWatchUrl(video)} target="_blank" rel="noreferrer">{text.watchOnYoutube}<i aria-hidden="true">↗</i></a>
            <a href={youtubeWatchUrl(other)} target="_blank" rel="noreferrer" hrefLang={other.htmlLang} lang={other.htmlLang}>
              {text.otherLanguage}<i aria-hidden="true">↗</i>
            </a>
          </div>
          <p className="ms-video-note">{text.captionsNote}</p>
        </div>
      </div>
    </section>
  );
}
