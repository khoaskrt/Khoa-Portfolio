import { useCallback, useEffect, useRef, useState } from 'react';
import khoaLogo from '../assets/brand/khoa-logo.svg';
import { headerContent } from './header-content';

export function PortfolioHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDrawer();
        return;
      }
      if (e.key !== 'Tab') return;

      const drawer = drawerRef.current;
      if (!drawer) return;
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    const drawer = drawerRef.current;
    const firstLink = drawer?.querySelector<HTMLElement>('a[href]');
    requestAnimationFrame(() => firstLink?.focus());

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [drawerOpen, closeDrawer]);

  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  return (
    <>
      <header
        className="absolute inset-x-0 top-0 z-[60] px-4 py-4 sm:px-6 md:px-12 md:py-6"
      >
        <div className="safe-area-pad flex items-center justify-between gap-4 text-[var(--text-meta)] font-light uppercase tracking-[0.16em] sm:tracking-[0.2em] md:tracking-[0.24em]">
          <a href="#hero" className="inline-flex items-center whitespace-nowrap">
            <img
              src={khoaLogo}
              alt={headerContent.logoAlt}
              className="h-14 w-auto invert sm:h-16 md:h-[4.5rem]"
            />
          </a>

          {/* Hamburger trigger -- mobile only */}
          <button
            ref={triggerRef}
            type="button"
            className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-[5px] text-[var(--frost-text)] sm:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
          >
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
          </button>

          <nav className="hero-nav hidden items-center gap-5 text-[var(--text-meta)] sm:flex md:gap-8 lg:gap-10">
            {headerContent.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hero-nav-link relative pb-[0.22rem] opacity-90 transition-[color,opacity] duration-200 ease-[var(--ease-quart-out)] hover:text-[var(--signal-red-hover)] hover:opacity-100"
              >
                {link.label}
              </a>
            ))}
          </nav>


        </div>
      </header>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          ref={drawerRef}
          className="fixed inset-0 z-[130] flex flex-col sm:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            background: 'var(--night-base)',
            opacity: reducedMotion ? 1 : undefined,
            animation: reducedMotion ? 'none' : 'drawer-fade-in 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-4 py-4">
            <a
              href="#hero"
              className="inline-flex items-center"
              onClick={closeDrawer}
            >
              <img
                src={khoaLogo}
                alt={headerContent.logoAlt}
                className="h-14 w-auto invert"
              />
            </a>
            <button
              type="button"
              className="flex min-h-11 min-w-11 items-center justify-center text-[var(--frost-text)]"
              onClick={closeDrawer}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true" className="h-5 w-5">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          {/* Drawer links */}
          <nav className="flex flex-1 flex-col items-start justify-center gap-6 overflow-y-auto px-8 py-4" aria-label="Main menu">
            {headerContent.navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="block font-display text-[clamp(2rem,calc(0.56rem+3.84vw),3.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.02em] text-[var(--frost-text)] transition-colors duration-200 ease-[var(--ease-quart-out)] hover:text-[var(--signal-red)] focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4"
                onClick={closeDrawer}
                style={
                  reducedMotion
                    ? {}
                    : {
                        opacity: 0,
                        animation: `drawer-link-in 500ms cubic-bezier(0.16, 1, 0.3, 1) ${120 + i * 80}ms forwards`,
                      }
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Drawer footer */}
          <div className="safe-area-pad px-8 pb-6 text-[var(--text-meta)] font-light uppercase tracking-[0.2em] text-white">
            {headerContent.subtitleYear} {headerContent.subtitleLabel}
          </div>
        </div>
      )}
    </>
  );
}
