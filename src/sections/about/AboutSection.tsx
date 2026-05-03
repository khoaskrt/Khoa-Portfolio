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

  const orbOneY = useTransform(sectionProgress, [0, 1], [48, -44]);
  const orbTwoY = useTransform(sectionProgress, [0, 1], [48, -44]);
  const orbThreeY = useTransform(sectionProgress, [0, 1], [48, -44]);
  const railProgress = useTransform(railSectionProgress, [0, 1], [0, 1]);
  const introOpacity = useTransform(sectionProgress, [0, 0.18, 0.42], [0.88, 0.88, 0]);
  const introY = useTransform(sectionProgress, [0, 0.42], [0, -24]);
  const quoteOpacity = useTransform(sectionProgress, [0.24, 0.52], [0, 1]);
  const quoteY = useTransform(sectionProgress, [0.24, 0.52], [40, 0]);

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
      className="about-shell relative isolate z-[var(--z-about)] min-h-[135vh] overflow-hidden px-4 pt-12 pb-36 sm:min-h-[145vh] sm:px-6 sm:pt-16 sm:pb-44 md:min-h-[152vh] md:px-10 md:pb-52 lg:min-h-[162vh] lg:px-12 lg:pt-20 lg:pb-64"
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
        className="pointer-events-none absolute top-1/2 right-2 z-30 hidden -translate-y-1/2 items-center gap-3 md:flex lg:right-4"
        style={{ opacity: aboutRailOpacity }}
      >
        <div className="relative h-[16.5rem] w-[2px] overflow-hidden rounded-full bg-white/24 lg:h-[19rem]">
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

      <header className="mx-auto flex min-h-11 w-full max-w-[1200px] items-center justify-between gap-4 text-[11px] font-light uppercase tracking-[0.16em] text-white/86 sm:text-[12px] sm:tracking-[0.2em] md:text-[13px] md:tracking-[0.24em]">
        <span className="whitespace-nowrap">{aboutContent.eyebrow}</span>
        <a href="#hero" className="inline-flex min-h-11 items-center px-3 transition-colors hover:text-red-300 sm:px-4">
          Back to top
        </a>
      </header>

      <div className="mx-auto mt-6 grid min-h-[540px] w-full max-w-[1200px] grid-cols-1 gap-10 lg:mt-8 lg:grid-cols-[1.25fr_0.95fr] lg:gap-8">
        <motion.div variants={aboutItemVariants} className="relative h-full">
          <h2 className="pointer-events-none absolute left-0 top-16 select-none font-display text-[clamp(4.3rem,10vw,11.3rem)] font-semibold uppercase leading-[0.82] tracking-tight text-white/78">
            {aboutContent.wallTitleFirst}
            <br />
            <span className="font-light text-white/70">{aboutContent.wallTitleSecond}</span>
          </h2>

          <span className="pointer-events-none absolute left-[46%] top-[62%] -translate-x-1/2 text-[80px] font-thin leading-none text-white/55">
            +
          </span>
        </motion.div>

        <motion.div variants={aboutItemVariants} className="relative z-10 pt-14 lg:pt-24">
          <figure className="group relative max-w-[37ch] overflow-hidden border border-white/25 bg-white/[0.03] p-2 shadow-[0_16px_42px_rgba(0,0,0,0.42)]">
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 border border-white/8" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-2 top-2 h-px bg-white/20" />
            <img
              src={aboutUsImage}
              alt={aboutContent.imageAlt}
              className="h-[280px] w-full border border-white/12 object-cover grayscale-[8%] contrast-[1.04] brightness-[0.98]"
              loading="lazy"
            />
          </figure>
        </motion.div>
      </div>

      <motion.article
        ref={narrativeRef}
        variants={aboutItemVariants}
        className="about-copy-wrap mx-auto mt-8 w-full max-w-[1200px] pb-20 sm:pb-24 md:mt-10 md:pb-28 lg:mt-12 lg:pb-36"
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
            className="about-reading-glow about-quote-copy w-full max-w-none text-[clamp(1.42rem,4.14vw,2.95rem)] font-light leading-[1.23] tracking-[-0.004em]"
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

      <span
        className="pointer-events-none absolute left-6 top-24 text-[150px] font-light leading-none text-white/30 lg:left-8 lg:top-20"
        style={{ opacity: aboutOrnamentOpacity }}
      >
        [
      </span>
      <span
        className="pointer-events-none absolute bottom-24 right-6 text-[150px] font-light leading-none text-white/30 lg:bottom-20 lg:right-8"
        style={{ opacity: aboutOrnamentOpacity }}
      >
        ]
      </span>

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
    offset: isLeadLine ? ['start 96%', 'end 22%'] : ['start 78%', 'end 34%'],
  });
  const emphasis = useTransform(
    lineProgress,
    isLeadLine ? [0, 0.36, 0.44, 0.68, 0.78, 1] : [0, 0.44, 0.52, 0.66, 0.76, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const lineColor = useTransform(emphasis, (value) => (value >= 0.5 ? 'rgb(245 245 245)' : 'rgb(122 126 132)'));

  return (
    <motion.span
      ref={lineRef}
      className="mb-[0.28em] block last:mb-0"
      style={{
        opacity: 1,
        color: reducedMotion ? 'rgb(235 235 235)' : lineColor,
        textShadow: 'none',
      }}
      transition={{ duration: 0.34, ease: [0.2, 1, 0.36, 1] }}
    >
      {line}
    </motion.span>
  );
}
