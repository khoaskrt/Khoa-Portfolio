import { useEffect, useRef, useState } from 'react';
import { workExperienceContent } from './content';

type WorkExperienceSectionProps = {
  revealReady?: boolean;
  transitionProgress?: number;
};

const chapterBgs = [
  'oklch(0.945 0.005 255)',
  'oklch(0.885 0.005 255)',
  'oklch(0.825 0.006 255)',
];

export function WorkExperienceSection({ revealReady = false }: WorkExperienceSectionProps) {
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const liveDate = useLiveDate();

  return (
    <section
      id={workExperienceContent.id}
      className="work-section relative isolate z-[var(--z-work)] overflow-hidden text-[oklch(0.19_0.01_255)]"
      style={{
        background: 'var(--day-surface)',
        paddingInline: 'var(--layout-padding)',
        paddingTop: 'clamp(7rem, 12vh, 10rem)',
        display: 'grid',
        gridTemplateColumns: 'var(--layout-cols)',
        columnGap: 'var(--layout-gap)',
        alignContent: 'start',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: 'clamp(8rem, 14vh, 12rem)',
          background: 'linear-gradient(180deg, oklch(0.93 0.005 255 / 0.94), oklch(0.93 0.005 255 / 0.6) 50%, oklch(0.93 0.005 255 / 0))',
        }}
      />

      <header
        className="work-header relative z-10 flex w-full items-center justify-between gap-4 text-[var(--text-meta)] font-light leading-none tracking-[0.24em] uppercase text-[oklch(0.48_0.01_255)]"
        style={{ gridColumn: 'var(--content-span)' }}
      >
        <p className="m-0">{workExperienceContent.headerLabel}</p>
        <p className="m-0">{liveDate}</p>
      </header>

      <div
        className="work-lead relative z-10 flex w-full flex-wrap items-end justify-between gap-x-8 gap-y-4"
        style={{ gridColumn: 'var(--content-span)', marginTop: 'clamp(2rem, 4.5vh, 3.5rem)' }}
      >
        <h2
          className="m-0 font-display font-bold leading-[0.88] tracking-[-0.04em] text-[oklch(0.11_0.01_255)]"
          style={{ fontSize: 'var(--text-display)' }}
        >
          {workExperienceContent.headline[0]}<br />
          {workExperienceContent.headline[1]}<br />
          {workExperienceContent.headline[2]}
        </h2>
        <div className="flex items-center gap-[0.6rem] pb-2 text-[10px] font-light tracking-[0.2em] uppercase text-[oklch(0.5_0.01_255)]">
          <span>{workExperienceContent.chapters.length} roles</span>
          <span className="opacity-40" aria-hidden="true">·</span>
          <span>2024 — 2026</span>
        </div>
      </div>

      <div
        className="relative z-10 h-px w-full bg-[oklch(0.82_0.01_255)]"
        style={{ gridColumn: 'var(--content-span)', marginTop: 'clamp(1.5rem, 3vh, 2.5rem)' }}
        aria-hidden="true"
      />

      <div
        className="work-chapters relative z-10 flex w-auto flex-col"
        style={{
          gridColumn: '1 / -1',
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
            revealReady={revealReady}
            reducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  );
}

type ChapterCardProps = {
  key?: string;
  chapter: (typeof workExperienceContent.chapters)[number];
  index: number;
  bgColor: string;
  revealReady: boolean;
  reducedMotion: boolean;
};

function ChapterCard({ chapter, index, bgColor, revealReady, reducedMotion }: ChapterCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(reducedMotion);
  const [briefOpen, setBriefOpen] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setIsRevealed(true);
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    if (!revealReady) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [revealReady, reducedMotion]);

  return (
    <article
      ref={cardRef}
      className={`work-chapter ${isRevealed ? 'is-revealed' : ''}`}
      style={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        background: bgColor,
        color: index === 2 ? 'oklch(0.10 0.01 255)' : 'oklch(0.13 0.01 255)',
        paddingInline: 'var(--layout-padding)',
        paddingTop: 'clamp(3.5rem, 8vh, 6.5rem)',
        paddingBottom: 'clamp(2.5rem, 5vh, 4rem)',
        display: 'grid',
        gridTemplateColumns: 'var(--layout-cols)',
        columnGap: 'var(--layout-gap)',
        alignItems: 'start',
        opacity: reducedMotion ? 1 : isRevealed ? 1 : 0,
        transform: reducedMotion ? 'none' : isRevealed ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.14}s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.14}s`,
      }}
    >
      {index > 0 && (
        <div
          className="pointer-events-none absolute inset-x-[var(--layout-padding)] top-0 h-px"
          style={{ background: 'oklch(0.78 0.01 255 / 0.5)' }}
        />
      )}

      <div
        className="pointer-events-none absolute select-none font-display font-bold leading-[0.85] tracking-[-0.055em] text-[oklch(0.10_0.01_255)]"
        style={{
          right: 'clamp(0.5rem, 2vw, 2rem)',
          bottom: '-1.5rem',
          fontSize: 'clamp(7rem, 22vw, 18rem)',
          opacity: 0.028,
          zIndex: 0,
          whiteSpace: 'nowrap',
        }}
        aria-hidden="true"
      >
        {chapter.era}
      </div>

      {/* TOP: title + chapter number */}
      <div
        style={{ gridColumn: '1 / -1', position: 'relative', zIndex: 2 }}
        className="grid items-start"
      >
        <div className="grid items-start" style={{ gridTemplateColumns: 'var(--layout-cols)', columnGap: 'var(--layout-gap)' }}>
          <div className="work-title-block flex flex-col" style={{ gridColumn: '1 / span 9', gap: 'clamp(1.25rem, 2.5vh, 2rem)' }}>
            <h3
              className="work-title m-0 font-display font-bold leading-[0.88] tracking-[-0.04em] text-[oklch(0.08_0.01_255)]"
              style={{ fontSize: 'clamp(2.75rem, 8vw, 8rem)', textWrap: 'balance', overflowWrap: 'anywhere' }}
            >
              {chapter.title[0]}<br />{chapter.title[1]}
            </h3>
            <div className="flex flex-wrap items-center gap-x-[1.2rem] gap-y-3">
              <span className="work-stamp inline-flex items-center border border-[oklch(0.74_0.01_255)] bg-transparent px-[0.7rem] py-[0.32rem] text-[9px] font-normal tracking-[0.2em] uppercase text-[oklch(0.40_0.01_255)] whitespace-nowrap">
                {chapter.company}
              </span>
              <div className="flex items-center gap-[0.4rem] text-[10px] font-light tracking-[0.22em] uppercase text-[oklch(0.42_0.01_255)]">
                <span>{chapter.periodFrom}</span>
                <span className="opacity-45" aria-hidden="true">—</span>
                <span className="text-[oklch(0.30_0.01_255)]">{chapter.periodTo}</span>
              </div>
            </div>
          </div>
          <span
            className="work-chap-num m-0 select-none justify-self-end self-start font-display font-bold leading-[0.88] tracking-[-0.04em] text-[oklch(0.58_0.01_255/0.72)]"
            style={{ gridColumn: '10 / -1', fontSize: 'clamp(3rem, 8vw, 8rem)' }}
            aria-hidden="true"
          >
            {chapter.num}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        className="relative z-2 h-px bg-[oklch(0.55_0.01_255/0.35)]"
        style={{
          gridColumn: '1 / -1',
          marginTop: 'clamp(2.5rem, 5vh, 4rem)',
          marginBottom: 'clamp(1.75rem, 3.5vh, 2.75rem)',
        }}
        aria-hidden="true"
      />

      {/* BODY: label | operative | keypoints */}
      <div
        className="relative z-2 grid items-start"
        style={{
          gridColumn: '1 / -1',
          gridTemplateColumns: 'var(--layout-cols)',
          columnGap: 'var(--layout-gap)',
          rowGap: 'clamp(1.5rem, 3vh, 2.25rem)',
        }}
      >
        <span
          className="work-card-label self-start text-[10px] font-light tracking-[0.26em] uppercase text-[oklch(0.42_0.01_255)] leading-none pt-[0.35rem]"
          style={{ gridColumn: '1 / span 2' }}
        >
          Mandate
        </span>

        <div className="work-card-text flex flex-col gap-[0.9rem]" style={{ gridColumn: '3 / span 3' }}>
          {chapter.operative.map((text, i) => (
            <p
              key={i}
              className="work-operative m-0 font-serif leading-[1.5] tracking-[0.004em] text-[oklch(0.18_0.01_255)]"
              style={{ fontSize: 'clamp(15px, 1.15vw, 17px)', textWrap: 'pretty' }}
            >
              {text}
            </p>
          ))}
        </div>

        <div className="work-card-keys flex flex-col gap-5" style={{ gridColumn: '6 / span 3' }}>
          <ul className="work-keys m-0 flex list-none flex-col gap-[0.7rem] p-0">
            {chapter.keyPoints.map((point, i) => (
              <li
                key={i}
                className="relative pl-5 font-sans font-light leading-[1.5] tracking-[0.004em] text-[oklch(0.22_0.01_255)]"
                style={{ fontSize: 'clamp(13px, 0.95vw, 14.5px)' }}
              >
                <span className="absolute left-0 top-0 font-light text-[oklch(0.45_0.01_255)]">—</span>
                {point}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-x-[0.9rem] gap-y-[0.3rem]">
            {chapter.signals.map((signal) => (
              <span
                key={signal}
                className="text-[9px] font-light tracking-[0.16em] uppercase text-[oklch(0.42_0.01_255)] whitespace-nowrap"
              >
                [ {signal} ]
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER: full brief */}
      <div
        className="relative z-2 border-t border-[oklch(0.55_0.01_255/0.25)]"
        style={{
          gridColumn: '3 / span 6',
          marginTop: 'clamp(2rem, 4vh, 3rem)',
          paddingTop: 'clamp(1.25rem, 2.5vh, 2rem)',
        }}
      >
        <div className={`work-brief ${briefOpen ? 'is-open' : ''}`}>
          <button
            type="button"
            className="work-brief-toggle inline-flex items-center gap-[0.6rem] border-0 bg-none p-[0.45rem_0] text-[10px] font-normal tracking-[0.22em] uppercase text-[oklch(0.32_0.01_255)] transition-colors duration-200 ease-linear select-none hover:text-[oklch(0.10_0.01_255)]"
            onClick={() => setBriefOpen((prev) => !prev)}
          >
            Open full brief{' '}
            <span
              className="inline-block text-[16px] font-extralight leading-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: briefOpen ? 'rotate(45deg)' : 'none' }}
              aria-hidden="true"
            >
              +
            </span>
          </button>
          <div
            className="grid overflow-hidden"
            style={{
              gridTemplateRows: briefOpen ? '1fr' : '0fr',
              opacity: briefOpen ? 1 : 0,
              transition: 'grid-template-rows 0.36s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease 0.04s',
            }}
          >
            <div className="min-h-0">
              <div
                className="mt-3 flex flex-col gap-3 border-l border-[oklch(0.55_0.01_255/0.3)]"
                style={{ padding: '0.85rem 0 0.5rem clamp(0.75rem, 2vw, 1.5rem)' }}
              >
                <ul className="m-0 flex list-disc flex-col gap-[0.45rem] pl-[1.1rem] text-[0.86rem] font-light leading-[1.58] tracking-[0.004em] text-[oklch(0.22_0.01_255)]">
                  {chapter.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-x-[1.1rem] gap-y-[0.4rem] text-[9px] font-normal uppercase tracking-[0.18em] text-[oklch(0.34_0.01_255)]">
                  {chapter.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-[oklch(0.55_0.01_255/0.5)] underline-offset-[3px] transition-colors duration-200 ease-linear hover:text-[oklch(0.08_0.01_255)]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
