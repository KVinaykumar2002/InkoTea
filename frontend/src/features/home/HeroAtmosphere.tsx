"use client";

import Box from "@mui/material/Box";
import { motion, useTransform, type MotionValue } from "framer-motion";

interface HeroAtmosphereProps {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduced: boolean;
}

/**
 * Hero atmospheric overlays — steam wisps rising from the chai glass area
 * and a handful of tea leaves drifting around the frame.
 *
 * Two parallax planes:
 *   - Leaves move ±20px (they feel "close to camera").
 *   - Steam moves ±10px (sits over the glass mid-plane).
 *
 * Steam is built from blurred radial gradient blobs that:
 *   - Rise from ~55% to ~0% of the hero's height.
 *   - Sway left/right with a sine-like x keyframe sequence.
 *   - Fade in and out within one cycle (so they never pop).
 *   - Scale 0.8 → 2.5 to mimic real expansion as steam diffuses.
 *   - Higher-count, higher-opacity, wider-blur pass produces a thicker
 *     "fog" feel rather than thin individual steam plumes.
 *
 * Leaves use a small custom SVG, ultra-low opacity, slow infinite drift +
 * micro-rotation. They live under the headline plane so they never compete
 * with the copy for attention.
 */
export function HeroAtmosphere({ parallaxX, parallaxY, reduced }: HeroAtmosphereProps) {
  const leavesX = useTransform(parallaxX, [-1, 1], [-22, 22]);
  const leavesY = useTransform(parallaxY, [-1, 1], [-14, 14]);
  const steamX = useTransform(parallaxX, [-1, 1], [-10, 10]);
  const steamY = useTransform(parallaxY, [-1, 1], [-6, 6]);

  if (reduced) return null;

  return (
    <>
      <Box
        component={motion.div}
        aria-hidden
        style={{ x: steamX, y: steamY }}
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          willChange: "transform",
          // Steam concentrates over the chai glass area on the right.
          // Desktop: glass at ~72% x. Mobile: photo crops to 70% so glass
          // sits closer to right edge — bump steam slightly right.
          "& > *": {
            position: "absolute",
          },
        }}
      >
        {STEAM_WISPS.map((w) => (
          <SteamWisp key={w.id} {...w} />
        ))}
      </Box>

      <Box
        component={motion.div}
        aria-hidden
        style={{ x: leavesX, y: leavesY }}
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        {LEAVES.map((l) => (
          <FloatingLeaf key={l.id} {...l} />
        ))}
      </Box>
    </>
  );
}

interface SteamConfig {
  id: number;
  /** Anchor (% of hero width) — varies a bit so wisps don't stack. */
  left: { xs: string; md: string };
  /** Lateral drift (px) over a cycle. */
  drift: number;
  /** Per-loop duration (s). */
  duration: number;
  /** Stagger so wisps emerge at different times. */
  delay: number;
  /** Base wisp diameter (px) before scale-up. */
  size: number;
}

const STEAM_WISPS: readonly SteamConfig[] = [
  // Wider horizontal spread (50–82% vs 58–75%) + larger sizes give the
  // overall scene a more ambient, foggy quality rather than a thin
  // single-column plume.
  { id: 1, left: { xs: "58%", md: "68%" }, drift: 12, duration: 9.0, delay: 0, size: 72 },
  { id: 2, left: { xs: "66%", md: "76%" }, drift: -10, duration: 10.0, delay: 1.6, size: 88 },
  { id: 3, left: { xs: "54%", md: "64%" }, drift: 14, duration: 8.5, delay: 3.0, size: 64 },
  { id: 4, left: { xs: "62%", md: "73%" }, drift: -8, duration: 9.5, delay: 4.4, size: 80 },
  { id: 5, left: { xs: "72%", md: "82%" }, drift: 9, duration: 11.0, delay: 5.8, size: 70 },
  { id: 6, left: { xs: "50%", md: "60%" }, drift: -12, duration: 10.5, delay: 7.2, size: 76 },
];

function SteamWisp({ left, drift, duration, delay, size }: SteamConfig) {
  return (
    <Box
      component={motion.div}
      aria-hidden
      initial={{ top: "55%", x: 0, opacity: 0, scale: 0.8 }}
      animate={{
        top: "0%",
        x: [0, drift, -drift / 2, drift / 3, 0],
        // Thicker fog reads as longer-lingering, more-opaque mid-life:
        // peak ~0.78 (was 0.55), with a slower fade-out tail.
        opacity: [0, 0.65, 0.78, 0.4, 0],
        scale: [0.8, 1.5, 2.0, 2.5],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeOut" }}
      sx={{
        left,
        width: size,
        height: size,
        marginLeft: `${-size / 2}px`,
        borderRadius: "50%",
        // Denser core + softer outer falloff = visibly thicker fog while
        // still feathering into the photo (no hard-edged halos).
        background:
          "radial-gradient(circle, rgba(255,240,215,0.78) 0%, rgba(255,238,210,0.38) 45%, transparent 75%)",
        filter: "blur(20px)",
        willChange: "top, transform, opacity",
        mixBlendMode: "screen",
      }}
    />
  );
}

interface LeafConfig {
  id: number;
  left: string;
  top: string;
  size: number;
  /** Drift amplitude in px. */
  driftX: number;
  driftY: number;
  /** Rotation amplitude in degrees. */
  rotate: number;
  /** Per-loop duration in seconds. */
  duration: number;
  /** Stagger so leaves never sync. */
  delay: number;
  /** Resting opacity — kept low so they never compete with copy. */
  opacity: number;
}

const LEAVES: readonly LeafConfig[] = [
  { id: 1, left: "10%", top: "78%", size: 18, driftX: 8, driftY: -6, rotate: 12, duration: 22, delay: 0, opacity: 0.22 },
  { id: 2, left: "92%", top: "20%", size: 14, driftX: -6, driftY: 5, rotate: 10, duration: 19, delay: 3.5, opacity: 0.18 },
  { id: 3, left: "32%", top: "88%", size: 16, driftX: 9, driftY: -4, rotate: -8, duration: 25, delay: 6, opacity: 0.16 },
  { id: 4, left: "94%", top: "82%", size: 13, driftX: -5, driftY: -7, rotate: 7, duration: 28, delay: 9.5, opacity: 0.2 },
  { id: 5, left: "6%", top: "30%", size: 12, driftX: 5, driftY: 6, rotate: -10, duration: 24, delay: 12, opacity: 0.14 },
];

function FloatingLeaf({
  left,
  top,
  size,
  driftX,
  driftY,
  rotate,
  duration,
  delay,
  opacity,
}: LeafConfig) {
  return (
    <Box
      component={motion.div}
      aria-hidden
      initial={{ x: 0, y: 0, rotate: 0 }}
      animate={{
        x: [0, driftX, -driftX / 2, driftX / 3, 0],
        y: [0, driftY, -driftY / 1.5, driftY / 2, 0],
        rotate: [0, rotate, -rotate / 2, rotate / 3, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      sx={{
        position: "absolute",
        left,
        top,
        opacity,
        willChange: "transform",
      }}
    >
      <LeafSVG size={size} />
    </Box>
  );
}

function LeafSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 1.45}
      viewBox="0 0 24 32"
      style={{ display: "block" }}
      aria-hidden
    >
      <path
        d="M12 1 C 4 6 4 22 12 31 C 20 22 20 6 12 1 Z"
        fill="rgba(170,200,120,0.85)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.6"
      />
      <path
        d="M12 3 L 12 29"
        stroke="rgba(120,150,80,0.55)"
        strokeWidth="0.7"
        fill="none"
      />
    </svg>
  );
}
