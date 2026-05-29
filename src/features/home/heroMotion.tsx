"use client";

import { useEffect, useState, type ReactNode } from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import { animate, motion } from "framer-motion";
import { fontDisplayItalicSx } from "@/theme/fonts";

/**
 * Cinematic ease-out quartic — the "luxury" Bézier curve favoured by Linear,
 * Vercel and Apple. Lands softly, no overshoot, no bounce.
 */
export const EASE_OUT_QUART: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Shared timing tokens so every entry stays in lockstep. */
export const HERO_TIMING = {
  /** Time the outer section spends fading + scaling in (seconds). */
  heroEntry: 1.0,
  chip: 0.3,
  line1: 0.5,
  line2: 0.8,
  shimmer: 1.9,
  subhead: 1.15,
  ctas: 1.4,
  metricsBase: 1.65,
  /** Delay added per metric card on top of `metricsBase`. */
  metricsStagger: 0.12,
  counter: 1.95,
  scroll: 2.8,
} as const;

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  reduced?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * One-shot fade + slide-up entrance for a block-level element.
 * Uses transform + opacity only — fully GPU-friendly, zero layout shift.
 */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  y = 20,
  reduced,
  sx,
}: FadeUpProps) {
  return (
    <Box
      component={motion.div}
      initial={reduced ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: reduced ? 0 : delay,
        duration: reduced ? 0 : duration,
        ease: EASE_OUT_QUART,
      }}
      sx={sx}
    >
      {children}
    </Box>
  );
}

interface LineRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  reduced?: boolean;
}

/**
 * Mask-reveal — wraps a line of text in an `overflow: hidden` window and
 * slides the line up from below. Cinematic because the line stays whole;
 * you just see it rise into the frame.
 */
export function LineReveal({ children, delay = 0, duration = 0.9, reduced }: LineRevealProps) {
  return (
    <Box sx={{ display: "block", overflow: "hidden", pb: "0.08em" }}>
      <Box
        component={motion.span}
        initial={reduced ? false : { y: "110%" }}
        animate={{ y: "0%" }}
        transition={{
          delay: reduced ? 0 : delay,
          duration: reduced ? 0 : duration,
          ease: EASE_OUT_QUART,
        }}
        sx={{ display: "inline-block", willChange: "transform" }}
      >
        {children}
      </Box>
    </Box>
  );
}

interface BlurRevealProps extends LineRevealProps {
  /** Initial blur amount in pixels. */
  blur?: number;
}

/**
 * Like {@link LineReveal} but also crossfades the text from blurred to
 * sharp — gives the italic accent line a tactile, almost film-camera focus
 * pull. Kept short-lived (≤1s) so the GPU cost stays trivial.
 */
export function BlurReveal({
  children,
  delay = 0,
  duration = 1.0,
  blur = 10,
  reduced,
}: BlurRevealProps) {
  return (
    <Box sx={{ display: "block", overflow: "hidden", pb: "0.12em" }}>
      <Box
        component={motion.span}
        initial={reduced ? false : { y: "110%", opacity: 0, filter: `blur(${blur}px)` }}
        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        transition={{
          delay: reduced ? 0 : delay,
          duration: reduced ? 0 : duration,
          ease: EASE_OUT_QUART,
        }}
        sx={{ display: "inline-block", willChange: "transform, filter, opacity" }}
      >
        {children}
      </Box>
    </Box>
  );
}

interface ShimmerSpanProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  reduced?: boolean;
}

/**
 * Gold gradient shimmer — sweeps a single bright highlight across the text
 * once. The "matte" ends of the gradient match `secondary.light` so the
 * final resting colour blends seamlessly with the rest of the brand copy.
 */
export function ShimmerSpan({ children, delay = 0, duration = 2.2, reduced }: ShimmerSpanProps) {
  if (reduced) {
    return (
      <Box
        component="span"
        sx={{
          display: "inline-block",
          color: "secondary.light",
          ...fontDisplayItalicSx,
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component={motion.span}
      initial={{ backgroundPositionX: "200%" }}
      animate={{ backgroundPositionX: "-100%" }}
      transition={{ delay, duration, ease: "easeInOut" }}
      sx={{
        display: "inline-block",
        ...fontDisplayItalicSx,
        backgroundImage:
          "linear-gradient(110deg, #E6C19A 0%, #E6C19A 42%, #FFF6DA 50%, #E6C19A 58%, #E6C19A 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        willChange: "background-position",
      }}
    >
      {children}
    </Box>
  );
}

interface NumberCounterProps {
  target: number;
  delay?: number;
  duration?: number;
  suffix?: string;
  reduced?: boolean;
}

/**
 * Number ticker — counts from 0 → `target` once on mount using
 * framer-motion's RAF-driven `animate()` runner. Snaps to the target when
 * motion is reduced so the user never sees a stale `0`.
 */
export function NumberCounter({
  target,
  delay = 0,
  duration = 1.5,
  suffix = "",
  reduced,
}: NumberCounterProps) {
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      delay,
      ease: EASE_OUT_QUART,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [target, delay, duration, reduced]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}
