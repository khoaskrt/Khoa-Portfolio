import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

type DarkToLightTransitionProps = {
  onRevealReadyChange?: (ready: boolean) => void;
};

export function DarkToLightTransition({ onRevealReadyChange }: DarkToLightTransitionProps) {
  const bandRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ['start 94%', 'end 2%'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0.04, 0.5], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.5, 0.64], [0.9, 0.84, 0]);
  const panelStart = 0.3;
  const panelEnd = 0.86;
  const panelScaleX = useTransform(scrollYProgress, [panelStart, panelEnd], [0, 2.1]);
  const revealOnThreshold = 0.93;
  const revealOffThreshold = 0.86;
  const revealStateRef = useRef(false);

  useEffect(() => {
    if (!onRevealReadyChange) return;
    if (!prefersReducedMotion) return;
    revealStateRef.current = true;
    onRevealReadyChange(true);
  }, [onRevealReadyChange, prefersReducedMotion]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!onRevealReadyChange) return;
    if (prefersReducedMotion) {
      return;
    }

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
      className="relative h-[clamp(24rem,65dvh,38.4rem)] min-h-[384px] max-h-[614px] overflow-hidden bg-[oklch(0.1_0.012_253)] sm:h-[clamp(28.8rem,74dvh,46.8rem)] sm:min-h-[461px] sm:max-h-[749px] lg:h-[clamp(36rem,84dvh,62.4rem)] lg:min-h-[576px] lg:max-h-[998px]"
    >
      <motion.div
        className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[oklch(0.94_0.01_255)]"
        style={{
          scaleY: prefersReducedMotion ? 1 : lineScaleY,
          opacity: prefersReducedMotion ? 0 : lineOpacity,
          transformOrigin: 'center top',
        }}
      />

      <motion.div
        className="absolute inset-y-0 left-1/2 w-[220vw] -translate-x-1/2 bg-[oklch(0.93_0.005_255)]"
        style={{
          scaleX: prefersReducedMotion ? 1 : panelScaleX,
          opacity: 1,
          transformOrigin: 'center center',
        }}
      />
    </section>
  );
}
