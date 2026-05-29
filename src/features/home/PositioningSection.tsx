"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
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
    name: "Premium Urban Cafés",
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

const cardSx = {
  height: "100%",
  bgcolor: "background.paper",
  border: 1,
  borderColor: "divider",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
  "&:hover": {
    borderColor: "primary.main",
    boxShadow: "0 16px 40px -24px rgba(92, 58, 33, 0.28)",
  },
};

export function PositioningSection() {
  return (
    <Section
      bgcolor="background.default"
      pt={{ xs: 4, md: 5 }}
      pb={{ xs: 4, md: 5 }}
    >
      <SectionHeading
        eyebrow="Where We Stand"
        title="Not just tea. Not just a café. We are both."
        description="Indian tea retail has always been split between unstructured street stalls and overpriced cafés. INKOTEA bridges that gap."
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
            <Card
              sx={{
                ...cardSx,
                ...(pos.featured
                  ? {
                      borderColor: "primary.main",
                      borderWidth: 2,
                    }
                  : {}),
              }}
            >
              <CardContent sx={compactCardContentSx}>
                <Stack spacing={pillarCardSpacing}>
                  <Chip
                    label={pos.label}
                    size="small"
                    color={pos.featured ? "primary" : "default"}
                    variant={pos.featured ? "filled" : "outlined"}
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
                    {pos.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {pos.description}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </Box>
    </Section>
  );
}
