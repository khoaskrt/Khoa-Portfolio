import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { duration, ease } from '../../motion/easing';
import { workExperienceContent } from './content';

type WorkExperienceSectionProps = {
  revealReady?: boolean;
  transitionProgress?: number;
};

export function WorkExperienceSection({ revealReady = false, transitionProgress = 0 }: WorkExperienceSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const [activeRole, setActiveRole] = useState<string | null>(
    workExperienceContent.roles[0]
      ? `${workExperienceContent.roles[0].years}-${workExperienceContent.roles[0].company}`
      : null,
  );
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const transitionUnlockProgress = prefersReducedMotion
    ? 1
    : Math.min(Math.max((transitionProgress - 0.72) / 0.28, 0), 1);
  const contentReady = prefersReducedMotion || (isCompactViewport ? revealReady || sectionInView : revealReady);
  const staggerReady = prefersReducedMotion || (contentReady && transitionUnlockProgress >= 0.1);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const syncViewport = () => setIsCompactViewport(mediaQuery.matches);
    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);
    return () => mediaQuery.removeEventListener('change', syncViewport);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 92%', 'end 20%'],
  });

  const headerOpacity = useTransform(scrollYProgress, [0.04, 0.22], [0, 1]);
  const headlineOpacity = useTransform(scrollYProgress, [0.1, 0.36], [0, 1]);
  const listOpacity = useTransform(scrollYProgress, [0.18, 0.52], [0, 1]);
  const headerX = useTransform(scrollYProgress, [0.04, 0.22], [20, 0]);
  const headlineX = useTransform(scrollYProgress, [0.1, 0.38], [28, 0]);
  const listX = useTransform(scrollYProgress, [0.18, 0.54], [22, 0]);

  const language = typeof document !== 'undefined' ? document.documentElement.lang || undefined : undefined;
  const monthYearFormatter = new Intl.DateTimeFormat(language, {
    month: 'short',
    year: 'numeric',
  });
  const parts = monthYearFormatter.formatToParts(new Date());
  const month = parts.find((part) => part.type === 'month')?.value ?? '';
  const year = parts.find((part) => part.type === 'year')?.value ?? '';
  const liveMonthYear = month && year ? `${month}/${year}` : monthYearFormatter.format(new Date());

  return (
    <motion.section
      ref={sectionRef}
      id={workExperienceContent.id}
      data-reveal={staggerReady ? 'ready' : 'locked'}
      className="relative isolate z-[var(--z-work)] mt-0 min-h-[90vh] overflow-hidden bg-[oklch(0.93_0.005_255)] px-4 pt-[clamp(7rem,12vh,10rem)] pb-16 text-[oklch(0.19_0.01_255)] sm:min-h-[94vh] sm:px-6 sm:pt-[clamp(8rem,13vh,11.5rem)] sm:pb-20 md:min-h-[98vh] md:px-10 md:pt-[clamp(9rem,14vh,12.5rem)] md:pb-24 lg:min-h-[103vh] lg:px-12 lg:pt-[clamp(11rem,16vh,15rem)] lg:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[clamp(8rem,14vh,12rem)] bg-gradient-to-b from-[oklch(0.93_0.005_255/0.94)] via-[oklch(0.93_0.005_255/0.6)] to-[oklch(0.93_0.005_255/0)]"
      />

      <motion.header
        className="relative z-10 mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 font-sans text-[13px] font-normal leading-none tracking-[0.08em] text-[oklch(0.34_0.01_255)] will-change-transform"
        style={
          prefersReducedMotion
            ? undefined
            : {
                opacity: staggerReady ? headerOpacity : 0,
                x: contentReady ? headerX : 20,
              }
        }
      >
        <p>{workExperienceContent.topLabel}</p>
        <p>{liveMonthYear}</p>
      </motion.header>

      <div className="relative z-10 mx-auto mt-10 grid w-full max-w-[1320px] gap-10 lg:mt-18 lg:grid-cols-[1.18fr_0.92fr] lg:gap-16">
        <motion.h2
          className="max-w-[7.2ch] font-display text-[clamp(3.5rem,9.2vw,8.3rem)] font-bold leading-[0.9] tracking-[-0.04em] text-[oklch(0.12_0.01_255)] will-change-transform"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: staggerReady ? headlineOpacity : 0,
                  x: contentReady ? headlineX : 30,
                }
          }
        >
          {workExperienceContent.headline[0]}
          <br />
          {workExperienceContent.headline[1]}
        </motion.h2>

        <motion.p
          className="max-w-[42ch] self-end text-[clamp(0.98rem,1.1vw,1.18rem)] font-light leading-[1.45] tracking-[0.01em] text-[oklch(0.32_0.01_255)]"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: staggerReady ? headlineOpacity : 0,
                  x: contentReady ? headlineX : 30,
                }
          }
        >
          {workExperienceContent.summary}
        </motion.p>
      </div>

      <motion.ul
        className="relative z-10 mx-auto mt-10 w-full max-w-[1320px] divide-y divide-[oklch(0.85_0.01_255)] font-sans lg:mt-14"
        style={
          prefersReducedMotion
            ? undefined
            : {
                opacity: staggerReady ? listOpacity : 0,
                x: contentReady ? listX : 22,
              }
        }
      >
        {workExperienceContent.roles.map((role, index) => {
          const itemKey = `${role.years}-${role.company}`;
          const isOpen = activeRole === itemKey;
          return (
            <motion.li
              key={itemKey}
              className="py-5 sm:py-6"
              initial={prefersReducedMotion ? false : { opacity: 0, x: 22 }}
              animate={staggerReady ? { opacity: 1, x: 0 } : prefersReducedMotion ? undefined : { opacity: 0, x: 22 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: duration.reveal,
                ease: ease.expoOut,
                delay: prefersReducedMotion ? 0 : 0.24 + (1 - transitionUnlockProgress) * 0.1 + 0.08 * index,
              }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setActiveRole((prev) => (prev === itemKey ? null : itemKey))}
                className="grid w-full gap-4 text-left transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[oklch(0.28_0.01_255)] sm:gap-6 lg:grid-cols-[1fr_auto]"
              >
                <div className="space-y-2">
                  <h3 className="text-[clamp(1.22rem,1.85vw,2rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[oklch(0.14_0.01_255)] break-words">
                    {role.title} at {role.company}
                  </h3>
                  <p className="max-w-[68ch] text-[clamp(0.94rem,1vw,1.08rem)] font-light leading-[1.4] tracking-[0.005em] text-[oklch(0.36_0.01_255)]">
                    {role.blurb}
                  </p>
                </div>
                <div className="pt-0.5 text-left lg:min-w-[235px] lg:text-right">
                  <p className="text-[clamp(1.5rem,3.2vw,2.95rem)] font-medium leading-[1] tracking-[-0.03em] text-[oklch(0.15_0.01_255)]">
                    {role.years}
                  </p>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key={`${itemKey}-details`}
                    className="grid overflow-hidden pt-4"
                    initial={{ gridTemplateRows: '0fr', opacity: 0 }}
                    animate={{ gridTemplateRows: '1fr', opacity: 1 }}
                    exit={{ gridTemplateRows: '0fr', opacity: 0 }}
                    transition={{
                      gridTemplateRows: { duration: duration.interaction, ease: ease.expoOut },
                      opacity: { duration: duration.hover, ease: ease.quartOut, delay: 0.06 },
                    }}
                  >
                    <div className="min-h-0">
                      <div className="space-y-4 pb-2 sm:space-y-5">
                        <ul className="space-y-2 text-[0.94rem] font-light leading-[1.55] tracking-[0.01em] text-[oklch(0.28_0.01_255)]">
                          {role.details.map((detail) => (
                            <li key={detail} className="ml-4 list-disc">
                              {detail}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[0.84rem] font-normal uppercase tracking-[0.08em] text-[oklch(0.34_0.01_255)]">
                          {role.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              className="underline decoration-[oklch(0.46_0.01_255)] underline-offset-4 transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-[oklch(0.2_0.01_255)]"
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.section>
  );
}
