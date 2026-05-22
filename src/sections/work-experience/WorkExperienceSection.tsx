import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { workExperienceContent } from './content';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

type WorkExperienceSectionProps = {
  revealReady?: boolean;
  transitionProgress?: number;
};

const chapterBgs = [
  'oklch(0.945 0.005 255)',
  '#818181',
  '#3F3F3F',
];

export function WorkExperienceSection({ transitionProgress = 0 }: WorkExperienceSectionProps) {
  const liveDate = useLiveDate();
  const chaptersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chaptersRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 640;
    const panels = gsap.utils.toArray<HTMLElement>('.work-chapter', container);

    const triggers: ScrollTrigger[] = [];

    panels.forEach((panel) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'bottom bottom',
          pinSpacing: false,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onRefresh: () =>
            gsap.set(panel, {
              transformOrigin:
                'center ' + (panel.offsetHeight - window.innerHeight / 2) + 'px',
            }),
        },
      });

      tl.fromTo(
        panel,
        { scale: 1, opacity: 1 },
        { scale: isMobile ? 0.85 : 0.5, opacity: isMobile ? 0.3 : 0.5, duration: 1 },
      ).to(panel, { opacity: 0, duration: 0.1 });

      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id={workExperienceContent.id}
      className="work-section relative isolate z-[var(--z-work)] overflow-hidden text-[var(--day-body)]"
      style={{
        background: 'var(--day-surface)',
        paddingInline: 'var(--layout-padding)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: 'clamp(8rem, 14vh, 12rem)',
          background: 'linear-gradient(180deg, oklch(0.93 0.005 255 / 0.94), oklch(0.93 0.005 255 / 0.6) 50%, oklch(0.93 0.005 255 / 0))',
          opacity: transitionProgress >= 1 ? 0 : 1 - Math.min(Math.max((transitionProgress - 0.6) / 0.4, 0), 1),
        }}
      />

      <header
        className="work-header relative z-10 flex w-full items-center justify-between gap-4 text-[var(--text-meta)] font-light leading-none tracking-[0.24em] uppercase text-[var(--day-meta)]"
        style={{ paddingTop: 'clamp(7rem, 12vh, 10rem)' }}
      >
        <p className="m-0">{workExperienceContent.headerLabel}</p>
        <p className="m-0">{liveDate}</p>
      </header>

      <div
        className="work-lead relative z-10 flex w-full flex-wrap items-end justify-between gap-x-8 gap-y-4"
        style={{ marginTop: 'clamp(2rem, 4.5vh, 3.5rem)' }}
      >
        <h2
          className="m-0 font-display font-bold leading-[0.88] tracking-[-0.04em] text-[var(--day-heading)]"
          style={{ fontSize: 'var(--text-display)' }}
        >
          {workExperienceContent.headline[0]}<br />
          {workExperienceContent.headline[1]}<br />
          {workExperienceContent.headline[2]}
        </h2>
        <div className="flex items-center gap-[0.6rem] pb-2 text-[var(--text-label)] font-light tracking-[0.2em] uppercase text-[var(--day-faint)]">
          <span>{workExperienceContent.chapters.length} roles</span>
          <span className="opacity-40" aria-hidden="true">·</span>
          <span>2024 — 2026</span>
        </div>
      </div>

      <div
        className="relative z-10 h-px w-full bg-[var(--border-day)]"
        style={{ marginTop: 'clamp(1.5rem, 3vh, 2.5rem)' }}
        aria-hidden="true"
      />

      <div
        ref={chaptersRef}
        className="work-chapters relative z-10 flex flex-col"
        style={{
          marginInline: 'calc(-1 * var(--layout-padding))',
          marginTop: 'clamp(3.5rem, 6vh, 5.5rem)',
        }}
      >
        {workExperienceContent.chapters.map((chapter, index) => (
          <ChapterCard
            key={chapter.num}
            chapter={chapter}
            index={index}
            bgColor={chapterBgs[index] ?? chapterBgs[0]}
          />
        ))}
      </div>
    </section>
  );
}

