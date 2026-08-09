import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { localeOptions } from '../lib/content';
import type { Locale, SiteCopy } from '../lib/content';
import { legalCopy } from '../lib/legal';
import { alternativesCopy, filterAlternativeProducts, statusTone } from '../lib/alternatives';
import type { AlternativeFilter } from '../lib/alternatives';
import {
  COMPARISON_MAX,
  COMPARISON_MIN,
  comparisonProgressForScroll,
  createManualComparison,
  resolveComparisonDivider,
} from '../lib/comparison';
import { normalizeWheelDelta, resolveSmartTableScroll } from '../lib/smartTableScroll';
import ContactForm from './ContactForm';
import SceneVisual from './SceneVisual';

type SiteShellProps = {
  content: SiteCopy;
  appUrl: string;
  contactEndpoint: string;
};

type ComparisonStyle = CSSProperties & { '--divider': string };
type CursorStyle = CSSProperties & { '--cursor-color': string };

function StatusPill({ value, children }: { value: string; children: ReactNode }) {
  return <span className={`ms-status ms-status-${statusTone(value)}`}>{children}</span>;
}

const collaborationCursors = [
  { name: 'Maya', color: '#f3a7b7', startX: '14%', startY: '24%', middleX: '40%', middleY: '38%', endX: '66%', endY: '29%' },
  { name: 'Alex', color: '#9dc8f4', startX: '72%', startY: '18%', middleX: '61%', middleY: '51%', endX: '34%', endY: '63%' },
  { name: 'Sam', color: '#b9dda8', startX: '19%', startY: '72%', middleX: '46%', middleY: '59%', endX: '73%', endY: '70%' },
  { name: 'Noor', color: '#d4b3ee', startX: '82%', startY: '67%', middleX: '64%', middleY: '42%', endX: '47%', endY: '22%' },
];

