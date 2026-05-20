import { useState } from 'react';
import { useReducedMotion } from 'motion/react';

export function useTransitionState() {
  const prefersReducedMotion = useReducedMotion();
  const [loading, setLoading] = useState(!prefersReducedMotion);
  const [workRevealReady, setWorkRevealReady] = useState(!!prefersReducedMotion);
  const [transitionProgress, setTransitionProgress] = useState(prefersReducedMotion ? 1 : 0);

  return {
    loading,
    setLoading,
    workRevealReady,
    setWorkRevealReady,
    transitionProgress,
    setTransitionProgress,
  };
}
