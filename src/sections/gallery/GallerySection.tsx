import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { galleryContent } from './content';
import { galleryMotion } from './motion';
import './styles.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

function ScrollHint({ parentTween }: { parentTween: gsap.core.Tween | null }) {
  const hintRef = useRef<HTMLDivElement>(null);
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (!parentTween) return;
    const el = hintRef.current;
    if (!el) return;

    const st = parentTween.scrollTrigger;
    if (!st) return;

    const origOnUpdate = st.vars.onUpdate;

    st.vars.onUpdate = function (self: ScrollTrigger) {
      origOnUpdate?.call(this, self);
      if (!dismissedRef.current && st.progress > 0.02) {
        dismissedRef.current = true;
        gsap.to(el, { opacity: 0, duration: 0.4, ease: 'power2.out' });
      }
    };

    return () => { st.vars.onUpdate = origOnUpdate; };
  }, [parentTween]);

  return (
    <div
      ref={hintRef}
      className="gallery-scroll-hint"
      aria-hidden="true"
    >
      <span className="gallery-scroll-hint-label">Scroll</span>
      <svg viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="gallery-scroll-hint-arrow">
        <line x1="0" y1="6" x2="20" y2="6" />
        <polyline points="15 1 20 6 15 11" />
      </svg>
    </div>
  );
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reduced;
}

