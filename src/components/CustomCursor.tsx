import { useEffect, useRef } from 'react';

const DOT_SIZE = 8;
const RING_SIZE = 36;
const LERP_FACTOR = 0.11;

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReduced || isTouch) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let visible = false;
    let onDark = false;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      const target = e.target as HTMLElement | null;
      const dark = !!target?.closest('[data-cursor-dark]');
      if (dark !== onDark) {
        onDark = dark;
        dot.style.mixBlendMode = dark ? 'normal' : 'difference';
        dot.style.boxShadow = dark ? '0 0 6px 2px rgba(0,0,0,0.35)' : 'none';
        ring.style.mixBlendMode = dark ? 'normal' : 'difference';
        ring.style.borderColor = dark
          ? 'rgba(255, 255, 255, 0.75)'
          : 'rgba(255, 255, 255, 0.6)';
        ring.style.boxShadow = dark
          ? '0 0 4px 1px rgba(0,0,0,0.25)'
          : 'none';
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const tick = () => {
      dot.style.transform = `translate3d(${mx - DOT_SIZE / 2}px, ${my - DOT_SIZE / 2}px, 0)`;

      rx += (mx - rx) * LERP_FACTOR;
      ry += (my - ry) * LERP_FACTOR;
      ring.style.transform = `translate3d(${rx - RING_SIZE / 2}px, ${ry - RING_SIZE / 2}px, 0)`;

      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
      style.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: RING_SIZE,
          height: RING_SIZE,
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 255, 255, 0.6)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
