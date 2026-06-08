"use client";

import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ExperienceHoverCard } from "@/components/common/ExperienceHoverCard";
import {
  compactSectionHeadingSx,
  compactSectionPy,
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
          gap: { xs: 2.5, md: 3 },
        }}
      >
        {PILLARS.map((p, idx) => (
          <ExperienceHoverCard
            key={p.label}
            icon={p.icon}
            eyebrow={p.label}
            title={p.title}
            description={p.text}
            index={idx}
            motionDelay={idx * 0.1}
            iconWrapSx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "& .experience-icon": {
                color: "primary.contrastText",
              },
            }}
          />
        ))}
      </Box>
    </Section>
  );
}