export function GallerySection() {
  const reducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const slidesWrapperRef = useRef<HTMLDivElement>(null);
  const headerWrapperRef = useRef<HTMLDivElement>(null);
  const bufferLineRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const horizontalTweenRef = useRef<gsap.core.Tween | null>(null);
  const [tweenReady, setTweenReady] = useState(false);

  const transitionZoneRef = useRef<HTMLDivElement>(null);
  const transitionLineRef = useRef<HTMLDivElement>(null);

  const bridgeRef = useRef<HTMLDivElement>(null);
  const bridgeLineRef = useRef<HTMLDivElement>(null);

  // Transition zone — chapter-break line expands from center
  useEffect(() => {
    if (reducedMotion) return;
    const zone = transitionZoneRef.current;
    const line = transitionLineRef.current;
    if (!zone || !line) return;

    gsap.set(line, { scaleX: 0, transformOrigin: 'center center' });

    const tween = gsap.to(line, {
      scaleX: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: zone,
        start: 'top 75%',
        end: 'center 40%',
        scrub: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion]);

  // Horizontal scroll — pin + scrub
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const wrapper = slidesWrapperRef.current;
    if (!section || !wrapper) return;

    const scrollDistance = () => wrapper.scrollWidth - window.innerWidth;

    const tween = gsap.to(wrapper, {
      x: () => -scrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        start: 'top top',
        end: () => '+=' + scrollDistance(),
        invalidateOnRefresh: true,
      },
    });

    horizontalTweenRef.current = tween;
    setTweenReady(true);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      horizontalTweenRef.current = null;
    };
  }, [reducedMotion]);

  // Exit bridge — gradient from light to dark after pin releases
  useEffect(() => {
    if (reducedMotion) return;
    const bridge = bridgeRef.current;
    const line = bridgeLineRef.current;
    if (!bridge || !line) return;

    gsap.set(line, { scaleX: 0, transformOrigin: 'center center' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bridge,
        start: 'top 80%',
        end: 'bottom 30%',
        scrub: 1,
      },
    });

    tl.to(line, { scaleX: 1, ease: 'power3.inOut' });

    return () => { tl.kill(); };
  }, [reducedMotion]);

  // Intro reveal — stagger header elements before pin engages
  useEffect(() => {
    if (reducedMotion) return;
    const headerWrapper = headerWrapperRef.current;
    const bufferLine = bufferLineRef.current;
    const els = [headerRef.current, leadRef.current, ruleRef.current].filter(Boolean) as HTMLElement[];
    if (!headerWrapper || els.length === 0) return;

    if (bufferLine) {
      gsap.set(bufferLine, { scaleX: 0, transformOrigin: 'left center' });
    }
    gsap.set(els, { opacity: 0, y: galleryMotion.intro.y });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headerWrapper,
        start: 'top 85%',
        once: true,
      },
    });

    if (bufferLine) {
      tl.to(bufferLine, { scaleX: 1, duration: 0.9, ease: 'power3.out' });
    }
    tl.to(els, {
      opacity: 1,
      y: 0,
      duration: galleryMotion.intro.duration,
      ease: galleryMotion.ease.expoOut,
      stagger: galleryMotion.intro.stagger,
    }, bufferLine ? '-=0.55' : 0);

    return () => { tl.kill(); };
  }, [reducedMotion]);

  return (
    <>
      <div
        ref={transitionZoneRef}
        className="gallery-chapter-break"
        style={{ background: 'var(--day-surface)' }}
        aria-hidden="true"
      >
        <div
          ref={transitionLineRef}
          className="gallery-chapter-line"
        />
      </div>
      <section
        ref={sectionRef}
        id={galleryContent.id}
        className="gallery-section relative isolate text-[var(--day-body)]"
        style={{ background: 'var(--day-surface)' }}
      >
        <div ref={headerWrapperRef} className="gallery-header" style={{ paddingInline: 'var(--layout-padding)' }}>
          <div
            ref={bufferLineRef}
            className="h-px w-full bg-[var(--border-day)]"
            style={{
              marginBottom: 'clamp(2rem, 4vh, 3.5rem)',
              ...(reducedMotion ? {} : { transform: 'scaleX(0)' }),
            }}
            aria-hidden="true"
          />
          <header
            ref={headerRef}
            className="flex w-full items-center justify-between gap-4 text-[var(--text-meta)] font-light leading-none tracking-[0.24em] uppercase text-[var(--day-meta)]"
          >
            <p className="m-0">{galleryContent.headerLabel}</p>
          </header>

          <div
            ref={leadRef}
            className="flex w-full flex-wrap items-end justify-between gap-x-8 gap-y-4"
            style={{ marginTop: 'clamp(1.5rem, 3vh, 2.5rem)' }}
          >
            <h2
              className="m-0 font-display font-bold leading-[0.88] tracking-[-0.04em] text-[var(--day-heading)]"
              style={{ fontSize: 'var(--text-section)' }}
            >
              {galleryContent.headline[0]}<br />{galleryContent.headline[1]}
            </h2>
            <div className="flex items-center gap-[0.6rem] pb-2 text-[var(--text-label)] font-light tracking-[0.2em] uppercase text-[var(--day-faint)]">
              <span>{galleryContent.leadMeta.count}</span>
              <span className="opacity-40" aria-hidden="true">·</span>
              <span>{galleryContent.leadMeta.range}</span>
            </div>
          </div>

          <div
            ref={ruleRef}
            className="h-px w-full bg-[var(--border-day)]"
            style={{ marginTop: 'clamp(1.25rem, 2.5vh, 2rem)' }}
            aria-hidden="true"
          />
        </div>

        <div
          ref={slidesWrapperRef}
          className="gallery-slides-wrapper"
          style={{ flexDirection: reducedMotion ? 'column' : 'row' }}
        >
          {galleryContent.frames.map((frame, index) => (
            <GalleryFrame
              key={frame.number}
              frame={frame}
              index={index}
              reducedMotion={reducedMotion}
              parentTween={tweenReady ? horizontalTweenRef.current : null}
            />
          ))}
        </div>

        {!reducedMotion && (
          <ScrollHint parentTween={tweenReady ? horizontalTweenRef.current : null} />
        )}
      </section>

      {/* Light-to-dark bridge — smooth exit into signoff */}
      <div
        ref={bridgeRef}
        className="gallery-exit-bridge"
        aria-hidden="true"
      >
        <div ref={bridgeLineRef} className="gallery-exit-bridge-line" />
      </div>
    </>
  );
}

type GalleryFrameProps = {
  key?: string;
  frame: (typeof galleryContent.frames)[number];
  index: number;
  reducedMotion: boolean;
  parentTween: gsap.core.Tween | null;
};

