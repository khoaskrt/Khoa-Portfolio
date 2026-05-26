import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { momentRecapContent } from './content';
import { momentRecapMotion } from './motion';
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
      className="moment-recap-scroll-hint"
      aria-hidden="true"
    >
      <span className="moment-recap-scroll-hint-label">Scroll</span>
      <svg viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" className="moment-recap-scroll-hint-arrow">
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

function HeaderProgress({ parentTween }: { parentTween: gsap.core.Tween | null }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parentTween) return;
    const bar = barRef.current;
    if (!bar) return;

    const st = parentTween.scrollTrigger;
    if (!st) return;

    const origOnUpdate = st.vars.onUpdate;

    st.vars.onUpdate = function (self: ScrollTrigger) {
      origOnUpdate?.call(this, self);
      bar.style.transform = `scaleX(${st.progress})`;
    };

    return () => { st.vars.onUpdate = origOnUpdate; };
  }, [parentTween]);

  return (
    <div className="moment-recap-header-progress" aria-hidden="true">
      <div
        ref={barRef}
        className="moment-recap-header-progress-bar"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}

export function MomentRecapSection() {
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

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const wrapper = slidesWrapperRef.current;
    if (!section || !wrapper) return;

    const scrollDistance = () => wrapper.scrollWidth - window.innerWidth;
    const scrollMultiplier = 1.2;

    const tween = gsap.to(wrapper, {
      x: () => -scrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        start: 'top top',
        end: () => '+=' + scrollDistance() * scrollMultiplier,
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

  useEffect(() => {
    if (reducedMotion) return;
    const headerWrapper = headerWrapperRef.current;
    const bufferLine = bufferLineRef.current;
    const els = [headerRef.current, leadRef.current, ruleRef.current].filter(Boolean) as HTMLElement[];
    if (!headerWrapper || els.length === 0) return;

    if (bufferLine) {
      gsap.set(bufferLine, { scaleX: 0, transformOrigin: 'left center' });
    }
    gsap.set(els, { opacity: 0, y: momentRecapMotion.intro.y });

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
      duration: momentRecapMotion.intro.duration,
      ease: momentRecapMotion.ease.expoOut,
      stagger: momentRecapMotion.intro.stagger,
    }, bufferLine ? '-=0.55' : 0);

    return () => { tl.kill(); };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id={momentRecapContent.id}
      className="moment-recap-section relative isolate text-[var(--day-body)]"
      style={{ background: 'var(--day-surface)' }}
    >
      <div ref={headerWrapperRef} className="moment-recap-header" style={{ paddingInline: 'var(--layout-padding)' }}>
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
          className="flex w-full items-center gap-4 text-[var(--text-meta)] font-light leading-none tracking-[0.24em] uppercase text-[var(--day-meta)]"
        >
          <p className="m-0 shrink-0">{momentRecapContent.headerLabel}</p>
          {!reducedMotion && (
            <HeaderProgress parentTween={tweenReady ? horizontalTweenRef.current : null} />
          )}
        </header>

        <div
          ref={leadRef}
          style={{ marginTop: 'clamp(1.5rem, 3vh, 2.5rem)' }}
        >
          <h2
            className="m-0 font-display font-bold leading-[0.88] tracking-[-0.04em] text-[var(--day-heading)]"
            style={{ fontSize: 'var(--text-section)' }}
          >
            {momentRecapContent.headline}
          </h2>
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
        className="moment-recap-slides-wrapper"
        style={{ flexDirection: reducedMotion ? 'column' : 'row' }}
      >
        {momentRecapContent.frames.map((frame, index) => (
          <MomentRecapFrame
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
  );
}

type MomentRecapFrameProps = {
  key?: string;
  frame: (typeof momentRecapContent.frames)[number];
  index: number;
  reducedMotion: boolean;
  parentTween: gsap.core.Tween | null;
};

function MomentRecapFrame({ frame, index, reducedMotion, parentTween }: MomentRecapFrameProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const numberRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (reducedMotion || !parentTween) return;
    const imageEl = imageRef.current;
    if (!imageEl) return;

    const tween = gsap.fromTo(imageEl,
      { scale: momentRecapMotion.imageZoom.from },
      {
        scale: momentRecapMotion.imageZoom.to,
        ease: 'none',
        scrollTrigger: {
          trigger: imageEl.closest('.moment-recap-slide'),
          containerAnimation: parentTween,
          start: 'left 90%',
          end: 'left 10%',
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion, parentTween]);

  useEffect(() => {
    if (reducedMotion || !parentTween) return;
    const titleEl = titleRef.current;
    const numberEl = numberRef.current;
    const ruleEl = ruleRef.current;
    const descEl = descRef.current;
    if (!titleEl) return;

    const split = new SplitText(titleEl, { type: 'words,chars' });
    const slideEl = titleEl.closest('.moment-recap-slide');

    if (numberEl) gsap.set(numberEl, { opacity: 0, y: 12 });
    if (ruleEl) gsap.set(ruleEl, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(split.chars, { y: momentRecapMotion.splitText.y, opacity: 0 });
    if (descEl) gsap.set(descEl, { opacity: 0, y: momentRecapMotion.cascade.descY });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: slideEl,
        containerAnimation: parentTween,
        start: 'left 75%',
        toggleActions: 'play none none none',
      },
    });

    if (numberEl) {
      tl.to(numberEl, {
        opacity: 1,
        y: 0,
        duration: momentRecapMotion.cascade.numberDuration,
        ease: momentRecapMotion.ease.quartOut,
      });
    }

    if (ruleEl) {
      tl.to(ruleEl, {
        scaleX: 1,
        duration: momentRecapMotion.cascade.ruleDuration,
        ease: momentRecapMotion.ease.expoOut,
      }, numberEl ? '-=0.35' : 0);
    }

    tl.to(split.chars, {
      y: 0,
      opacity: 1,
      duration: momentRecapMotion.splitText.duration,
      ease: momentRecapMotion.ease.quadOut,
      stagger: momentRecapMotion.splitText.stagger,
    }, ruleEl ? '-=0.4' : (numberEl ? '-=0.2' : 0));

    if (descEl) {
      tl.to(descEl, {
        opacity: 1,
        y: 0,
        duration: momentRecapMotion.cascade.descDuration,
        ease: momentRecapMotion.ease.quartOut,
      }, '-=0.5');
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      split.revert();
    };
  }, [reducedMotion, parentTween]);

  return (
    <article
      className="moment-recap-slide moment-recap-frame group"
      style={{ width: reducedMotion ? 'auto' : '100vw' }}
    >
      <div className="moment-recap-frame-media relative isolate overflow-hidden bg-[var(--day-surface-warm)]">
        <div className="pointer-events-none absolute inset-0 z-2 border border-[var(--night-deep)]/5" />
        <span
          className="absolute z-3 inline-flex items-center bg-[var(--night-overlay)] px-[0.5em] py-[0.2em] font-sans text-[var(--text-label)] font-normal tracking-[0.22em] uppercase text-[var(--frost-text)] whitespace-nowrap"
          style={{ top: 'clamp(0.7rem, 1.2vw, 1rem)', left: 'clamp(0.7rem, 1.2vw, 1rem)' }}
        >
          {frame.stamp}
        </span>
        {frame.image ? (
          <img
            ref={imageRef}
            src={frame.image}
            alt={frame.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="absolute inset-0 block h-full w-full object-cover"
            style={{
              transform: `scale(${reducedMotion ? 1 : momentRecapMotion.imageZoom.from})`,
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          />
        ) : (
          <div className="moment-recap-pending-frame absolute inset-0">
            <div className="moment-recap-pending-grid" />
            <span className="moment-recap-pending-label">
              Open slot
            </span>
          </div>
        )}
      </div>

      <div
        className="moment-recap-frame-content flex flex-col"
        style={{ gap: 'clamp(1rem, 2vh, 1.6rem)' }}
      >
        <p
          ref={numberRef}
          className="m-0 flex items-center gap-[0.6rem] font-sans text-[var(--text-meta)] font-light tracking-[0.26em] uppercase text-[var(--day-meta)]"
        >
          <span>{frame.year}</span>
          <span
            ref={ruleRef}
            className="h-px flex-1 bg-[var(--border-day)]"
            style={{ maxWidth: 'clamp(40px, 6vw, 96px)' }}
            aria-hidden="true"
          />
          <span>{frame.number}</span>
        </p>
        <h3
          ref={titleRef}
          className="m-0 font-display font-bold leading-[0.88] tracking-[-0.04em] text-[var(--day-ink)]"
          style={{ fontSize: 'clamp(2.25rem, calc(0.4rem + 4.8vw), 5rem)', whiteSpace: 'nowrap' }}
        >
          {frame.title.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < frame.title.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h3>
        <p
          ref={descRef}
          className="m-0 font-body leading-[1.5] tracking-[0.004em] text-[var(--day-secondary)]"
          style={{ fontSize: 'var(--text-body)' }}
        >
          {frame.subtitle}
        </p>
      </div>
    </article>
  );
}
