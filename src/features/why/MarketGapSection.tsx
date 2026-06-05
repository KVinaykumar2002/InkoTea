"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { HoverRevealCard } from "@/components/common/HoverRevealCard";
import {
  compactCardContentSx,
  compactSectionHeadingSx,
  pillarCardSpacing,
} from "@/components/common/pillarCardStyles";
import { MARKET_GAP } from "@/data/competitors";

export function MarketGapSection() {
  return (
    <Section bgcolor="background.default" pt={{ xs: 4, md: 5 }} pb={0}>
      <SectionHeading
        eyebrow="The Market Gap"
        title="Two extremes. One missing middle."
        description="India's chai consumers had to choose between unstructured stalls and unaffordable cafes. We built INKOTEA so they don't have to."
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
              <HoverRevealCard featured={isUs}>
                <Box sx={compactCardContentSx}>
                  <Stack spacing={pillarCardSpacing}>
                    <Chip
                      label={isUs ? "INKOTEA" : "Existing option"}
                      size="small"
                      color={isUs ? "primary" : "default"}
                      variant={isUs ? "filled" : "outlined"}
                      sx={{ alignSelf: "flex-start", fontWeight: 700 }}
                    />
                    <Typography
                      variant="h3"
                      sx={{
                        color: "primary.main",
                        fontSize: { xs: "1.35rem", md: "1.5rem" },
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Stack>
                </Box>
              </HoverRevealCard>
            </ScrollReveal>
          );
        })}
      </Box>
    </Section>
  );
}
