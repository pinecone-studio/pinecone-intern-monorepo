import type { Variants } from 'framer-motion';

export const popupVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

export const imageVariantsLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      delay: 0.3,
    },
  },
};

export const imageVariantsRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      delay: 0.3,
    },
  },
};
