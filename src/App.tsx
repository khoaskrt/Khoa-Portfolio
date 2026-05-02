/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function App() {
  return (
    <motion.div
      className="relative min-h-dvh w-full overflow-x-hidden font-sans cursor-default select-none"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Image with Desaturation */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src="/Gemini_Generated_Image_p0tc5xp0tc5xp0tc.png"
          alt="Professional portrait"
          className="h-full w-full object-cover grayscale brightness-75 contrast-110"
        />
        {/* VIGNETTE OVERLAY */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%]" />
      </motion.div>

      {/* CONTENT OVERLAY */}
      <div className="landing-overlay relative z-10 min-h-dvh w-full flex flex-col justify-between px-4 py-6 sm:px-6 md:px-12 md:py-8 safe-area-pad">
        
        {/* TOP BAR */}
        <header className="flex justify-between items-start text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.14em] sm:tracking-[0.18em] md:tracking-[0.2em] font-light uppercase gap-3">
          <motion.div variants={itemVariants} className="flex gap-2">
            <span className="text-red-500">[</span> LANDING PAGE DESIGN <span className="text-red-500">]</span>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center hidden md:block">
            <span className="opacity-90">[ services ]</span>
            <br />
            IDENTITY DESIGN
            <br />
            DEVELOPMENT
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="w-2 h-2 bg-red-600 block shadow-[0_0_10px_rgba(220,38,38,0.5)]"></span>
            2025
          </motion.div>
        </header>

        {/* MAIN TYPOGRAPHY */}
        <main className="flex-1 flex flex-col justify-center items-end text-right py-8 sm:py-10">
          <div className="max-w-4xl mr-0 md:mr-[5%]">
            <motion.h1 
              variants={itemVariants}
              className="hero-cement mix-blend-normal text-[clamp(3rem,14vw,9rem)] md:text-[clamp(4rem,10vw,10rem)] font-display font-bold leading-[0.82] tracking-tight uppercase"
            >
              BUSINESS &
            </motion.h1>
            <motion.h2 
              variants={itemVariants}
              className="hero-cement hero-cement-soft mix-blend-normal text-[clamp(3rem,14vw,9rem)] md:text-[clamp(4rem,10vw,10rem)] font-sans font-thin leading-[0.82] tracking-[0.08em] sm:tracking-[0.12em] uppercase -mt-[0.6rem] sm:-mt-[1.2vw]"
            >
              OPERATION
            </motion.h2>
            
            <motion.div 
              variants={itemVariants}
              className="mt-5 sm:mt-6 flex flex-col md:flex-row justify-end items-end md:items-center gap-3 sm:gap-4 md:gap-16 text-[10px] md:text-[12px] tracking-[0.12em] sm:tracking-[0.2em] md:tracking-widest font-light"
            >
              <div className="uppercase opacity-95">Training Course</div>
              <div className="lowercase italic opacity-85">by</div>
              <div className="uppercase font-medium border-b border-white/30 pb-1">Tetiana Voitsekhovska</div>
            </motion.div>
          </div>
        </main>

        {/* FOOTER NAVIGATION */}
        <footer className="w-full">
          <motion.nav
            variants={itemVariants}
            className="flex flex-wrap justify-center sm:justify-between items-center gap-x-5 gap-y-3 text-[10px] sm:text-[11px] md:text-[13px] tracking-[0.18em] sm:tracking-[0.24em] md:tracking-[0.32em] font-light uppercase border-t border-white/10 pt-5 sm:pt-6"
          >
            <div className="hover:text-red-400 transition-colors cursor-pointer">
              <span className="text-red-500">[</span> CHANGES
            </div>
            <div className="hover:text-red-400 transition-colors cursor-pointer">BEGIN</div>
            <div className="hidden md:block opacity-85">WITH</div>
            <div className="hidden md:block opacity-85">A</div>
            <div className="hover:text-red-400 transition-colors cursor-pointer">
              DECISION <span className="text-red-500">]</span>
            </div>
          </motion.nav>
        </footer>
      </div>

      {/* TEXTURE OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] grayscale bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </motion.div>
  );
}
