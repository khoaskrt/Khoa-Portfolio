import { useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { AboutSection } from '../sections/about/AboutSection';
import { HeroSection } from '../sections/hero/HeroSection';
import { DarkToLightTransition } from '../sections/transition/DarkToLightTransition';
import { WorkExperienceSection } from '../sections/work-experience/WorkExperienceSection';

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [workRevealReady, setWorkRevealReady] = useState(prefersReducedMotion);
  const [transitionProgress, setTransitionProgress] = useState(prefersReducedMotion ? 1 : 0);

  return (
    <>
      <HeroSection />
      <AboutSection transitionProgress={transitionProgress} />
      <DarkToLightTransition onRevealReadyChange={setWorkRevealReady} onProgressChange={setTransitionProgress} />
      <WorkExperienceSection revealReady={workRevealReady} transitionProgress={transitionProgress} />
    </>
  );
}
