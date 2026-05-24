import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function GlitchText({ text }: { text: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('.glitch-char');
    
    tlRef.current = gsap.timeline({ paused: true });
    
    tlRef.current.to(chars, {
      keyframes: [
        { x: () => gsap.utils.random(-4, 4), opacity: () => gsap.utils.random(0.2, 0.8), duration: 0.04 },
        { x: () => gsap.utils.random(-4, 4), opacity: () => gsap.utils.random(0.2, 0.8), duration: 0.04 },
        { x: () => gsap.utils.random(-4, 4), opacity: () => gsap.utils.random(0.2, 0.8), duration: 0.04 },
        { x: () => gsap.utils.random(-4, 4), opacity: () => gsap.utils.random(0.2, 0.8), duration: 0.04 },
        { x: 0, opacity: 1, duration: 0.05 }
      ],
      ease: 'none',
      stagger: {
        amount: 0.15,
        from: 'random'
      }
    });

    const parent = containerRef.current.closest('a') || containerRef.current.parentElement;
    if (!parent) return;

    const handleMouseEnter = () => tlRef.current?.restart();
    const handleMouseLeave = () => {
      gsap.to(chars, {
        x: 0, opacity: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto'
      });
    };

    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      tlRef.current?.kill();
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [text]);

  return (
    <span ref={containerRef} className="inline-flex">
      {text.split('').map((char, i) => (
        <span key={i} className="glitch-char inline-block whitespace-pre">
          {char}
        </span>
      ))}
    </span>
  );
}
