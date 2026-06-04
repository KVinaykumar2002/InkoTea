"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AnimatePresence, motion, useTransform, type MotionValue } from "framer-motion";

import {
  HERO_CAROUSEL_INTERVAL_MS,
  HERO_SLIDES,
  type HeroSlide,
} from "./heroSlides";

interface HeroBackdropProps {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduced: boolean;
  activeIndex: number;
  onSelectSlide: (index: number) => void;
}

/**
 * Hero backdrop — cross-fading photo carousel plus overlays.
 * Pointer parallax applies to the active slide only.
 */
export function HeroBackdrop({
  parallaxX,
  parallaxY,
  reduced,
  activeIndex,
  onSelectSlide,
}: HeroBackdropProps) {
  const photoX = useTransform(parallaxX, [-1, 1], [-6, 6]);
  const photoY = useTransform(parallaxY, [-1, 1], [-4, 4]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || HERO_SLIDES.length <= 1) return;
    const id = window.setInterval(() => {
      onSelectSlide((activeIndex + 1) % HERO_SLIDES.length);
    }, HERO_CAROUSEL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, activeIndex, onSelectSlide]);

  const go = (delta: number) => {
    const next =
      (activeIndex + delta + HERO_SLIDES.length) % HERO_SLIDES.length;
    onSelectSlide(next);
  };

  return (
    <>
      <Box
        component={motion.div}
        style={{ x: photoX, y: photoY }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        sx={{
          position: "absolute",
          inset: "-24px",
          zIndex: 0,
          willChange: "transform",
        }}
      >
        <AnimatePresence mode="sync" initial={false}>
          <HeroSlideLayer
            key={activeIndex}
            slide={HERO_SLIDES[activeIndex]}
            reduced={reduced}
          />
        </AnimatePresence>
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
          width: { xs: "min(280px, 72vw)", sm: 380, md: 540 },
          height: { xs: "min(280px, 72vw)", sm: 380, md: 540 },
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
          background: {
            xs: "linear-gradient(180deg, rgba(15,10,6,0.55) 0%, rgba(15,10,6,0.82) 55%, rgba(15,10,6,0.92) 100%), linear-gradient(90deg, rgba(15,10,6,0.9) 0%, rgba(15,10,6,0.45) 100%)",
            md: "linear-gradient(90deg, rgba(15,10,6,0.88) 0%, rgba(15,10,6,0.65) 35%, rgba(15,10,6,0.25) 60%, rgba(15,10,6,0.05) 100%)",
          },
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background: {
            xs: "linear-gradient(180deg, rgba(15,10,6,0.12) 0%, rgba(15,10,6,0) 40%, rgba(15,10,6,0) 55%, rgba(15,10,6,0.75) 100%)",
            md: "linear-gradient(180deg, rgba(15,10,6,0.18) 0%, rgba(15,10,6,0) 35%, rgba(15,10,6,0) 75%, rgba(15,10,6,0.55) 100%)",
          },
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

      {HERO_SLIDES.length > 1 ? (
        <>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: "absolute",
              bottom: { xs: 20, md: 28 },
              right: { xs: 16, md: 32 },
              zIndex: 4,
              display: { xs: "none", sm: "flex" },
            }}
          >
            <IconButton
              aria-label="Previous hero slide"
              onClick={() => go(-1)}
              size="small"
              sx={carouselControlSx}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="Next hero slide"
              onClick={() => go(1)}
              size="small"
              sx={carouselControlSx}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            role="tablist"
            aria-label="Hero slides"
            sx={{
              position: "absolute",
              bottom: { xs: 10, md: 28 },
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 4,
            }}
          >
            {HERO_SLIDES.map((_, idx) => (
              <Box
                key={idx}
                component="button"
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Show slide ${idx + 1} of ${HERO_SLIDES.length}`}
                onClick={() => onSelectSlide(idx)}
                sx={{
                  width: idx === activeIndex ? { xs: 20, md: 28 } : 8,
                  height: { xs: 6, md: 8 },
                  p: 0,
                  border: "none",
                  borderRadius: 999,
                  cursor: "pointer",
                  bgcolor:
                    idx === activeIndex
                      ? "secondary.main"
                      : "rgba(255,255,255,0.35)",
                  transition: "width 0.3s ease, background-color 0.3s ease",
                }}
              />
            ))}
          </Stack>
        </>
      ) : null}
    </>
  );
}

function HeroSlideLayer({
  slide,
  reduced,
}: {
  slide: HeroSlide;
  reduced: boolean;
}) {
  return (
    <Box
      component={motion.div}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.9, ease: "easeInOut" }}
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
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
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: slide.position,
          willChange: "transform, opacity",
        }}
      />
    </Box>
  );
}

const carouselControlSx = {
  color: "#fff",
  bgcolor: "rgba(0,0,0,0.35)",
  border: "1px solid rgba(255,255,255,0.25)",
  backdropFilter: "blur(8px)",
  "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
} as const;
