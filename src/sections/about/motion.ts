import { duration, ease } from '../../motion/easing';

export const aboutContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.entrance,
      ease: ease.expoOut,
      staggerChildren: 0.1,
    },
  },
};

export const aboutItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.reveal,
      ease: ease.expoOut,
    },
  },
};
