import { useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { AboutSection } from '../sections/about/AboutSection';
import { CredentialsSection } from '../sections/credentials/CredentialsSection';
import { GallerySection } from '../sections/gallery/GallerySection';
import { HeroSection } from '../sections/hero/HeroSection';
import { PortfolioHeader } from '../sections/hero/PortfolioHeader';
import { SignOffSection } from '../sections/signoff/SignOffSection';
import { DarkToLightTransition } from '../sections/transition/DarkToLightTransition';
import { WorkExperienceSection } from '../sections/work-experience/WorkExperienceSection';

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [workRevealReady, setWorkRevealReady] = useState(prefersReducedMotion);
  const [transitionProgress, setTransitionProgress] = useState(prefersReducedMotion ? 1 : 0);

  return (
    <>
      <PortfolioHeader />
      <HeroSection />
      <AboutSection transitionProgress={transitionProgress} />
      <DarkToLightTransition onRevealReadyChange={setWorkRevealReady} onProgressChange={setTransitionProgress} />
      <WorkExperienceSection revealReady={workRevealReady} transitionProgress={transitionProgress} />
      <CredentialsSection />
      <GallerySection />
      <SignOffSection />
    </>
  );
}
