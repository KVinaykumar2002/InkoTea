"use client";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import { Section } from "@/components/common/Section";
import { TestimonialCard } from "@/components/common/TestimonialCard";
import { TESTIMONIALS } from "@/data/testimonials";
import { useTestimonials } from "@/hooks/useApiContent";
import { brandColors } from "@/theme/palette";

export function TestimonialsGrid() {
  const { data } = useTestimonials({ testimonials: TESTIMONIALS });
  useEffect(() => {
    if (window.location.hash !== "#reviews") return;
    const target = document.getElementById("reviews");
    if (!target) return;
    const timer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Section id="reviews" bgcolor={brandColors.creamDark} py={{ xs: 6, md: 9 }} sx={{ scrollMarginTop: { xs: 88, md: 96 } }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: { xs: 2.5, md: 3 },
        }}
      >
        {data.testimonials.map((item) => (
          <TestimonialCard key={item.id} item={item} variant="full" />
        ))}
      </Box>
    </Section>
  );
}
