import type { Variants } from "framer-motion";

export const JOURNEY_EASE = [0.22, 1, 0.36, 1] as const;

/** One timeline row — staggers glyph then card. */
export const journeyRowVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

export const journeyGlyphVariants: Variants = {
  hidden: { scale: 0.55, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.55, ease: JOURNEY_EASE },
  },
};

export const journeyCardVariants: Variants = {
  hidden: (enterX: number) => ({
    opacity: 0,
    x: enterX,
    y: 18,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.65,
      ease: JOURNEY_EASE,
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

export const journeyStampVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 22,
      delay: 0.12,
    },
  },
};