export default function SiteShell({ content, appUrl, contactEndpoint }: SiteShellProps) {
  const legal = legalCopy[content.locale];
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const flightRef = useRef<HTMLElement>(null);
  const alternativeFiltersRef = useRef<HTMLDivElement>(null);
  const alternativesTableShellRef = useRef<HTMLDivElement>(null);
  const alternativesTableWrapRef = useRef<HTMLDivElement>(null);
  const alternativesStickyTrackRef = useRef<HTMLDivElement>(null);
  const alternativesScrollbarRef = useRef<HTMLDivElement>(null);
  const alternativesScrollbarThumbRef = useRef<HTMLSpanElement>(null);
  const comparisonProgress = useRef(0);
  const manualComparison = useRef<ReturnType<typeof createManualComparison> | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [headerCompact, setHeaderCompact] = useState(false);
  const [divider, setDivider] = useState(COMPARISON_MAX);
  const [flightStep, setFlightStep] = useState(0);
  const [alternativeFilter, setAlternativeFilter] = useState<AlternativeFilter>('all');

  useEffect(() => {
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    setTheme(current);

    const onScroll = () => setHeaderCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const rail = alternativeFiltersRef.current;
    if (!rail) return;

    const onWheel = (event: WheelEvent) => {
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      const delta = normalizeWheelDelta(event.deltaY, event.deltaMode, window.innerHeight);
      if (maxScroll <= 1 || Math.abs(delta) < 0.5 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const atStart = rail.scrollLeft <= 1;
      const atEnd = maxScroll - rail.scrollLeft <= 1;
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;

      event.preventDefault();
      rail.scrollLeft = Math.min(maxScroll, Math.max(0, rail.scrollLeft + delta));
    };

    rail.addEventListener('wheel', onWheel, { passive: false });
    return () => rail.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    const shell = alternativesTableShellRef.current;
    const wrap = alternativesTableWrapRef.current;
    const stickyTrack = alternativesStickyTrackRef.current;
    const scrollbar = alternativesScrollbarRef.current;
    const scrollbarThumb = alternativesScrollbarThumbRef.current;
    const header = rootRef.current?.querySelector<HTMLElement>('.site-header');
    const stickyHeader = shell?.querySelector<HTMLElement>('.ms-alternatives-sticky-header');
    if (!shell || !wrap || !stickyTrack || !scrollbar || !scrollbarThumb || !header || !stickyHeader) return;

    let exitScrollFrame = 0;
    let dragPointer: number | null = null;
    let dragOffset = 0;

    const syncStickyHeader = () => {
      const headerBottom = window.innerWidth > 800 && window.scrollY > 48
        ? 66
        : Math.round(header.getBoundingClientRect().bottom);
      const shellBounds = shell.getBoundingClientRect();
      const stickyBounds = stickyHeader.getBoundingClientRect();
      const isDocked = window.innerWidth > 760
        && window.scrollY > 48
        && shellBounds.top <= headerBottom + 1
        && shellBounds.bottom > headerBottom + stickyBounds.height;
      header.style.setProperty('--table-dock-width', `${shellBounds.width}px`);
      header.classList.toggle('is-table-docked', isDocked);
      shell.classList.toggle('is-table-docked', isDocked);
      shell.style.setProperty('--table-sticky-top', `${headerBottom}px`);
      shell.style.setProperty('--table-scroll-left', `${wrap.scrollLeft}px`);
      stickyTrack.style.transform = `translate3d(${-wrap.scrollLeft}px, 0, 0)`;

      const maxScroll = Math.max(0, wrap.scrollWidth - wrap.clientWidth);
      const scrollbarWidth = scrollbar.clientWidth;
      const thumbWidth = Math.max(64, scrollbarWidth * (wrap.clientWidth / Math.max(1, wrap.scrollWidth)));
      const thumbTravel = Math.max(0, scrollbarWidth - thumbWidth);
      const thumbOffset = maxScroll > 0 ? thumbTravel * (wrap.scrollLeft / maxScroll) : 0;
      scrollbarThumb.style.width = `${thumbWidth}px`;
      scrollbarThumb.style.transform = `translate3d(${thumbOffset}px, 0, 0)`;
      scrollbar.setAttribute('aria-valuemax', `${Math.round(maxScroll)}`);
      scrollbar.setAttribute('aria-valuenow', `${Math.round(wrap.scrollLeft)}`);
    };

    const scrollFromPointer = (clientX: number) => {
      const bounds = scrollbar.getBoundingClientRect();
      const thumbWidth = scrollbarThumb.getBoundingClientRect().width;
      const thumbTravel = Math.max(1, bounds.width - thumbWidth);
      const pointerPosition = Math.min(thumbTravel, Math.max(0, clientX - bounds.left - dragOffset));
      wrap.scrollLeft = (pointerPosition / thumbTravel) * Math.max(0, wrap.scrollWidth - wrap.clientWidth);
      syncStickyHeader();
    };

    const onScrollbarPointerDown = (event: globalThis.PointerEvent) => {
      if (event.button !== 0) return;
      const thumbBounds = scrollbarThumb.getBoundingClientRect();
      dragPointer = event.pointerId;
      dragOffset = event.target === scrollbarThumb ? event.clientX - thumbBounds.left : thumbBounds.width / 2;
      scrollbar.setPointerCapture(event.pointerId);
      scrollFromPointer(event.clientX);
      event.preventDefault();
    };

    const onScrollbarPointerMove = (event: globalThis.PointerEvent) => {
      if (event.pointerId !== dragPointer) return;
      scrollFromPointer(event.clientX);
    };

    const onScrollbarPointerUp = (event: globalThis.PointerEvent) => {
      if (event.pointerId !== dragPointer) return;
      dragPointer = null;
      if (scrollbar.hasPointerCapture(event.pointerId)) scrollbar.releasePointerCapture(event.pointerId);
    };

    const onScrollbarKeyDown = (event: KeyboardEvent) => {
      const step = Math.max(72, wrap.clientWidth * 0.18);
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') wrap.scrollLeft -= step;
      else if (event.key === 'ArrowRight' || event.key === 'PageDown') wrap.scrollLeft += step;
      else if (event.key === 'Home') wrap.scrollLeft = 0;
      else if (event.key === 'End') wrap.scrollLeft = wrap.scrollWidth;
      else return;
      syncStickyHeader();
      event.preventDefault();
    };

    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth <= 760 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const bounds = wrap.getBoundingClientRect();
      const headerBottom = header.getBoundingClientRect().bottom;
      const delta = normalizeWheelDelta(event.deltaY, event.deltaMode, window.innerHeight);
      const result = resolveSmartTableScroll({
        delta,
        scrollLeft: wrap.scrollLeft,
        maxScroll: wrap.scrollWidth - wrap.clientWidth,
        tableTop: bounds.top,
        tableBottom: bounds.bottom,
        headerBottom,
        viewportHeight: window.innerHeight,
      });

      if (!result.handled) return;

      event.preventDefault();
      const alignmentOffset = bounds.top - headerBottom;
      if (alignmentOffset > 0.5 && alignmentOffset <= 24) {
        window.scrollBy({ top: alignmentOffset, behavior: 'instant' as ScrollBehavior });
      }
      wrap.scrollLeft = result.nextScrollLeft;
      syncStickyHeader();

      if (result.overflowY !== 0) {
        cancelAnimationFrame(exitScrollFrame);
        exitScrollFrame = requestAnimationFrame(() => window.scrollBy({ top: result.overflowY, behavior: 'auto' }));
      }
    };

    syncStickyHeader();
    wrap.addEventListener('scroll', syncStickyHeader, { passive: true });
    wrap.addEventListener('wheel', onWheel, { passive: false });
    scrollbar.addEventListener('pointerdown', onScrollbarPointerDown);
    scrollbar.addEventListener('pointermove', onScrollbarPointerMove);
    scrollbar.addEventListener('pointerup', onScrollbarPointerUp);
    scrollbar.addEventListener('pointercancel', onScrollbarPointerUp);
    scrollbar.addEventListener('keydown', onScrollbarKeyDown);
    window.addEventListener('scroll', syncStickyHeader, { passive: true });
    window.addEventListener('resize', syncStickyHeader, { passive: true });
    const headerResizeObserver = new ResizeObserver(syncStickyHeader);
    headerResizeObserver.observe(header);

    return () => {
      cancelAnimationFrame(exitScrollFrame);
      wrap.removeEventListener('scroll', syncStickyHeader);
      wrap.removeEventListener('wheel', onWheel);
      scrollbar.removeEventListener('pointerdown', onScrollbarPointerDown);
      scrollbar.removeEventListener('pointermove', onScrollbarPointerMove);
      scrollbar.removeEventListener('pointerup', onScrollbarPointerUp);
      scrollbar.removeEventListener('pointercancel', onScrollbarPointerUp);
      scrollbar.removeEventListener('keydown', onScrollbarKeyDown);
      window.removeEventListener('scroll', syncStickyHeader);
      window.removeEventListener('resize', syncStickyHeader);
      headerResizeObserver.disconnect();
      header.classList.remove('is-table-docked');
      shell.classList.remove('is-table-docked');
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    const flight = flightRef.current;
    if (!root || !hero || !flight || typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .fromTo('.ms-hero-copy > *', { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.72, stagger: 0.075 })
        .fromTo('.ms-comparison', { y: 24, scale: 0.965, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 0.95 }, 0.08)
        .fromTo('.ms-comparison-label', { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.08 }, 0.72);

      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const revealProgress = comparisonProgressForScroll(self.progress);
          comparisonProgress.current = revealProgress;
          const resolved = resolveComparisonDivider(revealProgress, manualComparison.current);
          manualComparison.current = resolved.manual;
          setDivider(resolved.divider);
        },
      });

      const scenes = Array.from(flight.querySelectorAll<HTMLElement>('.ms-flight-scene'));
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: flight,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.75,
          invalidateOnRefresh: true,
          onUpdate: (self) => setFlightStep(Math.min(scenes.length - 1, Math.floor(self.progress * scenes.length))),
        },
      });

      gsap.set(scenes, { autoAlpha: 0, scale: 0.88, transformOrigin: '50% 50%' });
      gsap.set(scenes[0], { autoAlpha: 1, scale: 1 });

      scenes.forEach((scene, sceneIndex) => {
        const start = sceneIndex;
        const entryStart = sceneIndex === 0 ? 0 : start - 0.16;
        const copy = scene.querySelector<HTMLElement>('.ms-flight-copy');
        const base = scene.querySelector<HTMLElement>('.ms-image-base');
        const layers = Array.from(scene.querySelectorAll<HTMLElement>('.ms-image-layer'));
        const callouts = Array.from(scene.querySelectorAll<HTMLElement>('.ms-scene-callout'));
        const cursors = Array.from(scene.querySelectorAll<HTMLElement>('.ms-live-cursor'));

        if (sceneIndex > 0) {
          timeline.fromTo(
            scene,
            { autoAlpha: 0, scale: 0.82 },
            { autoAlpha: 1, scale: 1, duration: 0.42, ease: 'none' },
            start - 0.24,
          );
        }

        if (base) {
          timeline.fromTo(base, { opacity: 0.66 }, { opacity: 1, duration: 0.46, ease: 'none' }, entryStart);
        }

        layers.forEach((layer, layerIndex) => {
          timeline.fromTo(
            layer,
            {
              xPercent: Number(layer.dataset.x ?? 0),
              yPercent: Number(layer.dataset.y ?? 0),
              rotation: Number(layer.dataset.rotate ?? 0),
              scale: Number(layer.dataset.scale ?? 1),
            },
            { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, duration: 0.44, ease: 'power2.out' },
            entryStart + layerIndex * 0.035,
          );
        });

        if (copy) {
          if (sceneIndex === 0) {
            timeline.set(copy, { y: 0, autoAlpha: 1 }, 0);
          } else {
            timeline.fromTo(copy, { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.38 }, start - 0.02);
          }
        }

        if (callouts.length) {
          timeline.fromTo(callouts, { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.24, stagger: 0.05 }, start + 0.2);
        }

        cursors.forEach((cursor, cursorIndex) => {
          timeline.fromTo(
            cursor,
            {
              autoAlpha: 0,
              left: cursor.dataset.startX,
              top: cursor.dataset.startY,
            },
            {
              autoAlpha: 1,
              left: cursor.dataset.middleX,
              top: cursor.dataset.middleY,
              duration: 0.42,
              ease: 'none',
            },
            start - 0.05 + cursorIndex * 0.035,
          );
          timeline.to(
            cursor,
            {
              left: cursor.dataset.endX,
              top: cursor.dataset.endY,
              duration: 0.52,
              ease: 'none',
            },
            start + 0.38 + cursorIndex * 0.025,
          );
        });

        if (sceneIndex < scenes.length - 1) {
          timeline.to(scene, { autoAlpha: 0, scale: 1.14, duration: 0.38, ease: 'none' }, start + 0.72);
        }
      });

      gsap.fromTo(
        '.ms-proof-card',
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.09,
          scrollTrigger: { trigger: '.ms-proof-grid', start: 'top 82%', once: true },
        },
      );

      gsap.fromTo(
        '.ms-alternatives-intro > *, .ms-alternatives-toolbar',
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.58,
          stagger: 0.07,
          scrollTrigger: { trigger: '.ms-alternatives', start: 'top 78%', once: true },
        },
      );
    }, root);

    const refreshAfterImages = () => ScrollTrigger.refresh();
    const images = Array.from(root.querySelectorAll<HTMLImageElement>('.ms-flight img'));
    images.forEach((image) => {
      if (!image.complete) image.addEventListener('load', refreshAfterImages, { once: true });
    });
    ScrollTrigger.refresh();

    return () => {
      context.revert();
      images.forEach((image) => image.removeEventListener('load', refreshAfterImages));
    };
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    localStorage.setItem('maplespire:theme', next);
    setTheme(next);
  }

  function rememberLocale(locale: Locale) {
    localStorage.setItem('maplespire:locale', locale);
  }

  function updateComparison(value: number) {
    manualComparison.current = createManualComparison(value, comparisonProgress.current);
    setDivider(value);
  }

  function tiltComparison(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${(-y * 2.2).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${(x * 2.8).toFixed(2)}deg`);
  }

  function resetComparisonTilt(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  }

  function scrollToFlightStep(index: number) {
    const flight = flightRef.current;
    if (!flight) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scenes = Array.from(flight.querySelectorAll<HTMLElement>('.ms-flight-scene'));
    if (reducedMotion) {
      scenes[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const top = flight.getBoundingClientRect().top + window.scrollY;
    const travel = Math.max(0, flight.offsetHeight - window.innerHeight);
    const alignedStops = [0.2, 0.64, 0.95];
    const progress = alignedStops[index] ?? (index / Math.max(1, scenes.length - 1));
    window.scrollTo({ top: top + travel * progress, behavior: 'smooth' });
  }

  const comparisonStyle = { '--divider': `${divider}%` } as ComparisonStyle;
  const currentLocale = localeOptions.find((option) => option.locale === content.locale) ?? localeOptions[0];
  const alternatives = alternativesCopy[content.locale];
  const visibleAlternatives = filterAlternativeProducts(alternativeFilter);
  const flightVisuals = [
    {
      kind: 'product' as const,
      src: '/media/story-collaboration.webp',
    },
    {
      kind: 'system' as const,
      src: '/media/story-exploded.webp',
    },
  ];

  return (
    <div className="site-shell ms-site-shell" ref={rootRef}>
      <a className="skip-link" href="#contact">{content.actions.skip}</a>

      <header className={`site-header ${headerCompact ? 'is-compact' : ''}`}>
        <a className="brand" href={`/${content.locale}/`} aria-label={content.nav.home}>
          <span className="brand-mark">
            <img className="mark-light" src="/brand/maplespire-mark.svg" alt="" />
            <img className="mark-dark" src="/brand/maplespire-mark-dark.svg" alt="" />
          </span>
          <span>MapleSpire</span>
        </a>

        <nav className="desktop-nav" aria-label={content.nav.primaryLabel}>
          <a href="#comparison">{content.nav.story}</a>
          <a href="#product" onClick={(event) => { event.preventDefault(); scrollToFlightStep(0); }}>{content.nav.product}</a>
          <a href="#alternatives">{alternatives.nav}</a>
          <a href="#open-source">{content.nav.openSource}</a>
          <a href="#contact">{content.nav.contact}</a>
        </nav>

        <div className="header-actions">
          <details className="locale-picker">
            <summary
              className="locale-switch"
              aria-label={content.actions.language}
              title={content.actions.language}
            >
              {currentLocale.code}
            </summary>
            <div className="locale-menu">
              {localeOptions.map((option) => (
                <a
                  href={`/${option.locale}/`}
                  hrefLang={option.htmlLang}
                  lang={option.htmlLang}
                  aria-current={option.locale === content.locale ? 'page' : undefined}
                  onClick={() => rememberLocale(option.locale)}
                  key={option.locale}
                >
                  <span>{option.code}</span>{option.name}
                </a>
              ))}
            </div>
          </details>
          <button
            className="theme-switch"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? content.actions.themeLight : content.actions.themeDark}
            title={theme === 'dark' ? content.actions.themeLight : content.actions.themeDark}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀' : '◐'}</span>
          </button>
          <a className="button button-small header-cta" href={appUrl}>{content.actions.openApp}<i>↗</i></a>
        </div>
      </header>

      <main id="main-content">
        <section className="ms-hero" id="comparison" ref={heroRef} aria-labelledby="hero-title">
          <div className="ms-hero-inner">
            <div className="ms-hero-copy">
            <p className="eyebrow ms-hero-kicker"><span />{content.hero.kicker}</p>
            <h1 id="hero-title">
              {content.hero.titleStart}<br />
              <em>{content.hero.titleAccent}</em>
            </h1>
            <p className="ms-hero-body">{content.hero.body}</p>
            <div className="ms-hero-actions">
              <a className="button button-primary" href="#product" onClick={(event) => { event.preventDefault(); scrollToFlightStep(0); }}>
                {content.actions.discover}<i aria-hidden="true">↓</i>
              </a>
              <a className="button button-ghost" href={appUrl}>{content.actions.openApp}<i aria-hidden="true">↗</i></a>
            </div>
            <ul className="ms-trust-list" aria-label={content.hero.promisesLabel}>
              <li>{content.hero.free}</li>
              <li>{content.hero.open}</li>
              <li>{content.hero.selfHosted}</li>
            </ul>
            </div>

            <div
              className="ms-comparison"
              style={comparisonStyle}
              onPointerMove={tiltComparison}
              onPointerLeave={resetComparisonTilt}
            >
            <div className="ms-comparison-frame">
              <img
                className="ms-comparison-image ms-comparison-before"
                src="/media/story-before.webp"
                alt={content.comparison.beforeAlt}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="ms-comparison-after-wrap" aria-hidden="true">
                <img
                  className="ms-comparison-image ms-comparison-after"
                  src="/media/story-product.webp"
                  alt=""
                  loading="eager"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
              <span className="ms-comparison-label ms-comparison-label-before">{content.comparison.before}</span>
              <span className="ms-comparison-label ms-comparison-label-after">{content.comparison.after}</span>
              <span className="ms-comparison-handle" aria-hidden="true"><i>↔</i></span>
              <input
                className="ms-comparison-range"
                type="range"
                min={COMPARISON_MIN}
                max={COMPARISON_MAX}
                value={Math.round(divider)}
                onChange={(event) => updateComparison(Number(event.currentTarget.value))}
                aria-label={content.comparison.control}
                aria-valuetext={`${content.comparison.before} ${Math.round(divider)}%, ${content.comparison.after} ${Math.round(100 - divider)}%`}
              />
            </div>
            <div className="ms-comparison-caption" aria-live="polite">
              <span>{content.comparison.beforeMetric}</span>
              <b>{content.comparison.hint}</b>
              <span>{content.comparison.afterMetric}</span>
            </div>
            </div>
          </div>
        </section>

        <section className="ms-flight" id="product" ref={flightRef} aria-label={content.nav.product}>
          <div className="ms-flight-sticky">
            <div className="ms-flight-scenes">
              {content.chapters.map((chapter, index) => (
                <section
                  className={`ms-flight-scene ms-flight-scene-${index}`}
                  id={chapter.id}
                  aria-labelledby={`${chapter.id}-title`}
                  key={chapter.id}
                >
                  <div className="ms-flight-visual">
                    {index < 2 ? (
                      <SceneVisual
                        variant={flightVisuals[index].kind}
                        src={flightVisuals[index].src}
                        alt={chapter.visualLabel}
                        callouts={chapter.callouts}
                        priority={index === 0}
                      />
                    ) : (
                      <figure className="ms-closeup-scene">
                        <img src="/media/story-closeup.jpeg" alt={chapter.visualLabel} loading="lazy" decoding="async" />
                        <div className="ms-collaboration-cursors" aria-hidden="true">
                          {collaborationCursors.map((cursor) => (
                            <span
                              className="ms-live-cursor"
                              style={{ '--cursor-color': cursor.color, left: cursor.startX, top: cursor.startY } as CursorStyle}
                              data-start-x={cursor.startX}
                              data-start-y={cursor.startY}
                              data-middle-x={cursor.middleX}
                              data-middle-y={cursor.middleY}
                              data-end-x={cursor.endX}
                              data-end-y={cursor.endY}
                              key={cursor.name}
                            >
                              <i />
                              <b>{cursor.name}</b>
                            </span>
                          ))}
                        </div>
                        <div className="ms-closeup-callouts" aria-hidden="true">
                          {chapter.callouts.map((callout) => <span key={callout}>{callout}</span>)}
                        </div>
                      </figure>
                    )}
                  </div>
                  <div className="ms-flight-copy">
                    <p className="eyebrow"><span>{String(index + 1).padStart(2, '0')}</span>{chapter.eyebrow}</p>
                    <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
                    <p>{chapter.body}</p>
                    <strong>{chapter.detail}</strong>
                  </div>
                </section>
              ))}
            </div>

            <nav className="ms-flight-nav" aria-label={content.nav.sequenceLabel}>
              {content.chapters.map((chapter, index) => (
                <button
                  type="button"
                  className={flightStep === index ? 'is-active' : ''}
                  aria-current={flightStep === index ? 'step' : undefined}
                  onClick={() => scrollToFlightStep(index)}
                  key={chapter.id}
                >
                  <span>0{index + 1}</span>{chapter.shortLabel}
                </button>
              ))}
            </nav>
          </div>
        </section>

        <section className="ms-open-source" id="open-source" aria-labelledby="open-source-title">
          <div className="ms-open-source-heading">
            <p className="eyebrow"><span />{content.openSource.eyebrow}</p>
            <h2 id="open-source-title">{content.openSource.title}</h2>
            <p>{content.openSource.body}</p>
          </div>
          <div className="ms-proof-grid">
            {content.openSource.proofs.map((proof, index) => (
              <article className="ms-proof-card" key={proof.title}>
                <span>0{index + 1}</span>
                <h3>{proof.title}</h3>
                <p>{proof.body}</p>
              </article>
            ))}
          </div>
          <div className="ms-open-source-actions">
            <a className="button button-primary" href={appUrl}>{content.actions.openApp}<i aria-hidden="true">↗</i></a>
            <a className="button button-ghost" href="https://github.com/MapleSpire" target="_blank" rel="noreferrer">
              {content.actions.github}<span className="ms-coming-soon">{content.actions.comingSoon}</span><i aria-hidden="true">↗</i>
            </a>
          </div>
        </section>

        <section className="ms-facts" id="facts" aria-labelledby="facts-title">
          <div className="ms-facts-heading">
            <p className="eyebrow"><span />{content.facts.eyebrow}</p>
            <h2 id="facts-title">{content.facts.title}</h2>
          </div>
          <dl className="ms-facts-list">
            {content.facts.items.map((item) => (
              <div key={item.question}>
                <dt>{item.question}</dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="ms-alternatives" id="alternatives" aria-labelledby="alternatives-title">
          <div className="ms-alternatives-intro">
            <div>
              <p className="eyebrow"><span />{alternatives.eyebrow}</p>
              <h2 id="alternatives-title">{alternatives.title}</h2>
            </div>
            <div className="ms-alternatives-summary">
              <p>{alternatives.body}</p>
              <strong>{alternatives.verified}</strong>
            </div>
          </div>

          <div className="ms-alternatives-toolbar">
            <div
              className="ms-alternative-filters"
              role="group"
              aria-label={alternatives.filtersLabel}
              ref={alternativeFiltersRef}
            >
              {(Object.keys(alternatives.filters) as AlternativeFilter[]).map((filter) => (
                <button
                  type="button"
                  className={alternativeFilter === filter ? 'is-active' : ''}
                  aria-pressed={alternativeFilter === filter}
                  onClick={(event) => {
                    setAlternativeFilter(filter);
                    event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                  }}
                  key={filter}
                >
                  {alternatives.filters[filter]}
                </button>
              ))}
            </div>
            <div className="ms-alternative-legend" aria-label={alternatives.legend.strong}>
              <span><i className="is-strong" />{alternatives.legend.strong}</span>
              <span><i className="is-conditional" />{alternatives.legend.conditional}</span>
              <span><i className="is-unavailable" />{alternatives.legend.unavailable}</span>
              <span><i className="is-na" />{alternatives.legend.notApplicable}</span>
            </div>
          </div>

          <div className="ms-alternatives-table-shell" ref={alternativesTableShellRef}>
            <div className="ms-alternatives-sticky-header" aria-hidden="true">
              <div className="ms-alternatives-sticky-track" ref={alternativesStickyTrackRef}>
                <table className="ms-alternatives-table ms-alternatives-sticky-table">
                  <thead>
                    <tr>
                      <th>{alternatives.columns.product}</th>
                      <th>{alternatives.columns.approach}</th>
                      <th>{alternatives.columns.c4}</th>
                      <th>{alternatives.columns.sharedModel}</th>
                      <th>{alternatives.columns.collaboration}</th>
                      <th>{alternatives.columns.offline}</th>
                      <th>{alternatives.columns.deployment}</th>
                      <th>{alternatives.columns.sourceCode}</th>
                      <th>{alternatives.columns.price}</th>
                      <th>{alternatives.columns.take}</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div
                className="ms-alternatives-sticky-scrollbar"
                ref={alternativesScrollbarRef}
                role="scrollbar"
                tabIndex={0}
                aria-controls="alternatives-table"
                aria-labelledby="alternatives-title"
                aria-orientation="horizontal"
                aria-valuemin={0}
                aria-valuemax={0}
                aria-valuenow={0}
              >
                <span ref={alternativesScrollbarThumbRef} />
              </div>
            </div>

            <div className="ms-alternatives-table-wrap" id="alternatives-table" ref={alternativesTableWrapRef}>
            <table className="ms-alternatives-table">
              <caption className="sr-only">{alternatives.title}. {alternatives.verified}</caption>
              <thead>
                <tr>
                  <th scope="col">{alternatives.columns.product}</th>
                  <th scope="col">{alternatives.columns.approach}</th>
                  <th scope="col">{alternatives.columns.c4}</th>
                  <th scope="col">{alternatives.columns.sharedModel}</th>
                  <th scope="col">{alternatives.columns.collaboration}</th>
                  <th scope="col">{alternatives.columns.offline}</th>
                  <th scope="col">{alternatives.columns.deployment}</th>
                  <th scope="col">{alternatives.columns.sourceCode}</th>
                  <th scope="col">{alternatives.columns.price}</th>
                  <th scope="col">{alternatives.columns.take}</th>
                </tr>
              </thead>
              <tbody>
                {visibleAlternatives.map((product) => (
                  <tr className={product.featured ? 'is-featured' : ''} key={product.id}>
                    <th scope="row" data-label={alternatives.columns.product}>
                      <span className="ms-alternative-name">
                        {product.name}
                        {product.featured && <em>{alternatives.ourProduct}</em>}
                      </span>
                      <span className="ms-alternative-sources">
                        {alternatives.sources}
                        {product.sources.map((source) => (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${alternatives.sources}: ${product.name} — ${source.label}`}
                            title={source.label}
                            key={source.url}
                          >
                            {source.label}
                          </a>
                        ))}
                      </span>
                    </th>
                    <td data-label={alternatives.columns.approach}>
                      <span className="ms-approach">{alternatives.tokens.approach[product.approach]}</span>
                    </td>
                    <td data-label={alternatives.columns.c4}><StatusPill value={product.c4}>{alternatives.tokens.c4[product.c4]}</StatusPill></td>
                    <td data-label={alternatives.columns.sharedModel}><StatusPill value={product.sharedModel}>{alternatives.tokens.sharedModel[product.sharedModel]}</StatusPill></td>
                    <td data-label={alternatives.columns.collaboration}><StatusPill value={product.collaboration}>{alternatives.tokens.collaboration[product.collaboration]}</StatusPill></td>
                    <td data-label={alternatives.columns.offline}><StatusPill value={product.offline}>{alternatives.tokens.offline[product.offline]}</StatusPill></td>
                    <td data-label={alternatives.columns.deployment}><StatusPill value={product.deployment}>{alternatives.tokens.deployment[product.deployment]}</StatusPill></td>
                    <td data-label={alternatives.columns.sourceCode}><StatusPill value={product.sourceCode}>{alternatives.tokens.sourceCode[product.sourceCode]}</StatusPill></td>
                    <td className="ms-alternative-price" data-label={alternatives.columns.price}>{alternatives.prices[product.id]}</td>
                    <td className="ms-alternative-take" data-label={alternatives.columns.take}>{alternatives.takes[product.id]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
          <p className="ms-alternatives-caveat">{alternatives.caveat}</p>
        </section>

        <section className="ms-contact" id="contact" aria-labelledby="contact-title">
          <div className="ms-contact-intro">
            <p className="eyebrow"><span />{content.contact.eyebrow}</p>
            <h2 id="contact-title">{content.contact.title}</h2>
            <p>{content.contact.body}</p>
            <a href="mailto:support@maplespire.ca">{content.contact.direct}<i aria-hidden="true">↗</i></a>
          </div>
          <ContactForm content={content} endpoint={contactEndpoint} />
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark">
            <img className="mark-light" src="/brand/maplespire-mark.svg" alt="" />
            <img className="mark-dark" src="/brand/maplespire-mark-dark.svg" alt="" />
          </span>
          <div><b>MapleSpire</b><p>{content.footer.promise}</p></div>
        </div>
        <nav aria-label={content.footer.navLabel}>
          <a href="https://github.com/MapleSpire" target="_blank" rel="noreferrer">{content.footer.github}</a>
          <a href={appUrl}>{content.footer.app}</a>
          <a href="mailto:support@maplespire.ca">{content.footer.contact}</a>
          <a href={`/${content.locale}/termsofservice/`}>{legal.terms}</a>
          <a href={`/${content.locale}/privacystatement/`}>{legal.privacy}</a>
        </nav>
        <small>{content.footer.copyright}</small>
      </footer>
    </div>
  );
}
