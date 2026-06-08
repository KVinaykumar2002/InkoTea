"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { alpha } from "@mui/material/styles";

import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TestimonialCard } from "@/components/common/TestimonialCard";
import { compactSectionHeadingSx } from "@/components/common/pillarCardStyles";
import { TESTIMONIALS } from "@/data/testimonials";
import { brandColors } from "@/theme/palette";

const CARD_WIDTH = { xs: 260, sm: 272, md: 280 };
const SCROLL_AMOUNT = 300;
const REVIEWS_PAGE_HREF = "/testimonials#reviews";

interface TestimonialsSectionProps {
  embedded?: boolean;
  showMoreLink?: boolean;
}

export function TestimonialsSection({
  embedded = false,
  showMoreLink = true,
}: TestimonialsSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const delta = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
    track.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  const content = (
    <>
      <SectionHeading
        eyebrow="Testimonials"
        title="What Our Customers Say"
        sx={embedded ? { ...compactSectionHeadingSx, mt: 0 } : compactSectionHeadingSx}
      />

      <Box sx={{ position: "relative", mx: { xs: -1, sm: 0 } }}>
        <IconButton
          onClick={() => scroll("left")}
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
            scrollBehavior: "smooth",
            px: { xs: 1, sm: 5, md: 6 },
            py: 1,
            mx: { xs: 0, sm: -1 },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {TESTIMONIALS.map((item) => (
            <Box
              key={item.id}
              sx={{
                flex: `0 0 ${CARD_WIDTH.xs}px`,
                width: CARD_WIDTH.xs,
                scrollSnapAlign: "start",
                "@media (min-width:600px)": {
                  flex: `0 0 ${CARD_WIDTH.sm}px`,
                  width: CARD_WIDTH.sm,
                },
                "@media (min-width:900px)": {
                  flex: `0 0 ${CARD_WIDTH.md}px`,
                  width: CARD_WIDTH.md,
                },
              }}
            >
              <TestimonialCard item={item} variant="carousel" />
            </Box>
          ))}
        </Box>

        <IconButton
          onClick={() => scroll("right")}
          aria-label="Next testimonials"
          sx={navButtonSx("right")}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>

      {showMoreLink ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 4, md: 5 } }}>
          <Button
            component={Link}
            href={REVIEWS_PAGE_HREF}
            variant="contained"
            size="large"
            sx={{
              px: { xs: 4, md: 6 },
              py: 1.5,
              minWidth: { xs: "100%", sm: 320 },
              maxWidth: 420,
              borderRadius: 2,
              bgcolor: brandColors.charcoal,
              color: "#FFFFFF",
              fontWeight: 600,
              letterSpacing: "0.02em",
              "&:hover": {
                bgcolor: brandColors.charcoalLight,
              },
            }}
          >
            Show more reviews
          </Button>
        </Box>
      ) : null}
    </>
  );

  if (embedded) {
    return (
      <Box
        id="testimonials"
        sx={{
          mt: { xs: 4, md: 6 },
          mx: { xs: -2, sm: -3, md: -4 },
          px: { xs: 2, sm: 3, md: 4 },
          pt: { xs: 3, md: 4 },
          pb: { xs: 5, md: 7 },
          bgcolor: brandColors.creamDark,
          borderRadius: { xs: 0, md: 3 },
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Section id="testimonials" bgcolor={brandColors.creamDark} py={{ xs: 6, md: 9 }}>
      {content}
    </Section>
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
