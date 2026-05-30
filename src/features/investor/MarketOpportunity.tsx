"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";

const KPIS = [
  {
    end: 1100,
    suffix: "K",
    label: "Tonnes — annual Indian tea consumption",
  },
  {
    end: 92,
    suffix: "%",
    label: "Indian households drink chai daily",
  },
  {
    end: 14,
    suffix: "%",
    label: "Annual growth in organized cafe category",
  },
];

const NARRATIVE = [
  "India is the world's second-largest tea producer and the largest tea consumer per capita. Yet over 90% of the retail market remains unorganized.",
  "The opportunity isn't to invent demand — it's to capture and structure existing demand into a branded, scalable retail network.",
  "INKOTEA's dual-format model is purpose-built for this transition: Kiosks unlock volume in transit zones, Cafes capture experience-led spending in residential and commercial catchments.",
];

export function MarketOpportunity() {
  return (
    <Section bgcolor="background.default" id="opportunity">
      <SectionHeading
        eyebrow="Market Opportunity"
        title="A massive, daily-use category waiting to be organized"
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 4,
          mb: { xs: 6, md: 8 },
        }}
      >
        {KPIS.map((k, idx) => (
          <ScrollReveal key={k.label} delay={idx * 0.1}>
            <AnimatedCounter
              end={k.end}
              suffix={k.suffix}
              label={k.label}
              duration={2}
            />
          </ScrollReveal>
        ))}
      </Box>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Stack spacing={2.5}>
          {NARRATIVE.map((para, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.0625rem", lineHeight: 1.7 }}
              >
                {para}
              </Typography>
            </ScrollReveal>
          ))}
        </Stack>
      </Box>
    </Section>
  );
}
