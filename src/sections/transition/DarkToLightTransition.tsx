import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import './styles.css';

type DarkToLightTransitionProps = {
  onRevealReadyChange?: (ready: boolean) => void;
  onProgressChange?: (progress: number) => void;
};

type TransitionPhase = 0 | 1 | 2 | 3;

function resolvePhase(progress: number): TransitionPhase {
  if (progress < 0.10) return 0;
  if (progress < 0.34) return 1;
  if (progress < 0.72) return 2;
  return 3;
}

export function DarkToLightTransition({ onRevealReadyChange, onProgressChange }: DarkToLightTransitionProps) {
  const bandRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const lastProgressRef = useRef(-1);
  const [phase, setPhase] = useState<TransitionPhase>(prefersReducedMotion ? 3 : 0);

  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ['start 92%', 'end -12%'],
  });

  // ── Phase 0: Dark hold (0–0.14) ──
  // Viewport is 100% dark, nothing moves

  // ── Phase 1: Vertical seam draws (0.10–0.30) ──
  const lineScaleY = useTransform(scrollYProgress, [0.10, 0.30], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.08, 0.14, 0.42, 0.52], [0, 0.9, 0.9, 0]);

  // ── Phase 2: Panels part left/right (0.34–0.68) ──
  const leftPanelX = useTransform(scrollYProgress, [0.34, 0.68], ['0vw', '-100vw']);
  const rightPanelX = useTransform(scrollYProgress, [0.34, 0.68], ['0vw', '100vw']);
  const panelShadowOpacity = useTransform(scrollYProgress, [0.34, 0.68], [1, 0]);

  // Horizon line — appears as panels open
  const horizonWidth = useTransform(scrollYProgress, [0.40, 0.62], ['0vw', '100vw']);
  const horizonOpacity = useTransform(scrollYProgress, [0.36, 0.44], [0, 0.6]);

  // Section marker
  const markerOpacity = useTransform(scrollYProgress, [0.50, 0.58], [0, 0.8]);
  const markerY = useTransform(scrollYProgress, [0.50, 0.58], [8, 0]);

  // Bottom bridge gradient
  const bridgeOpacity = useTransform(scrollYProgress, [0.56, 0.82], [0, 1]);

  // Reveal thresholds
  const revealOnThreshold = 0.68;
  const revealOffThreshold = 0.60;
  const revealStateRef = useRef(false);

  useEffect(() => {
    if (!prefersReducedMotion) return;
    setPhase(3);
    if (onProgressChange) {
      lastProgressRef.current = 1;
      onProgressChange(1);
    }
    if (onRevealReadyChange) {
      revealStateRef.current = true;
      onRevealReadyChange(true);
    }
  }, [onProgressChange, onRevealReadyChange, prefersReducedMotion]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (prefersReducedMotion) return;

    const nextPhase = resolvePhase(latest);
    setPhase((currentPhase) => (currentPhase === nextPhase ? currentPhase : nextPhase));

    if (onProgressChange) {
      const quantizedProgress = Math.round(latest * 50) / 50;
      if (quantizedProgress !== lastProgressRef.current) {
        lastProgressRef.current = quantizedProgress;
        onProgressChange(quantizedProgress);
      }
    }

    if (!onRevealReadyChange) return;

    const isRevealed = revealStateRef.current;
    const nextReveal = isRevealed ? latest > revealOffThreshold : latest >= revealOnThreshold;

    if (nextReveal !== isRevealed) {
      revealStateRef.current = nextReveal;
      onRevealReadyChange(nextReveal);
    }
  });

  return (
    <section
      ref={bandRef}
      aria-hidden="true"
      data-phase={`phase-${phase}`}
      className="transition-band relative isolate z-[var(--z-transition)] overflow-hidden [contain:layout_paint]"
    >
      {/* Light field — always present behind dark panels */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, var(--day-surface-warm), var(--day-surface))',
        }}
      />

      {/* Left dark panel */}
      <motion.div
        aria-hidden="true"
        className="absolute right-1/2 z-[2] w-[100vw] will-change-transform"
        data-panel="left"
        style={{
          top: '-50%',
          height: '200%',
          x: prefersReducedMotion ? '-100vw' : leftPanelX,
          background: 'var(--night-base)',
        }}
      >
        <motion.div
          className="transition-panel-edge absolute inset-y-0 right-0 w-px"
          style={{
            opacity: prefersReducedMotion ? 0 : panelShadowOpacity,
          }}
        />
      </motion.div>

      {/* Right dark panel */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 z-[2] w-[100vw] will-change-transform"
        data-panel="right"
        style={{
          top: '-50%',
          height: '200%',
          x: prefersReducedMotion ? '100vw' : rightPanelX,
          background: 'var(--night-base)',
        }}
      >
        <motion.div
          className="transition-panel-edge absolute inset-y-0 left-0 w-px"
          data-side="right"
          style={{
            opacity: prefersReducedMotion ? 0 : panelShadowOpacity,
          }}
        />
      </motion.div>

      {/* Vertical glowing seam — draws before panels split */}
      <motion.div
        className="transition-seam absolute left-1/2 top-0 z-[3] h-full w-px -translate-x-1/2 will-change-transform"
        style={{
          scaleY: prefersReducedMotion ? 0 : lineScaleY,
          opacity: prefersReducedMotion ? 0 : lineOpacity,
          transformOrigin: 'center center',
          background: 'oklch(from var(--mist-line) l c h / 0.85)',
        }}
      />

      {/* Horizon line — structural bridge */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 z-[1] h-px -translate-x-1/2 -translate-y-1/2"
        style={{
          width: prefersReducedMotion ? '100vw' : horizonWidth,
          opacity: prefersReducedMotion ? 0.6 : horizonOpacity,
          background: 'var(--border-day)',
        }}
      />

      {/* Section index marker */}
      <motion.span
        aria-hidden="true"
        className="absolute left-1/2 z-[1] -translate-x-1/2 select-none font-sans font-light leading-none tracking-[0.2em] uppercase"
        style={{
          top: 'calc(50% + 1.5rem)',
          fontSize: 'var(--text-label)',
          color: 'var(--day-faint)',
          opacity: prefersReducedMotion ? 0 : markerOpacity,
          y: prefersReducedMotion ? 0 : markerY,
        }}
      >
        02
      </motion.span>

      {/* Bottom bridge gradient */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]"
        style={{
          height: 'clamp(5rem, 10vh, 8rem)',
          background: 'linear-gradient(180deg, oklch(from var(--day-surface) l c h / 0) 0%, oklch(from var(--day-surface) l c h / 0.62) 50%, var(--day-surface) 100%)',
          opacity: prefersReducedMotion ? 1 : bridgeOpacity,
        }}
      />
    </section>
  );
}
