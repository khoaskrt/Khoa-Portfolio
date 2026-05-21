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

    gsap.set(panel, { yPercent: 100 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      },
    });

    tl.to(panel, { yPercent: 0, ease: 'none' });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <div ref={wrapperRef} style={{ height: isMobile ? '150vh' : '200vh' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'var(--day-surface)',
        }}
      >
        <div
          ref={panelRef}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            willChange: 'transform',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
