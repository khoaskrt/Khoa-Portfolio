import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import aboutUsImage from '../../assets/images/aboutus_image.JPG';
import { aboutContent } from './content';
import { aboutContainerVariants, aboutItemVariants } from './motion';

type AboutSectionProps = {
  transitionProgress?: number;
};

export function AboutSection({ transitionProgress = 0 }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const narrativeRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeDot, setActiveDot] = useState(0);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start 92%', 'end 8%'],
  });
  const { scrollYProgress: railSectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start 92%', 'end 100%'],
  });
  const { scrollYProgress } = useScroll({
    target: narrativeRef,
    offset: ['start 82%', 'end 24%'],
  });

  const orbOneY = useTransform(sectionProgress, [0, 1], [40, -36]);
  const orbTwoY = useTransform(sectionProgress, [0, 1], [52, -48]);
  const orbThreeY = useTransform(sectionProgress, [0, 1], [32, -28]);
  const railProgress = useTransform(railSectionProgress, [0.05, 0.95], [0, 1]);
  const introOpacity = useTransform(sectionProgress, [0, 0.16, 0.38, 0.48], [0.88, 0.88, 0.2, 0]);
  const introY = useTransform(sectionProgress, [0, 0.48], [0, -20]);
  const quoteOpacity = useTransform(sectionProgress, [0.22, 0.48], [0, 1]);
  const quoteY = useTransform(sectionProgress, [0.22, 0.52], [32, 0]);

  const descriptionLines = aboutContent.description
    .split('. ')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index, all) => (index < all.length - 1 ? `${line}.` : line));

  const introSentence = descriptionLines[0] ?? '';
  const quoteLines = descriptionLines.slice(1);
  const transitionFadeProgress = Math.min(Math.max((transitionProgress - 0.5) / 0.36, 0), 1);
  const aboutOrnamentOpacity = prefersReducedMotion ? 1 : 1 - transitionFadeProgress * 0.88;
  const aboutRailOpacity = prefersReducedMotion ? 1 : 1 - transitionFadeProgress * 0.7;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.33) {
      setActiveDot(0);
      return;
    }
    if (latest < 0.66) {
      setActiveDot(1);
      return;
    }
    setActiveDot(2);
  });

  return (
    <motion.section
      id={aboutContent.id}
      ref={sectionRef}
      className="about-section relative isolate z-[var(--z-about)] overflow-hidden"
      style={{ paddingInline: 'var(--layout-padding)', minHeight: 'clamp(135vh, 140vh + 5vw, 162vh)' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={aboutContainerVariants}
    >
      <div
        aria-hidden="true"
        className="about-flow-bg pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        style={{ opacity: aboutOrnamentOpacity }}
      >
        <motion.div className="about-flow-orb about-flow-orb-one" style={{ y: prefersReducedMotion ? 0 : orbOneY }} />
        <motion.div className="about-flow-orb about-flow-orb-two" style={{ y: prefersReducedMotion ? 0 : orbTwoY }} />
        <motion.div className="about-flow-orb about-flow-orb-three" style={{ y: prefersReducedMotion ? 0 : orbThreeY }} />
      </div>

      <aside
        aria-label="About section progress"
        className="pointer-events-none absolute top-1/2 z-30 hidden -translate-y-1/2 items-center gap-3 md:flex"
        style={{ right: 'clamp(0.5rem, 1.5vw, 1rem)', opacity: aboutRailOpacity }}
      >
        <div className="relative w-[2px] overflow-hidden rounded-full bg-white/24" style={{ height: 'clamp(16.5rem, 18vw, 19rem)' }}>
          <span className="absolute -top-1 left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white/45" />
          <span className="absolute -bottom-1 left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-white/45" />
          <motion.span
            className="absolute inset-0 origin-top rounded-full bg-white/90 shadow-[0_0_14px_rgba(255,255,255,0.34)]"
            style={{ scaleY: railProgress }}
          />
        </div>
        <div className="flex flex-col items-center gap-5">
          <span className={`about-rail-dot ${activeDot === 0 ? 'is-active' : ''}`} />
          <span className={`about-rail-dot ${activeDot === 1 ? 'is-active' : ''}`} />
          <span className={`about-rail-dot ${activeDot === 2 ? 'is-active' : ''}`} />
        </div>
      </aside>

      <header
        className="about-header flex min-h-11 w-full items-center justify-between gap-4 text-[var(--text-meta)] font-light uppercase text-white/86"
        style={{ letterSpacing: 'clamp(0.16em, 0.5vw, 0.24em)' }}
      >
        <span className="whitespace-nowrap">{aboutContent.eyebrow}</span>
        <a href="#hero" className="about-header-link inline-flex min-h-11 items-center transition-colors duration-200 ease-[var(--ease-quart-out)] hover:text-[var(--signal-red-hover)]" style={{ paddingInline: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
          Back to top
        </a>
      </header>

      <div
        className="grid w-full grid-cols-[1.25fr_0.95fr]"
        style={{ marginTop: 'clamp(1.5rem, 3vw, 2rem)', minHeight: '540px', gap: 'clamp(2rem, 4vw, 2.5rem)' }}
      >
        <motion.div variants={aboutItemVariants} className="relative h-full">
          <h2 className="pointer-events-none absolute left-0 top-16 select-none font-display text-[var(--text-display)] font-semibold uppercase leading-[0.82] tracking-tight text-white/78">
            {aboutContent.wallTitleFirst}
            <br />
            <span className="font-light text-white/70">{aboutContent.wallTitleSecond}</span>
          </h2>

          <span className="pointer-events-none absolute left-[46%] top-[62%] -translate-x-1/2 text-[80px] font-thin leading-none text-white/55">
            +
          </span>
        </motion.div>

        <motion.div variants={aboutItemVariants} className="relative z-10" style={{ paddingTop: 'clamp(3.5rem, 6vw, 6rem)' }}>
          <figure className="about-figure group relative max-w-[37ch] overflow-hidden border border-white/25 bg-white/[0.03] p-2 shadow-[0_16px_42px_rgba(0,0,0,0.42)]">
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
        </motion.div>
      </div>

      <motion.article
        ref={narrativeRef}
        variants={aboutItemVariants}
        className="about-copy-wrap w-full"
        style={{ marginTop: 'clamp(2rem, 3.5vw, 3rem)', paddingBottom: 'clamp(5rem, 9vw, 9rem)' }}
      >
        <motion.p
          className="about-transition-note"
          style={{ opacity: prefersReducedMotion ? 0.78 : introOpacity, y: prefersReducedMotion ? 0 : introY }}
        >
          {introSentence}
        </motion.p>

        <div className="about-quote-stage">
          <span className="about-quote-mark" aria-hidden="true">
            ,,
          </span>
          <motion.p
            className="about-reading-glow about-quote-copy w-full max-w-none text-[var(--text-quote)] font-normal leading-[1.35] tracking-[-0.004em]"
            style={{ opacity: prefersReducedMotion ? 0.95 : quoteOpacity, y: prefersReducedMotion ? 0 : quoteY }}
          >
            {quoteLines.map((line, index) => (
              <ReadingLine
                key={`${line}-${index}`}
                line={line}
                index={index}
                reducedMotion={prefersReducedMotion}
              />
            ))}
          </motion.p>
        </div>
      </motion.article>

    </motion.section>
  );
}

type ReadingLineProps = {
  key?: string;
  index: number;
  line: string;
  reducedMotion: boolean;
};

function ReadingLine({ line, index, reducedMotion }: ReadingLineProps) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const isLeadLine = index === 0;
  const { scrollYProgress: lineProgress } = useScroll({
    target: lineRef,
    offset: isLeadLine ? ['start 96%', 'end 18%'] : ['start 82%', 'end 28%'],
  });
  const emphasis = useTransform(
    lineProgress,
    isLeadLine ? [0, 0.28, 0.42, 0.62, 0.76, 1] : [0, 0.36, 0.48, 0.62, 0.78, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const lineColor = useTransform(emphasis, [0, 0.3, 0.5, 0.7, 1], [
    'rgb(122 126 132)',
    'rgb(122 126 132)',
    'rgb(245 245 245)',
    'rgb(245 245 245)',
    'rgb(122 126 132)',
  ]);

  return (
    <motion.span
      ref={lineRef}
      className="mb-[0.28em] block will-change-[color] last:mb-0"
      style={{
        color: reducedMotion ? 'rgb(235 235 235)' : lineColor,
      }}
    >
      {line}
    </motion.span>
  );
}
