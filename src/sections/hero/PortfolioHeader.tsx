import { useEffect, useState } from 'react';
import khoaLogo from '../../assets/brand/khoa-logo.svg';
import { heroContent } from './content';

const LIGHT_SECTION_IDS = ['works', 'credentials', 'gallery'] as const;

export function PortfolioHeader() {
  const [isOnLightSection, setIsOnLightSection] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateHeaderTheme = () => {
      frame = 0;

      const header = document.querySelector('[data-header-theme]') as HTMLElement | null;
      if (!header) return;

      const headerBottom = Math.max(0, Math.floor(header.getBoundingClientRect().bottom));
      const probeY = Math.min(window.innerHeight - 1, headerBottom + 1);
      const probeXs = [0.2, 0.5, 0.8].map((ratio) => Math.floor(window.innerWidth * ratio));

      const shouldUseDarkInk = probeXs.some((probeX) => {
        const element = document.elementFromPoint(probeX, probeY);
        if (!(element instanceof HTMLElement)) return false;

        return LIGHT_SECTION_IDS.some((id) => element.closest(`#${id}`));
      });

      setIsOnLightSection(shouldUseDarkInk);
    };

    const requestThemeUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHeaderTheme);
    };

    requestThemeUpdate();

    window.addEventListener('scroll', requestThemeUpdate, { passive: true });
    window.addEventListener('resize', requestThemeUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', requestThemeUpdate);
      window.removeEventListener('resize', requestThemeUpdate);
    };
  }, []);

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-[120] px-4 py-4 sm:px-6 md:px-12 md:py-6"
      data-header-theme={isOnLightSection ? 'light' : 'dark'}
    >
      <div className="safe-area-pad flex items-center justify-between gap-4 text-[var(--text-meta)] font-light uppercase tracking-[0.16em] sm:tracking-[0.2em] md:tracking-[0.24em]">
        <a href="#hero" className="pointer-events-auto inline-flex items-center whitespace-nowrap">
          <img
            src={khoaLogo}
            alt={heroContent.logoAlt}
            className={`h-14 w-auto transition-[filter] duration-300 ease-[var(--ease-quart-out)] sm:h-16 md:h-[4.5rem] ${isOnLightSection ? '' : 'invert'}`}
          />
        </a>

        <nav className={`pointer-events-auto hero-nav hidden items-center gap-5 transition-colors duration-300 ease-[var(--ease-quart-out)] sm:flex md:gap-8 lg:gap-10 ${isOnLightSection ? 'text-[oklch(0.12_0.01_255)]' : 'text-[var(--text-meta)]'}`}>
          {heroContent.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`hero-nav-link relative pb-[0.22rem] opacity-90 transition-[color,opacity] duration-200 ease-[var(--ease-quart-out)] hover:opacity-100 ${isOnLightSection ? 'hover:text-[var(--signal-red)]' : 'hover:text-[#f87171]'}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className={`pointer-events-auto hero-cta inline-flex min-h-11 items-center justify-center whitespace-nowrap border px-4 py-2 text-[10px] font-medium tracking-[0.14em] transition-colors duration-300 ease-[var(--ease-quart-out)] sm:px-4 sm:py-2.5 sm:text-[11px] sm:tracking-[0.18em] md:text-[12px] ${
            isOnLightSection
              ? 'border-black/25 bg-black/[0.03] text-[oklch(0.12_0.01_255)]'
              : 'border-white/45 bg-white/10 text-[var(--frost-text)]'
          }`}
        >
          {heroContent.ctaLabel}
        </a>
      </div>
    </header>
  );
}
