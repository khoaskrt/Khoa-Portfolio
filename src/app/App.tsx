import { useEffect, useMemo } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor } from '../components/CustomCursor';
import { PreLoader } from '../components/PreLoader';
import { PortfolioHeader } from '../components/PortfolioHeader';
import { AboutSection } from '../sections/about/AboutSection';
import { CredentialsSection } from '../sections/credentials/CredentialsSection';
import { GallerySection } from '../sections/gallery/GallerySection';
import { HeroSection } from '../sections/hero/HeroSection';
import { SignOffSection } from '../sections/signoff/SignOffSection';
import { DarkToLightTransition } from '../sections/transition/DarkToLightTransition';
import { WorkExperienceSection } from '../sections/work-experience/WorkExperienceSection';
import { useTransitionState } from './hooks/useTransitionState';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function LenisScrollTriggerSync() {
  useLenis(() => { ScrollTrigger.update(); });
  return null;
}

export default function App() {
  const {
    loading, setLoading,
    workRevealReady, setWorkRevealReady,
    transitionProgress, setTransitionProgress,
  } = useTransitionState();

  const lenisOptions = useMemo(() => ({
    lerp: prefersReducedMotion ? 1 : 0.08,
    duration: prefersReducedMotion ? 0 : 1.2,
    smoothWheel: !prefersReducedMotion,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
    autoRaf: true,
  }), []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loading]);

  return (
    <ReactLenis root options={lenisOptions}>
      <LenisScrollTriggerSync />
      <a
        href="#about"
        className="skip-nav fixed left-4 z-[200] -translate-y-full rounded-none bg-[var(--night-base)] px-4 py-3 text-[11px] font-light tracking-[0.2em] uppercase text-[var(--frost-text)] opacity-0 transition-[transform,opacity] duration-200 ease-[var(--ease-quart-out)] focus:translate-y-4 focus:opacity-100 focus-visible:outline-1 focus-visible:outline-[var(--signal-red)] focus-visible:outline-offset-2"
      >
        Skip to content
      </a>
      <CustomCursor />
      <PreLoader onComplete={() => setLoading(false)} />
      <PortfolioHeader />
      <main>
        <HeroSection preloaderDone={!loading} />
        <AboutSection transitionProgress={transitionProgress} />
        <DarkToLightTransition onRevealReadyChange={setWorkRevealReady} onProgressChange={setTransitionProgress} />
        <WorkExperienceSection revealReady={workRevealReady} transitionProgress={transitionProgress} />
        <CredentialsSection />
        <GallerySection />
      </main>
      <SignOffSection />
    </ReactLenis>
  );
}
