"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** ms duration */
  duration?: number;
}

/**
 * Lightweight scroll-in animation wrapper. Respects the user's
 * `prefers-reduced-motion` setting and renders children unanimated when set.
 */
export function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
