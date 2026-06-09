"use client";

import Box from "@mui/material/Box";
import { useReducedMotion } from "framer-motion";

import { TestimonialCard } from "@/components/common/TestimonialCard";
import type { Testimonial } from "@/types";

const CARD_WIDTH = { xs: 260, sm: 272, md: 280 };

interface TestimonialsMarqueeProps {
  testimonials: Testimonial[];
  variant?: "carousel" | "full";
  durationSeconds?: number;
}

/**
 * Continuous horizontal marquee for testimonial cards — pauses on hover.
 */
export function TestimonialsMarquee({
  testimonials,
  variant = "carousel",
  durationSeconds = 45,
}: TestimonialsMarqueeProps) {
  const reduced = Boolean(useReducedMotion());

  if (testimonials.length === 0) return null;

  const loopItems = [...testimonials, ...testimonials];

  return (
    <Box
      sx={{
        overflow: "hidden",
        mx: { xs: -1, sm: 0 },
        py: 1,
        "&:hover .testimonials-marquee-track": {
          animationPlayState: reduced ? "running" : "paused",
        },
      }}
    >
      <Box
        className="testimonials-marquee-track"
        sx={{
          display: "flex",
          width: "max-content",
          gap: { xs: 2, md: 2.5 },
          animation: reduced
            ? "none"
            : `inkotea-marquee-left ${durationSeconds}s linear infinite`,
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      >
        {loopItems.map((item, idx) => (
          <Box
            key={`${item.id}-${idx}`}
            sx={{
              flexShrink: 0,
              width: CARD_WIDTH.xs,
              "@media (min-width:600px)": { width: CARD_WIDTH.sm },
              "@media (min-width:900px)": { width: CARD_WIDTH.md },
            }}
          >
            <TestimonialCard item={item} variant={variant} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
