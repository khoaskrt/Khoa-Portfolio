import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import heroPortrait from '../../assets/images/hero-portrait.jpg';
import { heroContent } from './content';
import { bgVariants, containerVariants, itemVariants } from './motion';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => setIsLoaded(true), 150);
    });
  }, []);

  return (
    <motion.section
      id="hero"
      className={`hero-section relative min-h-dvh w-full cursor-default overflow-x-hidden font-sans select-none ${isLoaded ? 'is-loaded' : ''}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden will-change-transform"
        variants={bgVariants}
      >
        <img
          src={heroPortrait}
          alt={heroContent.portraitAlt}
          className="h-full w-full object-cover grayscale brightness-75 contrast-110"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%]" />
      </motion.div>

      <div className="landing-overlay safe-area-pad relative z-10 flex min-h-dvh w-full flex-col justify-between px-4 py-6 sm:px-6 md:px-12 md:py-8">
        <div className="min-h-11 sm:min-h-16 md:min-h-[4.5rem]" aria-hidden="true" />

        <main className="flex flex-1 flex-col items-end justify-center py-8 text-right sm:py-10">
          <div className="mr-0 md:mr-[5%]">
            <h1>
              <span
                className="hero-h1-reveal hero-cement hero-cement-soft block font-sans text-[clamp(56px,12vw,156px)] font-thin leading-[0.82] tracking-[0.08em] uppercase sm:tracking-[0.12em]"
              >
                {heroContent.headingPrimary}
              </span>
              <span
                className="hero-h2-reveal hero-cement mt-2 block font-display text-[clamp(56px,12vw,156px)] font-bold leading-[0.82] tracking-[-0.012em] uppercase sm:mt-3"
              >
                {heroContent.headingSecondary}
              </span>
            </h1>

            <motion.div
              variants={itemVariants}
              className="hero-stagger mt-5 flex items-center justify-end gap-[10px] text-[10px] font-light tracking-[0.12em] sm:mt-6 sm:tracking-[0.2em] md:text-[12px] md:tracking-widest"
            >
              <div className="uppercase">{heroContent.subtitleYear}</div>
              <div className="opacity-38 tracking-[0.05em]">·</div>
              <div className="font-semibold uppercase">{heroContent.subtitleLabel}</div>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-stagger mt-6 sm:mt-8">
              <a
                href={heroContent.heroCta.href}
                className="hero-cta inline-flex min-h-11 items-center justify-center border border-white/45 bg-white/10 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--frost-text)] sm:text-[12px] md:text-[13px]"
              >
                {heroContent.heroCta.label}
              </a>
            </motion.div>
          </div>
        </main>

        <footer className="w-full">
          <motion.nav
            variants={itemVariants}
            className="hero-stagger flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-white/10 pt-5 text-[9px] font-light uppercase tracking-[0.14em] sm:gap-x-5 sm:gap-y-3 sm:justify-between sm:pt-6 sm:text-[11px] sm:tracking-[0.24em] md:text-[13px] md:tracking-[0.32em]"
          >
            {heroContent.footerWords.map((word, i) => (
              <div key={word} className={i >= 2 && i <= 3 ? 'opacity-85' : ''}>
                {word}
              </div>
            ))}
          </motion.nav>
        </footer>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] grayscale"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23000'/%3E%3Crect width='1' height='1' x='1' y='0' fill='%23111'/%3E%3Crect width='1' height='1' x='3' y='2' fill='%23111'/%3E%3Crect width='1' height='1' x='0' y='3' fill='%23222'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.section>
  );
}
