import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { workExperienceContent } from './content';

type WorkExperienceSectionProps = {
  revealReady?: boolean;
};

export function WorkExperienceSection({ revealReady = false }: WorkExperienceSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const contentReady = prefersReducedMotion || revealReady || sectionInView;
  const liveMonthYear = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  })
    .format(new Date())
    .replace(' ', '/');

  return (
    <motion.section
      ref={sectionRef}
      id={workExperienceContent.id}
      className="bg-[oklch(0.93_0.005_255)] px-4 py-12 text-[oklch(0.19_0.01_255)] sm:px-6 sm:py-14 md:px-10 lg:px-12 lg:py-18"
    >
      <motion.header
        className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 font-sans text-[13px] font-normal leading-none tracking-[0.08em] text-[oklch(0.34_0.01_255)]"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={contentReady ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.54, ease: [0.22, 1, 0.36, 1], delay: prefersReducedMotion ? 0 : 0.16 }}
      >
        <p>{workExperienceContent.topLabel}</p>
        <p>{liveMonthYear}</p>
      </motion.header>

      <div className="mx-auto mt-10 grid w-full max-w-[1320px] gap-10 lg:mt-18 lg:grid-cols-[1.18fr_0.92fr] lg:gap-16">
        <motion.h2
          className="max-w-[7.2ch] font-display text-[clamp(3.5rem,9.2vw,8.3rem)] font-bold leading-[0.9] tracking-[-0.04em] text-[oklch(0.12_0.01_255)]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={contentReady ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: prefersReducedMotion ? 0 : 0.22 }}
        >
          {workExperienceContent.headline[0]}
          <br />
          {workExperienceContent.headline[1]}
        </motion.h2>

        <ul className="space-y-7 font-sans lg:space-y-8">
          {workExperienceContent.roles.map((role, index) => (
            <motion.li
              key={`${role.years}-${role.company}`}
              className="grid grid-cols-[112px_minmax(0,1fr)] gap-4 sm:grid-cols-[128px_minmax(0,1fr)] sm:gap-5"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={contentReady ? { opacity: 1, y: 0 } : undefined}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.56,
                ease: [0.16, 1, 0.3, 1],
                delay: prefersReducedMotion ? 0 : 0.32 + 0.1 * index,
              }}
            >
              <p className="pt-0.5 text-[clamp(0.98rem,1.1vw,1.2rem)] font-light leading-[1.2] tracking-[0.02em] text-[oklch(0.42_0.01_255)]">
                {role.years}
              </p>
              <div>
                <h3 className="text-[clamp(1.34rem,1.62vw,1.92rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[oklch(0.14_0.01_255)]">
                  {role.title}
                </h3>
                <p className="mt-1 text-[clamp(1.1rem,1.38vw,1.5rem)] font-light leading-[1.16] tracking-[-0.01em] text-[oklch(0.31_0.01_255)]">
                  {role.company}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
