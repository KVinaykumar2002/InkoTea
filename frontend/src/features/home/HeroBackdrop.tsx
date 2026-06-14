"use client";

import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AnimatePresence, motion, useTransform, type MotionValue } from "framer-motion";

import { DEFAULT_HERO_CONTENT } from "@shared/pageContent";
import { resolveMediaUrl } from "@/lib/resolveMediaUrl";
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
  slides?: readonly HeroSlide[];
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
  slides = HERO_SLIDES,
}: HeroBackdropProps) {
  const photoX = useTransform(parallaxX, [-1, 1], [-6, 6]);
  const photoY = useTransform(parallaxY, [-1, 1], [-4, 4]);
  const [paused, setPaused] = useState(false);
  const isFirstSlide = activeIndex === 0;
  const slideCount = slides.length;
  const goToPrevSlide = () => {
    onSelectSlide((activeIndex - 1 + slideCount) % slideCount);
  };
  const goToNextSlide = () => {
    onSelectSlide((activeIndex + 1) % slideCount);
  };

  useEffect(() => {
    if (reduced || paused || slides.length <= 1) return;
    const id = window.setInterval(() => {
      onSelectSlide((activeIndex + 1) % slides.length);
    }, HERO_CAROUSEL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, activeIndex, onSelectSlide, slides.length]);

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
            slide={slides[activeIndex] ?? slides[0]}
            slideIndex={activeIndex}
            reduced={reduced}
          />
        </AnimatePresence>
      </Box>

      {isFirstSlide ? (
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
      ) : null}

      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background: isFirstSlide
            ? {
                xs: "linear-gradient(180deg, rgba(15,10,6,0.55) 0%, rgba(15,10,6,0.82) 55%, rgba(15,10,6,0.92) 100%), linear-gradient(90deg, rgba(15,10,6,0.9) 0%, rgba(15,10,6,0.45) 100%)",
                md: "linear-gradient(90deg, rgba(15,10,6,0.88) 0%, rgba(15,10,6,0.65) 35%, rgba(15,10,6,0.25) 60%, rgba(15,10,6,0.05) 100%)",
              }
            : "linear-gradient(180deg, rgba(15,10,6,0.08) 0%, rgba(15,10,6,0) 30%, rgba(15,10,6,0) 70%, rgba(15,10,6,0.2) 100%)",
          zIndex: 1,
          pointerEvents: "none",
          transition: "background 0.6s ease",
        }}
      />

      {isFirstSlide ? (
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
      ) : null}

      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background: isFirstSlide
            ? "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.35) 100%)"
            : "radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0,0,0,0.22) 100%)",
          zIndex: 1,
          pointerEvents: "none",
          transition: "background 0.6s ease",
        }}
      />

      {slideCount > 1 ? (
        <>
          <IconButton
            type="button"
            aria-label="Previous hero slide"
            onClick={goToPrevSlide}
            sx={heroNavButtonSx("left")}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <IconButton
            type="button"
            aria-label="Next hero slide"
            onClick={goToNextSlide}
            sx={heroNavButtonSx("right")}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>

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
            {slides.map((_, idx) => (
              <Box
                key={idx}
                component="button"
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Show slide ${idx + 1} of ${slideCount}`}
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

function heroNavButtonSx(side: "left" | "right") {
  return {
    position: "absolute",
    top: "50%",
    [side]: { xs: 8, sm: 16, md: 24 },
    transform: "translateY(-50%)",
    zIndex: 4,
    color: "#fff",
    bgcolor: "rgba(15,10,6,0.45)",
    border: "1px solid rgba(255,255,255,0.22)",
    backdropFilter: "blur(6px)",
    width: { xs: 34, md: 40 },
    height: { xs: 34, md: 40 },
    transition: "background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
    "&:hover": {
      bgcolor: "rgba(15,10,6,0.65)",
      borderColor: "rgba(255,255,255,0.45)",
    },
  } as const;
}

function HeroSlideLayer({
  slide,
  slideIndex,
  reduced,
}: {
  slide: HeroSlide;
  slideIndex: number;
  reduced: boolean;
}) {
  const fallbackImage =
    DEFAULT_HERO_CONTENT.slides[slideIndex]?.image ??
    DEFAULT_HERO_CONTENT.slides[0]?.image ??
    "/fallback-image.svg";
  const primarySrc = useMemo(
    () => resolveMediaUrl(slide.image),
    [slide.image],
  );
  const fallbackSrc = useMemo(
    () => resolveMediaUrl(fallbackImage),
    [fallbackImage],
  );
  const [imageSrc, setImageSrc] = useState(primarySrc);

  useEffect(() => {
    setImageSrc(primarySrc);
  }, [primarySrc]);

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
          overflow: "hidden",
          willChange: "transform, opacity",
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt=""
          onError={() => {
            setImageSrc((current) =>
              current === fallbackSrc ? current : fallbackSrc,
            );
          }}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: slide.position,
            display: "block",
          }}
        />
      </Box>
    </Box>
  );
}