type ChapterCardProps = React.ComponentProps<'article'> & {
  chapter: (typeof workExperienceContent.chapters)[number];
  index: number;
  bgColor: string;
};

function ChapterCard({ chapter, index, bgColor }: ChapterCardProps) {
  const [lead, support] = chapter.operative;
  const isDark = index >= 1;

  return (
    <article
      className="work-chapter"
      {...(isDark && { 'data-cursor-dark': '' })}
      style={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        background: bgColor,
        color: isDark ? '#FFFFFF' : 'oklch(0.13 0.01 255)',
        paddingInline: 'var(--layout-padding)',
        width: '100%',
        maxWidth: '100dvw',
        boxSizing: 'border-box',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'clamp(3.5rem, 8vh, 6.5rem)',
        paddingBottom: 'clamp(2.5rem, 5vh, 4rem)',
        ...(isDark && {
          '--day-heading': '#FFFFFF',
          '--day-body': '#FFFFFF',
          '--day-secondary': index === 2 ? '#FFFFFF' : 'rgba(255,255,255,0.92)',
          '--day-muted': index === 2 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.65)',
          '--day-faint': 'rgba(255,255,255,0.5)',
          '--day-signal-text': 'rgba(255,255,255,0.6)',
          '--day-stamp-border': 'rgba(255,255,255,0.3)',
        } as React.CSSProperties),
      }}
    >
      {index > 0 && (
        <div
          className="pointer-events-none absolute inset-x-[var(--layout-padding)] top-0 h-px"
          style={{ background: isDark ? 'rgba(255,255,255,0.2)' : 'oklch(0.78 0.01 255 / 0.5)' }}
        />
      )}

      <div
        className="pointer-events-none absolute select-none font-display font-bold leading-[0.85] tracking-[-0.055em] text-[var(--day-heading)]"
        style={{
          right: 'clamp(0.5rem, 2vw, 2rem)',
          bottom: '-1.5rem',
          fontSize: 'clamp(7rem, 22vw, 18rem)',
          opacity: isDark ? 0.06 : 0.028,
          zIndex: 0,
          whiteSpace: 'nowrap',
        }}
        aria-hidden="true"
      >
        {chapter.era}
      </div>

      <div className="relative z-2 flex items-start justify-between gap-6">
        <div className="work-title-block flex flex-col" style={{ gap: 'clamp(1.25rem, 2.5vh, 2rem)', flex: '1 1 0%' }}>
          <h3
            className="work-title m-0 font-display font-medium leading-[0.88] tracking-[-0.04em] text-[var(--day-heading)]"
            style={{ fontSize: 'var(--text-headline)', textWrap: 'balance', overflowWrap: 'anywhere' }}
          >
            {chapter.title[0]}<br />{chapter.title[1]}
          </h3>
          <div className="flex flex-wrap items-center gap-x-[1.2rem] gap-y-3">
            <span className="work-stamp inline-flex items-center border border-[var(--day-stamp-border)] bg-transparent px-[0.7rem] py-[0.32rem] text-[var(--text-label)] font-normal tracking-[0.2em] uppercase text-[var(--day-muted)] whitespace-nowrap">
              {chapter.company}
            </span>
            <div className="flex items-center gap-[0.4rem] text-[var(--text-label)] font-light tracking-[0.2em] uppercase text-[var(--day-signal-text)]">
              <span>{chapter.periodFrom}</span>
              <span className="opacity-45" aria-hidden="true">—</span>
              <span className="text-[var(--day-muted)]">{chapter.periodTo}</span>
            </div>
          </div>
        </div>
        <span
          className={`work-chap-num m-0 shrink-0 select-none font-display font-bold leading-[0.88] tracking-[-0.04em] ${isDark ? 'text-[rgba(255,255,255,0.4)]' : 'text-[oklch(0.58_0.01_255/0.72)]'}`}
          style={{ fontSize: 'var(--text-headline)' }}
          aria-hidden="true"
        >
          {chapter.num}
        </span>
      </div>

      <div
        className={`h-px ${isDark ? 'bg-[rgba(255,255,255,0.2)]' : 'bg-[oklch(0.55_0.01_255/0.35)]'}`}
        style={{
          marginTop: 'clamp(2.5rem, 5vh, 4rem)',
          marginBottom: 'clamp(1.75rem, 3.5vh, 2.75rem)',
        }}
        aria-hidden="true"
      />

      <div className="work-card-body relative z-2">
        <div className="work-card-narrative">
          <span className="work-card-label text-[var(--text-label)] font-light tracking-[0.2em] uppercase text-[var(--day-signal-text)] leading-none">
            Mandate
          </span>

          <div className="work-card-text flex flex-col">
            <p
              className="work-operative m-0 font-body leading-[1.34] tracking-[-0.015em] text-[var(--day-heading)]"
              style={{ fontSize: 'var(--text-quote)', textWrap: 'balance' }}
            >
              {lead}
            </p>
            {support && (
              <p
                className="work-operative-support m-0 font-body leading-[1.52] tracking-[0.004em] text-[var(--day-body)]"
                style={{ fontSize: 'var(--text-body)', textWrap: 'pretty' }}
              >
                {support}
              </p>
            )}
          </div>

          {chapter.shift && (
            <div className="work-card-shift flex flex-col">
              <span className="text-[var(--text-label)] font-light tracking-[0.2em] uppercase text-[var(--day-signal-text)] leading-none">
                The shift
              </span>
              <p
                className="m-0 font-body leading-[1.52] tracking-[0.004em] text-[var(--day-secondary)]"
                style={{ fontSize: 'var(--text-body)', textWrap: 'pretty' }}
              >
                {chapter.shift}
              </p>
            </div>
          )}

          {chapter.signals.length > 0 && (
            <div className="work-card-signals flex flex-wrap gap-[0.5rem]">
              {chapter.signals.map((signal) => (
                <span
                  key={signal}
                  className="work-signal-tag inline-flex items-center border px-[0.6rem] py-[0.2rem] text-[var(--text-label)] font-light tracking-[0.16em] uppercase"
                  style={{
                    borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'oklch(0.55 0.01 255 / 0.3)',
                    color: isDark ? 'rgba(255,255,255,0.55)' : 'oklch(0.45 0.01 255 / 0.8)',
                  }}
                >
                  {signal}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="work-card-visual">
          {'image' in chapter && chapter.image ? (
            <div className="work-visual-photo">
              <img
                src={chapter.image.src}
                alt={chapter.image.alt}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="work-visual-frame">
              <div className="work-visual-noise" aria-hidden="true" />
              <div className="work-visual-topline">
                <span>{chapter.visual.eyebrow}</span>
                <span>{chapter.era}</span>
              </div>

              {'showStage' in chapter.visual && chapter.visual.showStage === false ? null : (
                <div className="work-visual-stage" aria-hidden="true">
                  <div className="work-visual-orbit work-visual-orbit-a" />
                  <div className="work-visual-orbit work-visual-orbit-b" />
                  <div className="work-visual-line work-visual-line-a" />
                  <div className="work-visual-line work-visual-line-b" />

                  {chapter.visual.nodes.map((node, nodeIndex) => (
                    <div
                      key={node}
                      className={`work-visual-node work-visual-node-${nodeIndex + 1}`}
                    >
                      <span className="work-visual-node-dot" />
                      <span>{node}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="work-visual-metrics">
                {chapter.visual.metrics.map((metric) => (
                  <span key={metric}>{metric}</span>
                ))}
              </div>

              <p className="work-visual-caption m-0">{chapter.visual.caption}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function useLiveDate(): string {
  const [date, setDate] = useState('');
  useEffect(() => {
    try {
      const language = document.documentElement.lang || undefined;
      const fmt = new Intl.DateTimeFormat(language, { month: 'short', year: 'numeric' });
      const parts = fmt.formatToParts(new Date());
      const month = parts.find((p) => p.type === 'month')?.value ?? '';
      const year = parts.find((p) => p.type === 'year')?.value ?? '';
      setDate(month && year ? `${month}/${year}` : fmt.format(new Date()));
    } catch {
      setDate('');
    }
  }, []);
  return date;
}
