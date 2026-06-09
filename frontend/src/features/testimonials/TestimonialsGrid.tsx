"use client";

import { useEffect } from "react";
import { ContentState } from "@/components/common/ContentState";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TestimonialsMarquee } from "@/components/common/TestimonialsMarquee";
import { useTestimonials } from "@/hooks/useApiContent";
import { brandColors } from "@/theme/palette";

export function TestimonialsGrid() {
  const { data, loading, error } = useTestimonials();

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
      <SectionHeading eyebrow="Reviews" title="Real stories from our guests" />
      <ContentState
        loading={loading}
        error={error}
        empty={!data?.testimonials?.length}
      >
        {() => (
          <TestimonialsMarquee testimonials={data!.testimonials} variant="full" />
        )}
      </ContentState>
    </Section>
  );
}
