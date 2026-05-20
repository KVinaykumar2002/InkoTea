"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { compactSectionHeadingSx } from "@/components/common/pillarCardStyles";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { MARKET_GAP } from "@/data/competitors";

export function MarketGapSection() {
  return (
    <Section bgcolor="background.default" pt={{ xs: 4, md: 5 }} pb={{ xs: 8, md: 12 }}>
      <SectionHeading
        eyebrow="The Market Gap"
        title="Two extremes. One missing middle."
        description="India's chai consumers had to choose between unstructured stalls and unaffordable cafés. We built INKOTEA so they don't have to."
        sx={compactSectionHeadingSx}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        {MARKET_GAP.map((item, idx) => {
          const isUs = item.accent === "highlight";
          return (
            <ScrollReveal key={item.title} delay={idx * 0.1}>
              <Stack
                spacing={2.5}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  height: "100%",
                  bgcolor: isUs ? "primary.main" : "background.paper",
                  color: isUs ? "primary.contrastText" : "text.primary",
                  border: isUs
                    ? "none"
                    : (t) => `1px solid ${t.palette.divider}`,
                  transform: isUs
                    ? { xs: "none", md: "translateY(-8px) scale(1.03)" }
                    : "none",
                  boxShadow: isUs
                    ? "0 24px 60px -20px rgba(92, 58, 33, 0.45)"
                    : "none",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: isUs ? "secondary.light" : "text.secondary",
                    letterSpacing: "0.18em",
                  }}
                >
                  {isUs ? "INKOTEA" : "Existing option"}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: isUs ? "secondary.light" : "text.primary",
                    fontStyle: isUs ? "italic" : "normal",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: isUs ? "rgba(255,255,255,0.92)" : "text.secondary",
                  }}
                >
                  {item.description}
                </Typography>
              </Stack>
            </ScrollReveal>
          );
        })}
      </Box>
    </Section>
  );
}
