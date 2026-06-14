"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** ms duration */
  duration?: number;
  /** Stretch wrapper to fill grid/flex row height (e.g. equal-height cards). */
  fullHeight?: boolean;
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
  fullHeight = false,
}: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return fullHeight ? (
      <div style={{ height: "100%" }}>{children}</div>
    ) : (
      <>{children}</>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: "easeOut" }}
      style={fullHeight ? { height: "100%" } : undefined}
    >
      {children}
    </motion.div>
  );
}
