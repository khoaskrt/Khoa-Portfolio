import { duration, ease } from '../../motion/easing';

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.expoOut },
  },
};

export const bgVariants = {
  hidden: { scale: 1.06, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.6, ease: ease.quintOut },
  },
};
