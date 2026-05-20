import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

type DarkToLightTransitionProps = {
  onRevealReadyChange?: (ready: boolean) => void;
  onProgressChange?: (progress: number) => void;
};

type TransitionPhase = 0 | 1 | 2 | 3;

function resolvePhase(progress: number): TransitionPhase {
  if (progress < 0.18) return 0;
  if (progress < 0.62) return 1;
  if (progress < 0.86) return 2;
  return 3;
}

export function DarkToLightTransition({ onRevealReadyChange, onProgressChange }: DarkToLightTransitionProps) {
  const bandRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const lastProgressRef = useRef(-1);
  const [phase, setPhase] = useState<TransitionPhase>(prefersReducedMotion ? 3 : 0);

  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ['start 94%', 'end -8%'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0.04, 0.22], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.14, 0.22, 0.58, 0.82], [0, 0.34, 0.86, 0.42, 0]);
  const panelStart = 0.16;
  const panelEnd = 0.64;
  const panelScaleX = useTransform(scrollYProgress, [panelStart, panelEnd], [0, 1.45]);
  const bridgeOpacity = useTransform(scrollYProgress, [0.46, 0.84], [0.14, 0.92]);
  const darkFadeOpacity = useTransform(scrollYProgress, [0.46, 0.84], [0.82, 0]);
  const revealOnThreshold = 0.8;
  const revealOffThreshold = 0.72;
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
      className="relative isolate z-[var(--z-transition)] overflow-hidden bg-[oklch(0.1_0.012_253)] [contain:layout_paint]"
      style={{ height: 'clamp(15rem, 52dvh, 38rem)', minHeight: 'clamp(240px, 30vw, 384px)', maxHeight: 'clamp(352px, 48vw, 608px)' }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[oklch(0.09_0.012_253/0.32)] via-[oklch(0.12_0.012_253/0.06)] to-[oklch(0.1_0.012_253/0)]"
        style={{ opacity: prefersReducedMotion ? 0 : darkFadeOpacity }}
      />

      <motion.div
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--transition-line-color)] will-change-transform"
        style={{
          scaleY: prefersReducedMotion ? 1 : lineScaleY,
          opacity: prefersReducedMotion ? 0 : lineOpacity,
          transformOrigin: 'center top',
          boxShadow: 'var(--transition-line-glow)',
        }}
      />

      <motion.div
        className="absolute inset-y-0 left-1/2 w-[150vw] -translate-x-1/2 bg-[oklch(0.93_0.005_255)] will-change-transform"
        style={{
          scaleX: prefersReducedMotion ? 1 : panelScaleX,
          opacity: 1,
          transformOrigin: 'center center',
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[oklch(0.91_0.006_255/0)] via-[oklch(0.92_0.006_255/0.28)] to-[oklch(0.93_0.005_255/0.66)]"
        style={{ opacity: prefersReducedMotion ? 1 : bridgeOpacity }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-[oklch(0.93_0.005_255/0)] via-[oklch(0.93_0.005_255/0.62)] to-[oklch(0.93_0.005_255)]"
        style={{ height: 'clamp(4rem, 9vh, 7.5rem)' }}
      />
    </section>
  );
}
