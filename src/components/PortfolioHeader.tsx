import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import khoaLogo from '../assets/brand/khoa-logo.svg';
import { headerContent } from './header-content';
import { GlitchText } from './GlitchText';

export function PortfolioHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setDrawerOpen(false);
      lenis?.scrollTo(href, { offset: 0, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  };

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
      }
    );

    const sectionIds = headerContent.navLinks.map(link => link.href.substring(1));
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
            {headerContent.navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`hero-nav-link relative pb-[0.22rem] transition-all duration-300 ease-[var(--ease-quart-out)] ${
                    isActive ? 'text-[var(--signal-red)] opacity-100' : 'opacity-90 hover:text-[var(--signal-red-hover)] hover:opacity-100'
                  }`}
                >
                  <GlitchText text={link.label} />
                  <span 
                    className={`absolute -bottom-[2px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[var(--signal-red)] transition-all duration-300 ease-[var(--ease-quart-out)] ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`} 
                  />
                </a>
              );
            })}
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
            {headerContent.navLinks.map((link, i) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block font-display text-[clamp(2rem,calc(0.56rem+3.84vw),3.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.02em] transition-colors duration-300 ease-[var(--ease-quart-out)] focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-4 ${
                    isActive ? 'text-[var(--signal-red)]' : 'text-[var(--frost-text)] hover:text-[var(--signal-red)]'
                  }`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={
                    reducedMotion
                      ? {}
                      : {
                          opacity: 0,
                          animation: `drawer-link-in 500ms cubic-bezier(0.16, 1, 0.3, 1) ${120 + i * 80}ms forwards`,
                        }
                  }
                >
                  <GlitchText text={link.label} />
                </a>
              );
            })}
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
