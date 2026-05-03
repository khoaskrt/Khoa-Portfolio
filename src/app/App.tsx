import { useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { AboutSection } from '../sections/about/AboutSection';
import { HeroSection } from '../sections/hero/HeroSection';
import { DarkToLightTransition } from '../sections/transition/DarkToLightTransition';
import { WorkExperienceSection } from '../sections/work-experience/WorkExperienceSection';

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [workRevealReady, setWorkRevealReady] = useState(prefersReducedMotion);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <DarkToLightTransition onRevealReadyChange={setWorkRevealReady} />
      <WorkExperienceSection revealReady={workRevealReady} />
    </>
  );
}
