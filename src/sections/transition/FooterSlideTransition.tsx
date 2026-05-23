import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = { children: ReactNode };

export function FooterSlideTransition({ children }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const panel = panelRef.current;
    if (!wrapper || !panel) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Start panel pushed down by 50% for a parallax reveal effect
    gsap.set(panel, { yPercent: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top bottom', // Start when wrapper top enters bottom of viewport
        end: 'bottom bottom', // End when wrapper bottom reaches bottom of viewport
        scrub: 1, // Smooth scrub
      },
    });

    tl.to(panel, { yPercent: 0, ease: 'none' });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--day-surface)',
      }}
    >
      <div
        ref={panelRef}
        style={{
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
