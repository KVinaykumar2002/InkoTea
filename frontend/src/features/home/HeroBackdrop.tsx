"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AnimatePresence, motion, useTransform, type MotionValue } from "framer-motion";

import { resolveMediaUrl } from "@/lib/resolveMediaUrl";
import {
  HERO_CAROUSEL_INTERVAL_MS,
  HERO_SLIDES,
  type HeroSlide,
} from "./heroSlides";

/** Retries cover transient backend cold-starts before showing a placeholder. */
const MAX_IMAGE_RETRIES = 3;
const NEUTRAL_FALLBACK = "/fallback-image.svg";

interface HeroBackdropProps {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduced: boolean;
  activeIndex: number;
  onSelectSlide: (index: number) => void;
  slides?: readonly HeroSlide[];
}

/**
 * Hero backdrop — cross-fading photo carousel. Images render without
 * gradient or blur overlays so admin uploads appear as uploaded.
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
    /* Hidden on phones — they sit over the overlay copy. Dots remain for nav. */
    display: { xs: "none", sm: "flex" },
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
  const primarySrc = useMemo(
    () => resolveMediaUrl(slide.image),
    [slide.image],
  );
  const [imageSrc, setImageSrc] = useState(primarySrc);
  const retriesRef = useRef(0);

  useEffect(() => {
    retriesRef.current = 0;
    setImageSrc(primarySrc);
  }, [primarySrc]);

  // The admin-configured image is the source of truth. A failed load is almost
  // always a transient backend cold-start (Render free tier), so retry the real
  // URL a few times before giving up. We never substitute a different brand
  // photo — that would make the home page show images the admin never set.
  const handleError = () => {
    if (primarySrc === NEUTRAL_FALLBACK) return;
    if (retriesRef.current < MAX_IMAGE_RETRIES) {
      retriesRef.current += 1;
      const attempt = retriesRef.current;
      const separator = primarySrc.includes("?") ? "&" : "?";
      window.setTimeout(() => {
        setImageSrc(`${primarySrc}${separator}retry=${attempt}`);
      }, 600 * attempt);
      return;
    }
    setImageSrc(NEUTRAL_FALLBACK);
  };

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
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt=""
          onError={handleError}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: slide.position,
            display: "block",
          }}
        />
      </Box>
    </Box>
  );
}
