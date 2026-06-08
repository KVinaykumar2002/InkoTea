import type { Variants } from "framer-motion";

export const ROADMAP_EASE = [0.22, 1, 0.36, 1] as const;

export const roadmapRowVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

export const roadmapDotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 320, damping: 24 },
  },
};

export const roadmapContentVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: ROADMAP_EASE },
  },
};

export const roadmapYearPopupVariants: Variants = {
  hidden: { opacity: 0, scale: 0.35, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 26 },
  },
};
