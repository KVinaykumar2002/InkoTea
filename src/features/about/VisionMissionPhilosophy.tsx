"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  compactSectionHeadingSx,
  compactSectionPy,
  pillarCardPadding,
  pillarCardSpacing,
  pillarIconSx,
} from "@/components/common/pillarCardStyles";

const PILLARS = [
  {
    icon: RocketLaunchIcon,
    label: "Mission",
    title: "Build India's most scalable premium mini social cafe network",
    text: "Standardize chai retail and enable micro-entrepreneurs across India through compact, brand-driven outlets at every footfall.",
  },
  {
    icon: VisibilityIcon,
    label: "Vision",
    title: "Modern social cafe spaces — across cities and towns",
    text: "To create community-driven cafe spaces across India through tea, conversations and community — combining traditional Indian beverage culture with a contemporary cafe experience.",
  },
  {
    icon: FavoriteIcon,
    label: "Philosophy",
    title: '"The Feeling of One More"',
    text: "Not just taste — it's the habit, the emotion and the connection that makes one cup turn into the next.",
  },
];

export function VisionMissionPhilosophy() {
  return (
    <Section bgcolor="background.default" py={compactSectionPy}>
      <SectionHeading
        eyebrow="What guides us"
        title="Vision, Mission, Philosophy"
        sx={compactSectionHeadingSx}
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
              spacing={pillarCardSpacing}
              sx={{
                p: pillarCardPadding,
                height: "100%",
                borderRadius: 3,
                bgcolor: "background.paper",
                border: (t) => `1px solid ${t.palette.divider}`,
              }}
            >
              <Box
                sx={{
                  ...pillarIconSx,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
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
              <Typography variant="h5" sx={{ }}>
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
