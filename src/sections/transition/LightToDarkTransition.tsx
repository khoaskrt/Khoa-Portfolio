import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function LightToDarkTransition() {
  const bandRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ['start 80%', 'end start'],
  });

  // ── Panels slide in from sides to meet in the middle ──
  const leftPanelX = useTransform(scrollYProgress, [0.1, 0.6], ['-100vw', '0vw']);
  const rightPanelX = useTransform(scrollYProgress, [0.1, 0.6], ['100vw', '0vw']);

  // Bottom bridge gradient - fades in as we scroll down to bridge into the dark section
  const bridgeOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  return (
    <section
      ref={bandRef}
      aria-hidden="true"
      className="transition-band relative isolate z-[var(--z-transition)] overflow-hidden [contain:layout_paint]"
      style={{ height: '50vh', background: 'var(--day-surface)' }}
    >
      {/* Light field — always present behind dark panels */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background: 'var(--day-surface)',
        }}
      />

      {/* Left dark panel */}
      <motion.div
        aria-hidden="true"
        className="absolute right-1/2 z-[2] w-[100vw] will-change-transform"
        data-panel="left"
        style={{
          top: 0,
          height: '100%',
          x: prefersReducedMotion ? '0vw' : leftPanelX,
          background: 'var(--night-base)',
        }}
      />

      {/* Right dark panel */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 z-[2] w-[100vw] will-change-transform"
        data-panel="right"
        style={{
          top: 0,
          height: '100%',
          x: prefersReducedMotion ? '0vw' : rightPanelX,
          background: 'var(--night-base)',
        }}
      />

      {/* Bottom bridge to seamlessly connect to the next section */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3]"
        style={{
          height: '10rem',
          background: 'linear-gradient(180deg, oklch(from var(--night-base) l c h / 0) 0%, var(--night-base) 100%)',
          opacity: prefersReducedMotion ? 1 : bridgeOpacity,
        }}
      />
    </section>
  );
}
