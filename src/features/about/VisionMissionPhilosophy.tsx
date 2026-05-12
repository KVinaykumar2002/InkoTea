"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const PILLARS = [
  {
    icon: VisibilityIcon,
    label: "Vision",
    title: "India's most accessible beverage brand",
    text: "To build a nationally recognized retail brand rooted in chai culture and designed for modern consumer lifestyles.",
  },
  {
    icon: RocketLaunchIcon,
    label: "Mission",
    title: "Standardize, enable, build",
    text: "Standardize chai retail. Enable micro-entrepreneurs. Build community-driven café spaces.",
  },
  {
    icon: FavoriteIcon,
    label: "Philosophy",
    title: '"The Feeling of One More"',
    text: "Not just taste — it's the habit, the emotion, and the connection that makes one cup turn into the next.",
  },
];

export function VisionMissionPhilosophy() {
  return (
    <Section bgcolor="background.default">
      <SectionHeading
        eyebrow="What guides us"
        title="Vision, mission, philosophy"
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        {PILLARS.map((p, idx) => (
          <ScrollReveal key={p.label} delay={idx * 0.1}>
            <Stack
              spacing={2.5}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 3,
                bgcolor: "background.paper",
                border: (t) => `1px solid ${t.palette.divider}`,
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p.icon />
              </Box>
              <Typography
                variant="overline"
                sx={{ color: "secondary.dark", letterSpacing: "0.18em" }}
              >
                {p.label}
              </Typography>
              <Typography variant="h5" sx={{ fontStyle: "italic" }}>
                {p.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {p.text}
              </Typography>
            </Stack>
          </ScrollReveal>
        ))}
      </Box>
    </Section>
  );
}
