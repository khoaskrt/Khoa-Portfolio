import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutContent } from './content';
import './styles.css';

const aboutUsImage = '/assets/images/aboutus_image.JPG';

const aboutMotion = {
  ease: {
    expoOut: 'power4.out',
    quartOut: 'power3.out',
  },
  intro: {
    y: 24,
    duration: 0.9,
    stagger: 0.1,
  },
  orb: {
    scrub: 1.5,
    ranges: [
      { from: 40, to: -36 },
      { from: 52, to: -48 },
      { from: 32, to: -28 },
    ] as const,
  },
  title: {
    stickyTop: 'clamp(6rem, 10vw, 10rem)',
  },
  snapList: {
    scrub: true,
    dimOpacity: 0.2,
    dimScale: 0.8,
    stagger: 0.5,
  },
} as const;

gsap.registerPlugin(ScrollTrigger);

type AboutSectionProps = {
  transitionProgress?: number;
};

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function AboutSection({ transitionProgress = 0 }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const snapListRef = useRef<HTMLUListElement>(null);

  const descriptionLines = aboutContent.description
    .split('. ')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index, all) => (index < all.length - 1 ? `${line}.` : line));

  const orbFade = Math.min(Math.max(transitionProgress / 0.12, 0), 1);
  const aboutOrnamentOpacity = prefersReducedMotion ? 1 : 1 - orbFade * 0.95;

  const snapFade = prefersReducedMotion ? 0 : Math.min(Math.max(transitionProgress / 0.10, 0), 1);
  const figureFade = prefersReducedMotion ? 0 : Math.min(Math.max((transitionProgress - 0.02) / 0.10, 0), 1);

  // Section entrance reveal
  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    const els = [headerRef.current, gridRef.current].filter(Boolean) as HTMLElement[];
    if (!section || els.length === 0) return;

    gsap.set(els, { opacity: 0, y: aboutMotion.intro.y });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    });

    tl.to(els, {
      opacity: 1,
      y: 0,
      duration: aboutMotion.intro.duration,
      ease: aboutMotion.ease.expoOut,
      stagger: aboutMotion.intro.stagger,
    });

    return () => { tl.kill(); };
  }, []);

  // Orb parallax
  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    const orbs = orbRefs.current.filter(Boolean) as HTMLElement[];
    if (!section || orbs.length === 0) return;

    const tweens = orbs.map((orb, i) => {
      const range = aboutMotion.orb.ranges[i];
      gsap.set(orb, { y: range.from });
      return gsap.to(orb, {
        y: range.to,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: aboutMotion.orb.scrub,
        },
      });
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  // Title sticky fade — fades out as snap container scrolls in
  useEffect(() => {
    if (prefersReducedMotion) return;
    const title = titleRef.current;
    const snapContainer = snapListRef.current?.closest('.about-snap-container') as HTMLElement | null;
    if (!title || !snapContainer) return;

    const tween = gsap.to(title, {
      opacity: 0,
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: snapContainer,
        start: 'top 85%',
        end: 'top 40%',
        scrub: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // Scroll-snap list animation (CodePen pattern)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const list = snapListRef.current;
    if (!list) return;

    const items = list.querySelectorAll('li');
    const spans = list.querySelectorAll<HTMLElement>('li > span');
    if (spans.length === 0 || items.length === 0) return;

    gsap.set(spans, { transformOrigin: '0 50%' });
    const nonFirstSpans = Array.from(spans).slice(1);
    const nonLastSpans = Array.from(spans).slice(0, -1);

    gsap.set(nonFirstSpans, {
      opacity: aboutMotion.snapList.dimOpacity,
      scale: aboutMotion.snapList.dimScale,
    });

    const tl = gsap.timeline();
    tl.to(nonFirstSpans, {
      opacity: 1,
      scale: 1,
      stagger: aboutMotion.snapList.stagger,
    });
    tl.to(nonLastSpans, {
      opacity: aboutMotion.snapList.dimOpacity,
      scale: aboutMotion.snapList.dimScale,
      stagger: aboutMotion.snapList.stagger,
    }, 0);

    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    const st = ScrollTrigger.create({
      trigger: firstItem,
      start: 'center center',
      endTrigger: lastItem,
      end: 'center center',
      animation: tl,
      scrub: aboutMotion.snapList.scrub,
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id={aboutContent.id}
      ref={sectionRef}
      className="about-section relative isolate z-[var(--z-about)] overflow-x-clip"
      style={{ paddingInline: 'var(--layout-padding)' }}
    >
      <div
        aria-hidden="true"
        className="about-flow-bg pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        style={{ opacity: aboutOrnamentOpacity }}
      >
        <div ref={(el) => { orbRefs.current[0] = el; }} className="about-flow-orb about-flow-orb-one will-change-transform" />
        <div ref={(el) => { orbRefs.current[1] = el; }} className="about-flow-orb about-flow-orb-two will-change-transform" />
        <div ref={(el) => { orbRefs.current[2] = el; }} className="about-flow-orb about-flow-orb-three will-change-transform" />
      </div>

      <header
        ref={headerRef}
        className="about-header flex min-h-11 w-full items-center justify-between gap-4 text-[var(--text-meta)] font-light uppercase text-white"
        style={{ letterSpacing: 'clamp(0.16em, 0.5vw, 0.24em)' }}
      >
        <span className="whitespace-nowrap">{aboutContent.eyebrow}</span>
        <a href="#hero" className="about-header-link inline-flex min-h-11 items-center transition-colors duration-200 ease-[var(--ease-quart-out)] hover:text-[var(--signal-red-hover)]" style={{ paddingInline: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
          Back to top
        </a>
      </header>

      <div
        ref={gridRef}
        className="about-grid grid w-full grid-cols-1 md:grid-cols-[1.25fr_0.95fr] md:min-h-[540px]"
        style={{ marginTop: 'clamp(1.5rem, 3vw, 2rem)', gap: 'clamp(2rem, 4vw, 2.5rem)' }}
      >
        <div className="relative h-full">
          <h2
            ref={titleRef}
            className="about-title m-0 font-display font-bold uppercase leading-[0.88] tracking-[-0.04em] text-white"
            style={{ fontSize: 'var(--text-display)', top: aboutMotion.title.stickyTop }}
          >
            {aboutContent.wallTitleFirst}
            <br />
            <span className="font-light text-white">{aboutContent.wallTitleSecond}</span>
          </h2>

          <span className="pointer-events-none absolute left-[46%] top-[62%] hidden -translate-x-1/2 text-[80px] font-thin leading-none text-white md:block">
            +
          </span>
        </div>

        <div ref={figureRef} className="about-grid-figure relative z-10" style={{
          paddingTop: 'clamp(3.5rem, 6vw, 6rem)',
          opacity: 1 - figureFade * 0.6,
          transform: `translateY(${figureFade * 12}px)`,
        }}>
          <figure className="about-figure group relative overflow-hidden border border-white/25 bg-white/[0.03] p-2 shadow-[0_16px_42px_rgba(0,0,0,0.42)]">
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 border border-white/8" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-2 top-2 h-px bg-white/20" />
            <img
              src={aboutUsImage}
              alt={aboutContent.imageAlt}
              className="about-figure-img w-full max-h-[360px] border border-white/12 object-cover grayscale-[8%] contrast-[1.04] brightness-[0.98]"
              style={{ aspectRatio: '16 / 11' }}
              loading="lazy"
            />
          </figure>
        </div>
      </div>

      <div
        className="about-snap-container"
        style={{
          marginTop: 'clamp(2rem, 3.5vw, 3rem)',
          paddingBottom: 'clamp(5rem, 9vw, 9rem)',
          opacity: 1 - snapFade,
          transform: `translateY(${snapFade * 16}px)`,
        }}
      >
        <ul ref={snapListRef} className="about-snap-list">
          {descriptionLines.map((line, index) => (
            <li key={index}>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
