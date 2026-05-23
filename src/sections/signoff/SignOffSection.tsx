import { useEffect, useState } from 'react';

export function SignOffSection() {
  const [year, setYear] = useState('2026');
  const emailAddress = 'khoado1205@gmail.com';
  const emailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  const handleScrollTop = () => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    try {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer
      id="contact"
      className="signoff-section relative overflow-hidden font-sans"
      style={{
        background: 'var(--night-base)',
        color: 'var(--frost-text)',
        paddingInline: 'var(--layout-padding)',
        paddingTop: 'clamp(4rem, 9vw, 9rem)',
        paddingBottom: 'clamp(3rem, 6vw, 6rem)',
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
        className="signoff-main-grid relative z-2 grid items-end grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-y-16 lg:gap-y-0"
        style={{
          marginTop: 'clamp(2.5rem, 5vw, 5rem)',
          columnGap: 'clamp(2rem, 6vw, 6rem)',
          minHeight: 'clamp(18rem, 28vw, 28rem)',
        }}
      >
        {/* Wordmark */}
        <div
          className="signoff-mark self-end lg:self-end"
          style={{
            fontSize: 'clamp(3.5rem, 14vw, 17rem)',
          }}
        >
          <div
            className="signoff-mark-inner flex flex-col font-display font-bold leading-[0.82] tracking-[-0.04em] is-revealed"
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
          className="signoff-cluster grid items-start pb-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto] gap-y-12 lg:gap-y-0"
          style={{
            columnGap: 'clamp(1.25rem, 3vw, 3rem)',
          }}
        >
          {/* Credits */}
          <div className="flex flex-col gap-[1.1rem]">
            <span className="font-sans font-light text-[var(--text-meta)] tracking-[0.24em] uppercase text-white">
              Credits
            </span>
            <div className="font-sans font-medium text-white tracking-[0.02em] leading-[1.45]" style={{ fontSize: 'var(--text-small)' }}>
              © Ryan Do — {year}
              <span className="mt-[0.45rem] block text-[var(--text-meta)] tracking-[0.2em] uppercase text-white">
                All records held by author
              </span>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-[1.1rem]" aria-label="Site menu">
            <span className="font-sans font-light text-[var(--text-meta)] tracking-[0.24em] uppercase text-white">
              Menu
            </span>
            <ul className="m-0 flex list-none flex-col gap-[0.55rem] p-0 font-sans font-medium tracking-[0.02em] text-white" style={{ fontSize: 'var(--text-small)' }}>
              <li><a href="#about" className="signoff-link relative inline-flex items-baseline gap-[0.4rem] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] hover:text-[var(--signal-red)] focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4">About</a></li>
              <li><a href="#works" className="signoff-link relative inline-flex items-baseline gap-[0.4rem] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] hover:text-[var(--signal-red)] focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4">Work</a></li>
              <li><a href="#credentials" className="signoff-link relative inline-flex items-baseline gap-[0.4rem] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] hover:text-[var(--signal-red)] focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4">Credentials</a></li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-[1.1rem]">
            <span className="font-sans font-light text-[var(--text-meta)] tracking-[0.24em] uppercase text-white">
              Contact
            </span>
            <ul className="m-0 flex list-none flex-col gap-[0.55rem] p-0 font-sans font-medium tracking-[0.02em] text-white" style={{ fontSize: 'var(--text-small)' }}>
              <li>
                <a href="https://www.linkedin.com/in/khoa-do-blockchain" target="_blank" rel="noopener noreferrer" className="signoff-link relative inline-flex items-baseline gap-[0.4rem] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] hover:text-[var(--signal-red)] focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4">
                  LinkedIn <span className="font-sans font-light text-[var(--text-label)] tracking-[0.18em] text-white -translate-y-[0.15em]" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={emailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Email ${emailAddress}`}
                  className="signoff-link relative inline-flex items-baseline gap-[0.4rem] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] hover:text-[var(--signal-red)] focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4"
                >
                  Email <span className="font-sans font-light text-[var(--text-label)] tracking-[0.18em] text-white -translate-y-[0.15em]" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href="https://t.me/RyanDo1212" target="_blank" rel="noopener noreferrer" className="signoff-link relative inline-flex items-baseline gap-[0.4rem] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] hover:text-[var(--signal-red)] focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4">
                  Telegram <span className="font-sans font-light text-[var(--text-label)] tracking-[0.18em] text-white -translate-y-[0.15em]" aria-hidden="true">↗</span>
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
            <span className="font-sans font-light text-[var(--text-meta)] tracking-[0.24em] uppercase text-white transition-colors duration-[var(--duration-hover)] ease-[var(--ease-quart-out)] group-hover:text-[var(--signal-red)]">
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

    </footer>
  );
}
