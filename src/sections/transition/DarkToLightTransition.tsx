import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function DarkToLightTransition() {
  const bandRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const glowDrift = useTransform(scrollYProgress, [0.2, 0.62], ['-1%', '10%']);
  const glowOpacity = useTransform(scrollYProgress, [0.18, 0.38, 0.66], [0.88, 1, 0.82]);

  return (
    <section
      ref={bandRef}
      aria-hidden="true"
      className="relative h-[66vh] min-h-[430px] max-h-[760px] overflow-hidden bg-[oklch(0.1_0.012_253)] sm:h-[70vh] lg:h-[74vh]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(0.1_0.012_253)_0%,oklch(0.12_0.018_252)_17%,oklch(0.2_0.042_251)_36%,oklch(0.43_0.105_247)_60%,oklch(0.72_0.065_245)_82%,oklch(0.92_0.01_255)_100%)]" />

      <motion.div
        className="absolute inset-x-[-20%] top-[-56%] h-[120%] blur-[64px]"
        style={{
          y: prefersReducedMotion ? '0%' : glowDrift,
          opacity: prefersReducedMotion ? 0.88 : glowOpacity,
          background:
            'radial-gradient(78% 100% at 50% 0%, oklch(0.34 0.145 251 / 0.78) 0%, oklch(0.2 0.078 251 / 0.62) 44%, transparent 82%)',
        }}
      />

      <motion.div
        className="absolute inset-x-[-26%] bottom-[-70%] h-[124%] blur-[80px]"
        style={{
          y: prefersReducedMotion ? '0%' : glowDrift,
          opacity: prefersReducedMotion ? 0.78 : glowOpacity,
          background:
            'radial-gradient(62% 100% at 50% 0%, oklch(0.8 0.055 245 / 0.58) 0%, oklch(0.9 0.02 252 / 0.36) 48%, transparent 84%)',
        }}
      />

      <div className="absolute inset-x-0 top-0 h-[20%] bg-[linear-gradient(to_bottom,oklch(0.1_0.012_253/0.95),oklch(0.1_0.012_253/0))]" />
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(to_bottom,oklch(0.92_0.01_255/0),oklch(0.92_0.01_255/0.8),oklch(0.92_0.01_255))]" />
      <div className="absolute bottom-[-4%] left-1/2 h-[34%] w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,oklch(0.95_0.01_255/0),oklch(0.95_0.01_255/0.72),oklch(0.95_0.01_255/0))]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: '180px 180px',
        }}
      />
    </section>
  );
}
