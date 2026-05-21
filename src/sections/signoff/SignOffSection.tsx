import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SignOffSection() {
  const footerRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [year, setYear] = useState('2026');

  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setIsRevealed(true);
      return;
    }
    const el = footerRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 68%',
      once: true,
      onEnter: () => setIsRevealed(true),
    });

    return () => st.kill();
  }, [reducedMotion]);

  const handleScrollTop = () => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    try {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  const revealStyle = (delay: number) =>
    reducedMotion
      ? {}
      : {
          opacity: isRevealed ? 1 : 0,
          transform: isRevealed ? 'translateY(0)' : 'translateY(28px)',
          transition: `opacity 900ms var(--ease-expo-out) ${delay}ms, transform 900ms var(--ease-expo-out) ${delay}ms`,
        };

  return (
    <footer
      id="signoff"
      ref={footerRef}
      className="signoff-section relative overflow-hidden font-sans"
      style={{
        background: 'var(--night-base)',
        color: 'var(--frost-text)',
        paddingInline: 'var(--layout-padding)',
        paddingTop: 'clamp(4rem, 9vw, 9rem)',
        paddingBottom: 'clamp(1.75rem, 3vw, 3rem)',
        isolation: 'isolate',
      }}
    >
      {/* Atmospheric vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(120% 80% at 0% 100%, oklch(0.14 0.012 255) 0%, transparent 60%), radial-gradient(120% 80% at 100% 0%, oklch(0.13 0.012 255) 0%, transparent 55%)',
        }}
      />

      {/* Top rule */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-1 h-px"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.18) 12%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.18) 88%, transparent 100%)',
        }}
      />

      {/* Main row */}
      <div
        className="relative z-2 grid items-end"
        style={{
          marginTop: 'clamp(2.5rem, 5vw, 5rem)',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)',
          columnGap: 'clamp(2rem, 6vw, 6rem)',
          minHeight: 'clamp(18rem, 28vw, 28rem)',
        }}
      >
        {/* Wordmark */}
        <div
          className="signoff-mark self-end"
          style={{
            fontSize: 'clamp(5rem, calc(1.56rem + 9.18vw), 17rem)',
          }}
        >
          <div
            className={`signoff-mark-inner flex flex-col font-display font-bold leading-[0.82] tracking-[-0.04em]${isRevealed ? ' is-revealed' : ''}`}
            style={{
              color: 'var(--frost-text)',
              textShadow: '0 1px 0 rgba(255,255,255,0.10), 0 0 24px rgba(255,255,255,0.06), 0 2px 18px rgba(0,0,0,0.55)',
              WebkitTextStroke: '0.4px rgba(255,255,255,0.45)',
            }}
          >
            <span className="block">RYAN</span>
            <span className="block -mt-[0.04em]">
              DO<span className="text-[var(--signal-red)]" style={{ WebkitTextStroke: '0 transparent' }} />
            </span>
          </div>
        </div>

        {/* Cluster: columns + back to top */}
        <div
          className="signoff-cluster grid items-start pb-2"
          style={{
            ...revealStyle(220),
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr)) auto',
            columnGap: 'clamp(1.25rem, 3vw, 3rem)',
          }}
        >
          {/* Credits */}
          <div className="flex flex-col gap-[1.1rem]">
            <span className="font-sans font-light text-[var(--text-meta)] tracking-[0.24em] uppercase text-white/50">
              Credits
            </span>
            <div className="font-sans font-normal text-white/78 tracking-[0.02em] leading-[1.45]" style={{ fontSize: 'var(--text-small)' }}>
              © Ryan Do — {year}
              <span className="mt-[0.45rem] block text-[var(--text-meta)] tracking-[0.2em] uppercase text-white/42">
                All records held by author
              </span>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-[1.1rem]" aria-label="Site menu">
            <span className="font-sans font-light text-[var(--text-meta)] tracking-[0.24em] uppercase text-white/50">
              Menu
            </span>
            <ul className="m-0 flex list-none flex-col gap-[0.55rem] p-0 font-sans font-normal tracking-[0.02em] text-white/88" style={{ fontSize: 'var(--text-small)' }}>
              <li><a href="#about" className="signoff-link relative inline-flex items-baseline gap-[0.4rem] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] hover:text-[var(--signal-red)] focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4">About</a></li>
              <li><a href="#works" className="signoff-link relative inline-flex items-baseline gap-[0.4rem] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] hover:text-[var(--signal-red)] focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4">Work</a></li>
              <li><a href="#credentials" className="signoff-link relative inline-flex items-baseline gap-[0.4rem] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] hover:text-[var(--signal-red)] focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4">Credentials</a></li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-[1.1rem]">
            <span className="font-sans font-light text-[var(--text-meta)] tracking-[0.24em] uppercase text-white/50">
              Contact
            </span>
            <ul className="m-0 flex list-none flex-col gap-[0.55rem] p-0 font-sans font-normal tracking-[0.02em] text-white/88" style={{ fontSize: 'var(--text-small)' }}>
              <li>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="signoff-link relative inline-flex items-baseline gap-[0.4rem] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] hover:text-[var(--signal-red)] focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4">
                  LinkedIn <span className="font-sans font-light text-[var(--text-label)] tracking-[0.18em] text-white/35 -translate-y-[0.15em]" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@ryando.com" className="signoff-link relative inline-flex items-baseline gap-[0.4rem] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] hover:text-[var(--signal-red)] focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4">
                  Email
                </a>
              </li>
              <li>
                <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="signoff-link relative inline-flex items-baseline gap-[0.4rem] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] hover:text-[var(--signal-red)] focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4">
                  Telegram <span className="font-sans font-light text-[var(--text-label)] tracking-[0.18em] text-white/35 -translate-y-[0.15em]" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={handleScrollTop}
            className="signoff-top group flex flex-col items-end gap-[1.1rem] self-start cursor-pointer bg-transparent border-0 p-0 focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4"
            aria-label="Back to top"
          >
            <span className="font-sans font-light text-[var(--text-meta)] tracking-[0.24em] uppercase text-white/55 transition-colors duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] group-hover:text-[var(--signal-red)]">
              Back to top
            </span>
            <span
              className="inline-flex items-center justify-center border border-white/32 bg-white/[0.04] text-[var(--frost-text)] transition-[border-color,color,background-color] duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] group-hover:border-[var(--signal-red)] group-hover:text-[var(--signal-red)] group-hover:bg-[oklch(0.637_0.237_25.3/0.06)] group-focus-visible:border-[var(--signal-red)]"
              style={{ width: 'clamp(2.75rem, 4.5vw, 3.75rem)', height: 'clamp(2.75rem, 4.5vw, 3.75rem)' }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className="w-[42%] h-[42%]">
                <line x1="12" y1="20" x2="12" y2="4" />
                <polyline points="5 11 12 4 19 11" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Bottom rail */}
      <div
        className="relative z-2 mt-[clamp(3rem,6vw,6rem)] flex flex-wrap items-baseline justify-between gap-6 border-t border-white/10 pt-[clamp(1.25rem,2vw,2rem)] font-sans font-light text-[var(--text-meta)] tracking-[0.24em] uppercase text-white/55"
        style={revealStyle(360)}
      >
        <div className="flex flex-wrap gap-[clamp(0.75rem,1.6vw,1.4rem)]">
          <span>BUSINESS</span>
          <span>OPERATION</span>
          <span>FINTECH</span>
          <span>PRODUCT</span>
        </div>
        <span className="text-white/38">v1.0 — {year}</span>
      </div>
    </footer>
  );
}
