"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { alpha, useTheme } from "@mui/material/styles";

import { TestimonialCard } from "@/components/common/TestimonialCard";
import type { Testimonial } from "@/data/testimonials";
import { brandColors } from "@/theme/palette";

const AUTO_INTERVAL_MS = 5000;
const CARD_WIDTH = { xs: 260, sm: 272, md: 280 };

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  variant?: "carousel" | "full";
}

export function TestimonialsCarousel({
  testimonials,
  variant = "carousel",
}: TestimonialsCarouselProps) {
  const theme = useTheme();
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = testimonials.length;

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || count === 0) return;
      const normalized = ((index % count) + count) % count;
      const child = track.children[normalized] as HTMLElement | undefined;
      child?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        inline: "start",
        block: "nearest",
      });
      setActiveIndex(normalized);
    },
    [count, prefersReducedMotion],
  );

  const scrollBy = useCallback(
    (direction: "left" | "right") => {
      scrollToIndex(activeIndex + (direction === "left" ? -1 : 1));
    },
    [activeIndex, scrollToIndex],
  );

  useEffect(() => {
    if (prefersReducedMotion || paused || count <= 1) return;
    const id = window.setInterval(() => {
      scrollToIndex(activeIndex + 1);
    }, AUTO_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, paused, count, activeIndex, scrollToIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || count === 0) return;

    const onScroll = () => {
      const { scrollLeft } = track;
      let closest = 0;
      let minDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const dist = Math.abs(el.offsetLeft - scrollLeft);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [count]);

  if (count === 0) return null;

  return (
    <Box
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      sx={{ position: "relative", mx: { xs: -1, sm: 0 } }}
    >
      <IconButton
        onClick={() => scrollBy("left")}
        aria-label="Previous testimonials"
        sx={navButtonSx("left")}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>

      <Box
        ref={trackRef}
        sx={{
          display: "flex",
          gap: { xs: 2, md: 2.5 },
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollBehavior: prefersReducedMotion ? "auto" : "smooth",
          px: { xs: 1, sm: 5, md: 6 },
          py: 1,
          mx: { xs: 0, sm: -1 },
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {testimonials.map((item) => (
          <Box
            key={item.id}
            sx={{
              flex: `0 0 ${CARD_WIDTH.xs}px`,
              width: CARD_WIDTH.xs,
              scrollSnapAlign: "start",
              [theme.breakpoints.up("sm")]: {
                flex: `0 0 ${CARD_WIDTH.sm}px`,
                width: CARD_WIDTH.sm,
              },
              [theme.breakpoints.up("md")]: {
                flex: `0 0 ${CARD_WIDTH.md}px`,
                width: CARD_WIDTH.md,
              },
            }}
          >
            <TestimonialCard item={item} variant={variant} />
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={() => scrollBy("right")}
        aria-label="Next testimonials"
        sx={navButtonSx("right")}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>

      {count > 1 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: { xs: 2.5, md: 3 },
          }}
          role="tablist"
          aria-label="Testimonial slides"
        >
          {testimonials.map((item, i) => (
            <Box
              key={item.id}
              component="button"
              type="button"
              role="tab"
              aria-label={`Go to testimonial ${i + 1}`}
              aria-selected={i === activeIndex}
              onClick={() => scrollToIndex(i)}
              sx={{
                width: i === activeIndex ? 24 : 8,
                height: 8,
                borderRadius: 999,
                border: "none",
                p: 0,
                cursor: "pointer",
                bgcolor:
                  i === activeIndex
                    ? brandColors.charcoal
                    : alpha(brandColors.charcoal, 0.2),
                transition: "width 0.25s ease, background-color 0.25s ease",
              }}
            />
          ))}
        </Box>
      ) : null}
    </Box>
  );
}

function navButtonSx(side: "left" | "right") {
  return {
    display: { xs: "none", sm: "flex" },
    position: "absolute",
    top: "38%",
    [side]: { xs: -4, md: -20 },
    transform: "translateY(-50%)",
    zIndex: 2,
    width: 36,
    height: 36,
    bgcolor: "#FFFFFF",
    color: brandColors.charcoal,
    border: `1px solid ${alpha(brandColors.charcoal, 0.1)}`,
    boxShadow: `0 4px 16px ${alpha(brandColors.charcoal, 0.1)}`,
    "&:hover": {
      bgcolor: brandColors.cream,
    },
  } as const;
}
