import { useCallback, useEffect, useRef, useState } from 'react';
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
  'oklch(0.885 0.005 255)',
  'oklch(0.825 0.006 255)',
];

const EXPO_OUT = 'power4.out';
const QUART_OUT = 'power3.out';

export function WorkExperienceSection({ revealReady = false, transitionProgress = 0 }: WorkExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const liveDate = useLiveDate();

  useEffect(() => {
    if (prefersReducedMotion || !revealReady) return;
    const els = [headerRef.current, leadRef.current, ruleRef.current].filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const headerAndLead = [headerRef.current, leadRef.current].filter(Boolean) as HTMLElement[];
    const rule = ruleRef.current;

    gsap.set(headerAndLead, { opacity: 0, y: 32 });
    if (rule) gsap.set(rule, { opacity: 0, scaleX: 0, transformOrigin: 'left center' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    tl.to(headerAndLead, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: EXPO_OUT,
      stagger: 0.08,
    });

    if (rule) {
      tl.to(rule, {
        opacity: 1,
        scaleX: 1,
        duration: 0.8,
        ease: EXPO_OUT,
      }, '-=0.7');
    }

    return () => { tl.kill(); };
  }, [revealReady, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id={workExperienceContent.id}
      className="work-section relative isolate z-[var(--z-work)] overflow-hidden text-[var(--day-body)]"
      style={{
        background: 'var(--day-surface)',
        paddingInline: 'var(--layout-padding)',
        paddingTop: 'clamp(7rem, 12vh, 10rem)',
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
        ref={headerRef}
        className="work-header relative z-10 flex w-full items-center justify-between gap-4 text-[var(--text-meta)] font-light leading-none tracking-[0.24em] uppercase text-[var(--day-meta)]"
      >
        <p className="m-0">{workExperienceContent.headerLabel}</p>
        <p className="m-0">{liveDate}</p>
      </header>

      <div
        ref={leadRef}
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
        ref={ruleRef}
        className="relative z-10 h-px w-full bg-[var(--border-day)]"
        style={{ marginTop: 'clamp(1.5rem, 3vh, 2.5rem)' }}
        aria-hidden="true"
      />

      <div
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
  const expandRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const staggerRefs = useRef<(HTMLElement | null)[]>([]);
  const expandIconRef = useRef<HTMLSpanElement>(null);
  const expandTlRef = useRef<gsap.core.Timeline | null>(null);

  const [isOpen, setIsOpen] = useState(reducedMotion && index === 0);
  const [briefOpen, setBriefOpen] = useState(false);

  const setStaggerRef = useCallback((i: number) => (el: HTMLElement | null) => {
    staggerRefs.current[i] = el;
  }, []);

  // ScrollTrigger card reveal
  useEffect(() => {
    if (reducedMotion || !revealReady) return;
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, { opacity: 0, y: 48 });

    const st = ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: index * 0.12,
          ease: EXPO_OUT,
          onComplete: () => {
            if (index === 0) setIsOpen(true);
          },
        });
      },
    });

    return () => { st.kill(); };
  }, [revealReady, reducedMotion, index]);

  // GSAP stagger + icon animation (expand/collapse height is CSS grid-row)
  useEffect(() => {
    const icon = expandIconRef.current;
    if (reducedMotion) return;

    const staggers = staggerRefs.current.filter(Boolean) as HTMLElement[];

    if (expandTlRef.current) {
      expandTlRef.current.kill();
    }

    if (isOpen) {
      const tl = gsap.timeline();

      if (icon) {
        tl.to(icon, { rotation: 45, duration: 0.4, ease: QUART_OUT }, 0);
      }

      if (staggers.length > 0) {
        tl.fromTo(staggers, {
          opacity: 0,
          y: 16,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: EXPO_OUT,
          stagger: 0.09,
        }, 0.15);
      }

      expandTlRef.current = tl;
    } else {
      const tl = gsap.timeline();

      if (staggers.length > 0) {
        tl.to(staggers, {
          opacity: 0,
          y: 8,
          duration: 0.2,
          ease: QUART_OUT,
          stagger: 0.03,
        }, 0);
      }

      if (icon) {
        tl.to(icon, { rotation: 0, duration: 0.3, ease: QUART_OUT }, 0);
      }

      expandTlRef.current = tl;
    }

    return () => {
      expandTlRef.current?.kill();
    };
  }, [isOpen, reducedMotion]);

  // Cleanup ScrollTrigger on unmount
  useEffect(() => {
    return () => {
      expandTlRef.current?.kill();
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="work-chapter"
      style={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        background: bgColor,
        color: index === 2 ? 'oklch(0.10 0.01 255)' : 'oklch(0.13 0.01 255)',
        paddingInline: 'var(--layout-padding)',
        paddingTop: 'clamp(3.5rem, 8vh, 6.5rem)',
        paddingBottom: 'clamp(2.5rem, 5vh, 4rem)',
        opacity: reducedMotion ? 1 : undefined,
      }}
    >
      {index > 0 && (
        <div
          className="pointer-events-none absolute inset-x-[var(--layout-padding)] top-0 h-px"
          style={{ background: 'oklch(0.78 0.01 255 / 0.5)' }}
        />
      )}

      <div
        className="pointer-events-none absolute select-none font-display font-bold leading-[0.85] tracking-[-0.055em] text-[var(--day-heading)]"
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

      {/* HEADER: clickable to toggle */}
      <div
        className="work-chapter-header relative z-2 flex items-start justify-between gap-6"
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
      >
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
            <div className="flex items-center gap-[0.4rem] text-[var(--text-label)] font-light tracking-[0.22em] uppercase text-[var(--day-signal-text)]">
              <span>{chapter.periodFrom}</span>
              <span className="opacity-45" aria-hidden="true">—</span>
              <span className="text-[var(--day-muted)]">{chapter.periodTo}</span>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-start gap-4">
          <span
            className="work-chap-num m-0 select-none font-display font-bold leading-[0.88] tracking-[-0.04em] text-[oklch(0.58_0.01_255/0.72)]"
            style={{ fontSize: 'var(--text-headline)' }}
            aria-hidden="true"
          >
            {chapter.num}
          </span>
          <span
            ref={expandIconRef}
            className="work-expand-icon mt-[0.15em] text-[clamp(1.2rem,2.5vw,2rem)] font-extralight leading-none text-[oklch(0.45_0.01_255)]"
            aria-hidden="true"
          >
            +
          </span>
        </div>
      </div>

      {/* EXPANDABLE BODY */}
      <div
        ref={expandRef}
        className="work-chapter-expand relative z-2 grid overflow-hidden"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
          transition: reducedMotion ? 'none' : 'grid-template-rows 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <div ref={innerRef} className="work-expand-inner min-h-0">
          {/* Divider */}
          <div
            ref={setStaggerRef(0)}
            className="h-px bg-[oklch(0.55_0.01_255/0.35)]"
            style={{
              marginTop: 'clamp(2.5rem, 5vh, 4rem)',
              marginBottom: 'clamp(1.75rem, 3.5vh, 2.75rem)',
            }}
            aria-hidden="true"
          />

          {/* BODY: label | operative | keypoints */}
          <div className="work-card-body flex flex-wrap items-start">
            <span
              ref={setStaggerRef(1)}
              className="work-card-label shrink-0 text-[var(--text-label)] font-light tracking-[0.26em] uppercase text-[var(--day-signal-text)] leading-none"
            >
              Mandate
            </span>

            <div ref={setStaggerRef(2)} className="work-card-text flex flex-col gap-[0.9rem]">
              {chapter.operative.map((text, i) => (
                <p
                  key={i}
                  className="work-operative m-0 font-body leading-[1.5] tracking-[0.004em] text-[var(--day-body)]"
                  style={{ fontSize: 'var(--text-body)', textWrap: 'pretty' }}
                >
                  {text}
                </p>
              ))}
            </div>

            <div ref={setStaggerRef(3)} className="work-card-keys flex flex-col gap-5">
              <ul className="work-keys m-0 flex list-none flex-col gap-[0.7rem] p-0">
                {chapter.keyPoints.map((point, i) => (
                  <li
                    key={i}
                    className="relative pl-5 font-sans font-normal leading-[1.5] tracking-[0.004em] text-[var(--day-secondary)]"
                    style={{ fontSize: 'var(--text-small)' }}
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
                    className="text-[var(--text-label)] font-light tracking-[0.16em] uppercase text-[var(--day-signal-text)] whitespace-nowrap"
                  >
                    [ {signal} ]
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER: full brief */}
          <div
            ref={setStaggerRef(4)}
            className="work-card-brief border-t border-[oklch(0.55_0.01_255/0.25)]"
            style={{
              marginTop: 'clamp(2rem, 4vh, 3rem)',
              paddingTop: 'clamp(1.25rem, 2.5vh, 2rem)',
            }}
          >
            <div className={`work-brief ${briefOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                className="work-brief-toggle inline-flex items-center gap-[0.6rem] border-0 bg-none p-[0.45rem_0] text-[var(--text-label)] font-normal tracking-[0.22em] uppercase text-[var(--day-muted)] transition-colors duration-200 ease-linear select-none hover:text-[var(--day-heading)]"
                onClick={(e) => {
                  e.stopPropagation();
                  setBriefOpen((prev) => !prev);
                }}
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
                    <ul className="m-0 flex list-disc flex-col gap-[0.45rem] pl-[1.1rem] text-[0.86rem] font-light leading-[1.58] tracking-[0.004em] text-[var(--day-secondary)]">
                      {chapter.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-x-[1.1rem] gap-y-[0.4rem] text-[var(--text-label)] font-normal uppercase tracking-[0.18em] text-[var(--day-muted)]">
                      {chapter.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-[oklch(0.55_0.01_255/0.5)] underline-offset-[3px] transition-colors duration-200 ease-linear hover:text-[var(--day-heading)]"
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
