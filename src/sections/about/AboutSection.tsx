import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import aboutUsImage from '../../assets/images/aboutus_image.JPG';
import { aboutContent } from './content';
import { aboutContainerVariants, aboutItemVariants } from './motion';

export function AboutSection() {
  const narrativeRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: narrativeRef,
    offset: ['start 94%', 'end 18%'],
  });
  const descriptionLines = aboutContent.description
    .split('. ')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index, all) => (index < all.length - 1 ? `${line}.` : line));

  return (
    <motion.section
      id={aboutContent.id}
      className="about-shell relative isolate min-h-[135vh] overflow-hidden px-4 pt-12 pb-36 sm:min-h-[145vh] sm:px-6 sm:pt-16 sm:pb-44 md:min-h-[152vh] md:px-10 md:pb-52 lg:min-h-[162vh] lg:px-12 lg:pt-20 lg:pb-64"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={aboutContainerVariants}
    >
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
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 border border-white/8"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-2 top-2 h-px bg-white/20"
            />
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
        className="mx-auto mt-8 w-full max-w-[1200px] pb-20 sm:pb-24 md:pb-28 lg:mt-12 lg:pb-36"
      >
        <p className="about-reading-glow max-w-[70ch] text-[clamp(1.5rem,3vw,2.4rem)] font-normal leading-[1.42] tracking-[0.005em]">
          {descriptionLines.map((line, index) => (
            <ReadingLine
              key={`${line}-${index}`}
              line={line}
              index={index}
              total={descriptionLines.length}
              progress={scrollYProgress}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </p>
      </motion.article>

      <span className="pointer-events-none absolute left-6 top-24 text-[150px] font-light leading-none text-white/30 lg:left-8 lg:top-20">
        [
      </span>
      <span className="pointer-events-none absolute bottom-24 right-6 text-[150px] font-light leading-none text-white/30 lg:bottom-20 lg:right-8">
        ]
      </span>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(to_bottom,oklch(0.1_0.012_253/0),oklch(0.1_0.012_253/0.82),oklch(0.1_0.012_253/1))]"
      />
    </motion.section>
  );
}

type ReadingLineProps = {
  index: number;
  line: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  reducedMotion: boolean;
  total: number;
};

function ReadingLine({ line, index, total, progress, reducedMotion }: ReadingLineProps) {
  const normalized = total === 1 ? 0.5 : index / (total - 1);
  const baseCenter = 0.1 + normalized * 0.66;
  const center = index === 0 ? Math.min(0.24, baseCenter + 0.08) : baseCenter;
  const range = Math.max(0.16, 0.48 / Math.max(total, 2));
  const opacity = useTransform(
    progress,
    [Math.max(0, center - range), center, Math.min(1, center + range)],
    [0.3, 1, 0.28]
  );

  return (
    <motion.span
      className="mb-3 block last:mb-0"
      style={{ opacity: reducedMotion ? 0.92 : opacity }}
      transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
    >
      {line}
    </motion.span>
  );
}
