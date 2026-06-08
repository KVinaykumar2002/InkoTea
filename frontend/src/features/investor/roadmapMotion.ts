import type { Variants } from "framer-motion";

export const roadmapRowHoverVariants: Variants = {
  rest: {},
  hover: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const roadmapDotHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.22,
    transition: { type: "spring", stiffness: 380, damping: 22 },
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