function GalleryFrame({ frame, index, reducedMotion, parentTween }: GalleryFrameProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // SplitText character stagger on title
  useEffect(() => {
    if (reducedMotion || !parentTween) return;
    const titleEl = titleRef.current;
    if (!titleEl) return;

    const split = new SplitText(titleEl, { type: 'chars' });

    gsap.set(split.chars, { y: galleryMotion.splitText.y, opacity: 0 });

    const tween = gsap.to(split.chars, {
      y: 0,
      opacity: 1,
      duration: galleryMotion.splitText.duration,
      ease: galleryMotion.ease.quadOut,
      stagger: galleryMotion.splitText.stagger,
      scrollTrigger: {
        trigger: titleEl,
        containerAnimation: parentTween,
        start: 'left 80%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [reducedMotion, parentTween]);

  return (
    <article
      className="gallery-slide gallery-frame group"
      style={{ width: reducedMotion ? 'auto' : '100vw' }}
    >
      {/* Media */}
      <div
        className="gallery-frame-media relative isolate overflow-hidden bg-[var(--day-surface-warm)]"
      >
        <div className="pointer-events-none absolute inset-0 z-2 border border-[var(--night-deep)]/5" />
        <span
          className="absolute z-3 inline-flex items-center bg-[var(--night-overlay)] px-[0.5em] py-[0.2em] font-sans text-[var(--text-label)] font-normal tracking-[0.22em] uppercase text-[var(--frost-text)] whitespace-nowrap"
          style={{ top: 'clamp(0.7rem, 1.2vw, 1rem)', left: 'clamp(0.7rem, 1.2vw, 1rem)' }}
        >
          {frame.stamp}
        </span>
        {frame.image ? (
          <img
            src={frame.image}
            alt={frame.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="absolute inset-0 block h-full w-full object-cover grayscale-[0.55] contrast-[1.04] brightness-[0.97]"
            style={{
              transform: 'scale(1.035)',
              transformOrigin: 'center center',
              transition: 'transform 1000ms cubic-bezier(0.16, 1, 0.3, 1), filter 600ms cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--text-meta)] font-light tracking-[0.2em] uppercase text-[var(--day-faint)]">
            Open slot
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className="gallery-frame-content flex flex-col"
        style={{ gap: 'clamp(1rem, 2vh, 1.6rem)' }}
      >
        <p className="m-0 flex items-center gap-[0.6rem] font-sans text-[var(--text-meta)] font-light tracking-[0.26em] uppercase text-[var(--day-meta)]">
          <span>{frame.year}</span>
          <span className="h-px flex-1 bg-[var(--border-day)]" style={{ maxWidth: 'clamp(40px, 6vw, 96px)' }} aria-hidden="true" />
          <span>{frame.number}</span>
        </p>
        <h3
          ref={titleRef}
          className="m-0 font-display font-bold leading-[0.88] tracking-[-0.04em] text-[var(--day-ink)]"
          style={{ fontSize: 'clamp(2.25rem, calc(0.4rem + 4.8vw), 5rem)' }}
        >
          {frame.title[0]}<br />{frame.title[1]}
        </h3>
        <p
          className="m-0 max-w-[34ch] font-body leading-[1.5] tracking-[0.004em] text-[var(--day-secondary)]"
          style={{ fontSize: 'var(--text-body)' }}
        >
          {frame.subtitle}
        </p>
      </div>

      {/* Meta table */}
      <dl
        className="gallery-frame-meta grid border-t border-[var(--border-day)]"
        style={{
          marginTop: 'clamp(1rem, 2vh, 1.5rem)',
          gridTemplateColumns: 'minmax(90px, 1fr) minmax(0, 3fr)',
          columnGap: 'clamp(0.75rem, 1.5vw, 1.5rem)',
        }}
      >
        {frame.meta.map((item) => (
          <MetaRow key={item.label} item={item} />
        ))}
      </dl>
    </article>
  );
}

type MetaRowProps = {
  key?: string;
  item: { label: string; value: string; stamps?: string[]; tags?: string[] };
};

function MetaRow({ item }: MetaRowProps) {
  const cellStyle = {
    margin: 0,
    padding: 'clamp(0.85rem, 1.6vh, 1.1rem) 0',
    borderBottom: '1px solid var(--border-day)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 300,
    fontSize: 'var(--text-meta)',
    lineHeight: 1.45,
  };

  return (
    <>
      <dt style={{ ...cellStyle, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'var(--day-faint)' }}>
        {item.label}
      </dt>
      <dd style={{ ...cellStyle, color: 'var(--day-secondary)', letterSpacing: '0.04em', display: 'flex', flexWrap: 'wrap' as const, gap: '0.3rem 1rem' }}>
        {item.tags?.map((tag) => (
          <span key={tag} className="text-[var(--text-label)] font-light tracking-[0.16em] uppercase text-[var(--day-signal-text)] whitespace-nowrap">
            [ {tag} ]
          </span>
        ))}
        {item.stamps?.map((stamp) => (
          <span
            key={stamp}
            className="inline-flex items-center border border-[var(--day-stamp-border)] bg-[var(--day-stamp-bg)] px-2 py-[0.18rem] text-[var(--text-label)] font-normal tracking-[0.20em] uppercase text-[var(--day-secondary)] whitespace-nowrap"
          >
            {stamp}
          </span>
        ))}
        {!item.tags && !item.stamps && item.value}
      </dd>
    </>
  );
}
