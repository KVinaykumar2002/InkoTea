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

const POSITIONS = [
  {
    name: "Street Chai Stalls",
    label: "Mass Kiosks",
    description:
      "High-volume, low-experience. Built for transit footfall, not lingering.",
    accent: "muted",
  },
  {
    name: "Premium Urban Cafés",
    label: "Lifestyle Spaces",
    description:
      "Beautiful spaces, premium pricing — out of reach for daily Indian consumers.",
    accent: "muted",
  },
  {
    name: "INKOTEA",
    label: "The Bridge",
    description:
      "Affordability + experience. Two scalable formats. One brand promise.",
    accent: "highlight",
  },
];

export function PositioningSection() {
  return (
    <Section bgcolor="background.default">
      <SectionHeading
        eyebrow="Where We Stand"
        title="Not just tea. Not just a café. We are both."
        description="Indian tea retail has always been split between unstructured street stalls and overpriced cafés. INKOTEA bridges that gap."
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        {POSITIONS.map((pos, idx) => {
          const isUs = pos.accent === "highlight";
          return (
            <ScrollReveal key={pos.name} delay={idx * 0.1}>
              <Card
                sx={{
                  height: "100%",
                  p: 1,
                  bgcolor: isUs ? "primary.main" : "background.paper",
                  color: isUs ? "primary.contrastText" : "text.primary",
                  border: isUs ? "none" : undefined,
                  position: "relative",
                  overflow: "visible",
                  transform: isUs
                    ? { xs: "none", md: "translateY(-12px)" }
                    : "none",
                  boxShadow: isUs
                    ? "0 24px 60px -20px rgba(92, 58, 33, 0.45)"
                    : "none",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={2}>
                    <Chip
                      label={pos.label}
                      size="small"
                      sx={{
                        alignSelf: "flex-start",
                        bgcolor: isUs
                          ? "secondary.main"
                          : "secondary.light",
                        color: isUs ? "secondary.contrastText" : "primary.dark",
                        fontWeight: 700,
                      }}
                    />
                    <Typography
                      variant="h3"
                      sx={{
                        color: isUs ? "secondary.light" : "primary.main",
                        fontStyle: isUs ? "italic" : "normal",
                      }}
                    >
                      {pos.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: isUs
                          ? "rgba(255,255,255,0.85)"
                          : "text.secondary",
                      }}
                    >
                      {pos.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </ScrollReveal>
          );
        })}
      </Box>
    </Section>
  );
}
