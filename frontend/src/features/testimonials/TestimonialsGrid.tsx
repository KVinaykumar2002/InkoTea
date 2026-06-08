"use client";

import { useEffect } from "react";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TestimonialsCarousel } from "@/components/common/TestimonialsCarousel";
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
    <Section
      id="reviews"
      bgcolor={brandColors.creamDark}
      py={{ xs: 6, md: 9 }}
      sx={{ scrollMarginTop: { xs: 88, md: 96 } }}
    >
      <SectionHeading
        eyebrow="Reviews"
        title="Real stories from our customers"
        sx={{ mb: { xs: 4, md: 5 } }}
      />
      <TestimonialsCarousel testimonials={data.testimonials} variant="full" />
    </Section>
  );
}
