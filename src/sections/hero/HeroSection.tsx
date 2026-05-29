import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { heroContent } from './content';
import { bgVariants, containerVariants, itemVariants } from './motion';

const heroPortrait = '/assets/images/hero-portrait.jpg';

interface HeroSectionProps {
  preloaderDone?: boolean;
}

export function HeroSection({ preloaderDone = true }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!preloaderDone) return;
    requestAnimationFrame(() => {
      setTimeout(() => setIsLoaded(true), 350);
    });
  }, [preloaderDone]);

  return (
    <motion.section
      id="hero"
      className={`hero-section relative min-h-dvh w-full cursor-default overflow-x-hidden font-sans select-none ${isLoaded ? 'is-loaded' : ''}`}
      initial="hidden"
      animate={preloaderDone ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
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

      <div
        className="landing-overlay safe-area-pad relative z-10 flex min-h-dvh w-full flex-col justify-between"
        style={{ paddingInline: 'var(--layout-padding)', paddingBlock: 'clamp(1.5rem, 3vw, 2rem)' }}
      >
        <div style={{ minHeight: 'clamp(2.75rem, 5vw, 4.5rem)' }} aria-hidden="true" />

        <div className="flex flex-1 flex-col items-end justify-center text-right" style={{ paddingBlock: 'clamp(2rem, 4vw, 2.5rem)' }}>
          <div style={{ marginRight: 'clamp(0px, 3vw, 5%)' }}>
            <h1>
              <span
                className="hero-h1-reveal hero-cement hero-cement-soft block font-sans font-thin leading-[0.82] uppercase"
                style={{ fontSize: 'var(--text-hero)', letterSpacing: 'clamp(0.08em, 0.4vw, 0.12em)' }}
              >
                {heroContent.headingPrimary}
              </span>
              <span
                className="hero-h2-reveal hero-cement block font-display font-bold leading-[0.82] tracking-[-0.012em] uppercase"
                style={{ fontSize: 'var(--text-hero)', marginTop: 'clamp(0.5rem, 1vw, 0.75rem)' }}
              >
                {heroContent.headingSecondary}
              </span>
            </h1>

            <motion.div
              variants={itemVariants}
              className="hero-stagger flex items-center justify-end gap-[0.6em] font-light"
              style={{ marginTop: 'clamp(1.25rem, 2.5vw, 1.5rem)', fontSize: 'var(--text-label)', letterSpacing: 'clamp(0.12em, 0.5vw, 0.22em)' }}
            >
              <div className="uppercase">{heroContent.subtitleYear}</div>
              <div className="opacity-38 tracking-[0.05em]">·</div>
              <div className="font-semibold uppercase">{heroContent.subtitleLabel}</div>
            </motion.div>

          </div>
        </div>

        <footer className="w-full">
          <motion.nav
            variants={itemVariants}
            className="hero-stagger hero-footer-nav flex min-h-11 flex-wrap items-center justify-between border-t border-white/10 font-light uppercase"
            style={{ paddingTop: 'clamp(1rem, 2.5vw, 1.5rem)', fontSize: 'var(--text-meta)', letterSpacing: 'clamp(0.10em, 0.4vw, 0.32em)', gap: 'clamp(0.5rem, 1.5vw, 1.25rem) clamp(0.5rem, 1.5vw, 1.25rem)' }}
          >
            {heroContent.footerWords.map((word, i) => (
              <div key={word} className={`whitespace-nowrap ${i >= 2 && i <= 3 ? 'opacity-85 hidden sm:block' : ''}`}>
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
