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

const POSITIONS = [
  {
    name: "Street Chai Stalls",
    label: "Mass Kiosks",
    description:
      "High-volume, low-experience. Built for transit footfall, not lingering.",
    featured: false,
  },
  {
    name: "Premium Urban Cafes",
    label: "Lifestyle Spaces",
    description:
      "Beautiful spaces, premium pricing — out of reach for daily Indian consumers.",
    featured: false,
  },
  {
    name: "INKOTEA",
    label: "The Bridge",
    description:
      "Affordability + experience. Two scalable formats. One brand promise.",
    featured: true,
  },
];

interface PositioningCardProps {
  name: string;
  label: string;
  description: string;
  featured: boolean;
}

function PositioningCard({
  name,
  label,
  description,
  featured,
}: PositioningCardProps) {
  return (
    <HoverRevealCard featured={featured}>
      <Box sx={compactCardContentSx}>
        <Stack spacing={pillarCardSpacing}>
          <Chip
            label={label}
            size="small"
            color={featured ? "primary" : "default"}
            variant={featured ? "filled" : "outlined"}
            sx={{
              alignSelf: "flex-start",
              fontWeight: 700,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              color: "primary.main",
              fontSize: { xs: "1.35rem", md: "1.5rem" },
            }}
          >
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </Stack>
      </Box>
    </HoverRevealCard>
  );
}

export function PositioningSection() {
  return (
    <Section
      bgcolor="background.default"
      pt={{ xs: 4, md: 5 }}
      pb={{ xs: 4, md: 5 }}
    >
      <SectionHeading
        eyebrow="Where We Stand"
        title="Not just tea. Not just a cafe. We are both."
        description="Indian tea retail has always been split between unstructured street stalls and overpriced cafes. INKOTEA bridges that gap."
        sx={compactSectionHeadingSx}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 2.5,
          alignItems: "stretch",
        }}
      >
        {POSITIONS.map((pos, idx) => (
          <ScrollReveal key={pos.name} delay={idx * 0.1}>
            <PositioningCard {...pos} />
          </ScrollReveal>
        ))}
      </Box>
    </Section>
  );
}
