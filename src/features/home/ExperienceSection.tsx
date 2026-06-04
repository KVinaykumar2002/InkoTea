"use client";

import Box from "@mui/material/Box";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import GroupsIcon from "@mui/icons-material/Groups";
import LaptopIcon from "@mui/icons-material/Laptop";
import NightlifeIcon from "@mui/icons-material/Nightlife";

import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ExperienceHoverCard } from "@/components/common/ExperienceHoverCard";
import {
  compactSectionHeadingSx,
  compactSectionPy,
} from "@/components/common/pillarCardStyles";
import { EXPERIENCE_USECASES } from "@/data/competitors";

const ICONS = {
  FlashOn: FlashOnIcon,
  Groups: GroupsIcon,
  Laptop: LaptopIcon,
  Nightlife: NightlifeIcon,
} as const;

export function ExperienceSection() {
  return (
    <Section bgcolor="background.default" py={compactSectionPy}>
      <SectionHeading
        eyebrow="More Than Just Tea"
        title="The reasons people walk in (and stay)"
        description="INKOTEA outlets aren't just tea stops. They're the moments in your day worth pausing for."
        sx={compactSectionHeadingSx}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "repeat(4, 1fr)",
          },
          gap: { xs: 2.5, md: 3 },
        }}
      >
        {EXPERIENCE_USECASES.map((usecase, idx) => {
          const Icon = ICONS[usecase.icon as keyof typeof ICONS];
          return (
            <ExperienceHoverCard
              key={usecase.title}
              icon={Icon}
              title={usecase.title}
              description={usecase.text}
              index={idx}
            />
          );
        })}
      </Box>
    </Section>
  );
}
