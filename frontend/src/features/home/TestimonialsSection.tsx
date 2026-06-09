"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { ContentState } from "@/components/common/ContentState";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TestimonialsMarquee } from "@/components/common/TestimonialsMarquee";
import { compactSectionHeadingSx } from "@/components/common/pillarCardStyles";
import { useTestimonials } from "@/hooks/useApiContent";
import { brandColors } from "@/theme/palette";

const REVIEWS_PAGE_HREF = "/testimonials#reviews";

interface TestimonialsSectionProps {
  embedded?: boolean;
  showMoreLink?: boolean;
}

export function TestimonialsSection({
  embedded = false,
  showMoreLink = true,
}: TestimonialsSectionProps) {
  const { data, loading, error } = useTestimonials();

  const content = (
    <>
      <SectionHeading
        eyebrow="Testimonials"
        title="What Our Customers Say"
        sx={embedded ? { ...compactSectionHeadingSx, mt: 0 } : compactSectionHeadingSx}
      />

      <ContentState
        loading={loading}
        error={error}
        empty={!data?.testimonials?.length}
      >
        {() => (
          <TestimonialsMarquee
            testimonials={data!.testimonials}
            variant="carousel"
          />
        )}
      </ContentState>

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
