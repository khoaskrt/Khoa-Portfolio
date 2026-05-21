import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

type DarkToLightTransitionProps = {
  onRevealReadyChange?: (ready: boolean) => void;
  onProgressChange?: (progress: number) => void;
};

type TransitionPhase = 0 | 1 | 2 | 3;

function resolvePhase(progress: number): TransitionPhase {
  if (progress < 0.14) return 0;
  if (progress < 0.36) return 1;
  if (progress < 0.80) return 2;
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

  // ── Phase 1: Vertical seam draws (0.14–0.36) ──
  const lineScaleY = useTransform(scrollYProgress, [0.14, 0.45], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.12, 0.18, 0.48, 0.60], [0, 0.9, 0.9, 0]);

  // ── Phase 2: Panels part left/right (0.36–0.76) ──
  const leftPanelX = useTransform(scrollYProgress, [0.36, 0.76], ['0vw', '-100vw']);
  const rightPanelX = useTransform(scrollYProgress, [0.36, 0.76], ['0vw', '100vw']);
  const panelShadowOpacity = useTransform(scrollYProgress, [0.36, 0.76], [1, 0]);

  // Horizon line — appears as panels open
  const horizonWidth = useTransform(scrollYProgress, [0.42, 0.68], ['0vw', '100vw']);
  const horizonOpacity = useTransform(scrollYProgress, [0.38, 0.48], [0, 0.6]);

  // Section marker
  const markerOpacity = useTransform(scrollYProgress, [0.52, 0.62, 0.74, 0.82], [0, 0.7, 0.7, 0]);
  const markerY = useTransform(scrollYProgress, [0.52, 0.62], [8, 0]);

  // Bottom bridge gradient
  const bridgeOpacity = useTransform(scrollYProgress, [0.60, 0.90], [0, 1]);

  // Reveal thresholds
  const revealOnThreshold = 0.74;
  const revealOffThreshold = 0.66;
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
      className="relative isolate z-[var(--z-transition)] overflow-hidden [contain:layout_paint]"
      style={{ height: 'clamp(24rem, 100dvh, 160rem)' }}
    >
      {/* Light field — always present behind dark panels */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.95 0.003 255), oklch(0.93 0.005 255))',
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
          background: 'oklch(0.1 0.012 253)',
        }}
      >
        <motion.div
          className="absolute inset-y-0 right-0 w-px"
          style={{
            opacity: prefersReducedMotion ? 0 : panelShadowOpacity,
            boxShadow: '6px 0 28px oklch(0.06 0.01 253 / 0.5), 3px 0 12px oklch(0.06 0.01 253 / 0.3)',
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
          background: 'oklch(0.1 0.012 253)',
        }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 w-px"
          style={{
            opacity: prefersReducedMotion ? 0 : panelShadowOpacity,
            boxShadow: '-6px 0 28px oklch(0.06 0.01 253 / 0.5), -3px 0 12px oklch(0.06 0.01 253 / 0.3)',
          }}
        />
      </motion.div>

      {/* Vertical glowing seam — draws before panels split */}
      <motion.div
        className="absolute left-1/2 top-0 z-[3] h-full w-px -translate-x-1/2 will-change-transform"
        style={{
          scaleY: prefersReducedMotion ? 0 : lineScaleY,
          opacity: prefersReducedMotion ? 0 : lineOpacity,
          transformOrigin: 'center center',
          background: 'oklch(0.94 0.005 255 / 0.85)',
          boxShadow: '0 0 8px oklch(0.94 0.01 255 / 0.5), 0 0 28px oklch(0.94 0.01 255 / 0.2), 0 0 56px oklch(0.94 0.01 255 / 0.08)',
        }}
      />

      {/* Horizon line — structural bridge */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 z-[1] h-px -translate-x-1/2 -translate-y-1/2"
        style={{
          width: prefersReducedMotion ? '100vw' : horizonWidth,
          opacity: prefersReducedMotion ? 0.6 : horizonOpacity,
          background: 'oklch(0.82 0.01 255)',
        }}
      />

      {/* Section index marker */}
      <motion.span
        aria-hidden="true"
        className="absolute left-1/2 z-[1] -translate-x-1/2 select-none font-sans font-light leading-none tracking-[0.2em] uppercase"
        style={{
          top: 'calc(50% + 1.5rem)',
          fontSize: 'var(--text-label)',
          color: 'oklch(0.48 0.01 255)',
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
          background: 'linear-gradient(180deg, oklch(0.93 0.005 255 / 0) 0%, oklch(0.93 0.005 255 / 0.62) 50%, oklch(0.93 0.005 255) 100%)',
          opacity: prefersReducedMotion ? 1 : bridgeOpacity,
        }}
      />
    </section>
  );
}
