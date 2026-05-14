"use client";

import Box from "@mui/material/Box";
import { motion, useTransform, type MotionValue } from "framer-motion";

import { BRAND_IMAGES } from "@/lib/brandImages";

interface HeroBackdropProps {
  /** Normalised pointer X (-1..1) — driven by a spring in HeroSection. */
  parallaxX: MotionValue<number>;
  /** Normalised pointer Y (-1..1) — driven by a spring in HeroSection. */
  parallaxY: MotionValue<number>;
  reduced: boolean;
}

/**
 * Hero backdrop — the photo and every static overlay that goes over it.
 *
 * Stack (back → front):
 *   1. Photo, with a slow Ken-Burns zoom (1 → 1.03 → 1) and a tiny pointer
 *      parallax. Wrapped in an extra "overscan" box so the zoom never
 *      reveals letterbox edges.
 *   2. Warm radial glow positioned behind the chai glass on the right —
 *      breathes opacity to give the scene depth.
 *   3. Left-side darkening gradient — keeps the headline legible.
 *   4. Bottom vertical gradient — bleeds the photo into the next section.
 *   5. Subtle vignette around the whole frame.
 *
 * All animations are pure transform/opacity, GPU-accelerated, no layout
 * shift. Honours `prefers-reduced-motion` — the photo holds still and the
 * glow stops breathing.
 */
export function HeroBackdrop({ parallaxX, parallaxY, reduced }: HeroBackdropProps) {
  // Photo gets the smallest parallax range — the further from camera, the
  // less it moves.
  const photoX = useTransform(parallaxX, [-1, 1], [-6, 6]);
  const photoY = useTransform(parallaxY, [-1, 1], [-4, 4]);

  return (
    <>
      <Box
        component={motion.div}
        style={{ x: photoX, y: photoY }}
        sx={{
          position: "absolute",
          inset: "-24px",
          zIndex: 0,
          willChange: "transform",
        }}
      >
        <Box
          component={motion.div}
          animate={reduced ? undefined : { scale: [1, 1.04, 1], y: [0, -3, 0] }}
          transition={
            reduced
              ? undefined
              : {
                  scale: { duration: 28, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
                }
          }
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${BRAND_IMAGES.heroChaiScene})`,
            backgroundSize: "cover",
            backgroundPosition: { xs: "70% center", md: "center" },
            willChange: "transform",
          }}
        />
      </Box>

      <Box
        component={motion.div}
        aria-hidden
        animate={reduced ? undefined : { opacity: [0.45, 0.7, 0.45] }}
        transition={
          reduced ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }
        sx={{
          position: "absolute",
          right: { xs: "10%", md: "22%" },
          top: { xs: "40%", md: "50%" },
          transform: "translate(50%, -50%)",
          width: { xs: 380, md: 540 },
          height: { xs: 380, md: 540 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,180,90,0.32) 0%, rgba(255,150,70,0.16) 35%, transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: 1,
          willChange: "opacity",
        }}
      />

      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(15,10,6,0.88) 0%, rgba(15,10,6,0.65) 35%, rgba(15,10,6,0.25) 60%, rgba(15,10,6,0.05) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(15,10,6,0.18) 0%, rgba(15,10,6,0) 35%, rgba(15,10,6,0) 75%, rgba(15,10,6,0.55) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.35) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
