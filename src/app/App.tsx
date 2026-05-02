import { AboutSection } from '../sections/about/AboutSection';
import { HeroSection } from '../sections/hero/HeroSection';
import { DarkToLightTransition } from '../sections/transition/DarkToLightTransition';
import { WorkExperienceSection } from '../sections/work-experience/WorkExperienceSection';

export default function App() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <DarkToLightTransition />
      <WorkExperienceSection />
    </>
  );
}
