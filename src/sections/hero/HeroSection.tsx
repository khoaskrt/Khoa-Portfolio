import { motion } from 'motion/react';
import khoaLogo from '../../assets/brand/khoa-logo.svg';
import heroPortrait from '../../assets/images/hero-portrait.jpg';
import { heroContent } from './content';
import { containerVariants, itemVariants } from './motion';

export function HeroSection() {
  return (
    <motion.section
      id="hero"
      className="relative min-h-dvh w-full cursor-default overflow-x-hidden font-sans select-none"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
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
        <header className="flex items-center justify-between gap-4 text-[11px] font-light uppercase tracking-[0.16em] sm:text-[12px] sm:tracking-[0.2em] md:text-[13px] md:tracking-[0.24em]">
          <motion.a variants={itemVariants} href="#hero" className="inline-flex items-center whitespace-nowrap">
            <img src={khoaLogo} alt={heroContent.logoAlt} className="h-14 w-auto sm:h-16 md:h-[4.5rem]" />
          </motion.a>

          <motion.nav variants={itemVariants} className="hidden items-center gap-5 sm:flex md:gap-8 lg:gap-10">
            {heroContent.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="opacity-90 transition-colors hover:text-red-400 hover:opacity-100">
                {link.label}
              </a>
            ))}
          </motion.nav>

          <motion.a
            variants={itemVariants}
            href="#contact"
            className="inline-flex min-h-11 items-center justify-center whitespace-nowrap border border-white/45 bg-white/10 px-4 py-2 text-[10px] font-medium tracking-[0.14em] transition-colors hover:border-red-400 hover:text-red-300 sm:px-4 sm:py-2.5 sm:text-[11px] sm:tracking-[0.18em] md:text-[12px]"
          >
            {heroContent.ctaLabel}
          </motion.a>
        </header>

        <main className="flex flex-1 flex-col items-end justify-center py-8 text-right sm:py-10">
          <div className="mr-0 max-w-4xl md:mr-[5%]">
            <motion.h1
              variants={itemVariants}
              className="hero-cement mix-blend-normal text-[clamp(3rem,14vw,9rem)] font-display font-bold leading-[0.82] tracking-tight uppercase md:text-[clamp(4rem,10vw,10rem)]"
            >
              {heroContent.headingPrimary}
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              className="hero-cement hero-cement-soft -mt-[0.6rem] mix-blend-normal text-[clamp(3rem,14vw,9rem)] font-sans font-thin leading-[0.82] tracking-[0.08em] uppercase sm:-mt-[1.2vw] sm:tracking-[0.12em] md:text-[clamp(4rem,10vw,10rem)]"
            >
              {heroContent.headingSecondary}
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="mt-5 flex flex-col items-end justify-end gap-3 text-[10px] font-light tracking-[0.12em] sm:mt-6 sm:gap-4 sm:tracking-[0.2em] md:flex-row md:items-center md:gap-16 md:text-[12px] md:tracking-widest"
            >
              <div className="uppercase opacity-95">{heroContent.subtitleLeft}</div>
              <div className="lowercase italic opacity-85">{heroContent.subtitleMiddle}</div>
              <div className="border-b border-white/30 pb-1 font-medium uppercase">{heroContent.subtitleRight}</div>
            </motion.div>
          </div>
        </main>

        <footer className="w-full">
          <motion.nav
            variants={itemVariants}
            className="flex min-h-11 flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-white/10 pt-5 text-[10px] font-light uppercase tracking-[0.18em] sm:justify-between sm:pt-6 sm:text-[11px] sm:tracking-[0.24em] md:text-[13px] md:tracking-[0.32em]"
          >
            <div className="transition-colors">
              <span className="text-red-500">[</span> {heroContent.footerWords[0]}
            </div>
            <div className="transition-colors">{heroContent.footerWords[1]}</div>
            <div className="hidden opacity-85 md:block">{heroContent.footerWords[2]}</div>
            <div className="hidden opacity-85 md:block">{heroContent.footerWords[3]}</div>
            <div className="transition-colors">
              {heroContent.footerWords[4]} <span className="text-red-500">]</span>
            </div>
          </motion.nav>
        </footer>
      </div>

      <div className="pointer-events-none absolute inset-0 z-50 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] grayscale" />
    </motion.section>
  );
}
