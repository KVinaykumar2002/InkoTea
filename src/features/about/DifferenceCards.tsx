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
  compactSectionPy,
  pillarCardSpacing,
} from "@/components/common/pillarCardStyles";

const COLUMNS = [
  {
    label: "Traditional Tea",
    rows: ["Inconsistent quality", "No brand recall", "Unstructured operations"],
    featured: false,
  },
  {
    label: "Cafe Chains",
    rows: ["Expensive pricing", "Premium niche only", "Slow to scale regionally"],
    featured: false,
  },
  {
    label: "INKOTEA",
    rows: [
      "Affordable Premium",
      "Mass + Lifestyle positioning",
      "Scalable, system-driven",
    ],
    featured: true,
  },
];

interface DifferenceCardProps {
  label: string;
  rows: string[];
  featured: boolean;
}

function DifferenceCard({ label, rows, featured }: DifferenceCardProps) {
  return (
    <HoverRevealCard featured={featured}>
      <Box sx={compactCardContentSx}>
        <Stack spacing={pillarCardSpacing}>
          <Chip
            label={featured ? "INKOTEA Way" : label}
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
            {label}
          </Typography>
          <Stack spacing={1}>
            {rows.map((row) => (
              <Typography key={row} variant="body2" color="text.secondary">
                {row}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Box>
    </HoverRevealCard>
  );
}

export function DifferenceCards() {
  return (
    <Section
      bgcolor="background.paper"
      pt={{ xs: 4, md: 5 }}
      pb={compactSectionPy}
    >
      <SectionHeading
        eyebrow="What makes us different"
        title="The middle ground tea retail was missing"
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
        {COLUMNS.map((col, idx) => (
          <ScrollReveal key={col.label} delay={idx * 0.1}>
            <DifferenceCard {...col} />
          </ScrollReveal>
        ))}
      </Box>
    </Section>
  );
}
