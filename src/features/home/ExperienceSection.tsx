"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import GroupsIcon from "@mui/icons-material/Groups";
import LaptopIcon from "@mui/icons-material/Laptop";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { EXPERIENCE_USECASES } from "@/data/competitors";

const ICONS = {
  FlashOn: FlashOnIcon,
  Groups: GroupsIcon,
  Laptop: LaptopIcon,
  Nightlife: NightlifeIcon,
} as const;

export function ExperienceSection() {
  return (
    <Section bgcolor="background.default">
      <SectionHeading
        eyebrow="More Than Just Tea"
        title="The reasons people walk in (and stay)"
        description="INKOTEA outlets aren't just tea stops. They're the moments in your day worth pausing for."
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {EXPERIENCE_USECASES.map((usecase, idx) => {
          const Icon = ICONS[usecase.icon as keyof typeof ICONS];
          return (
            <ScrollReveal key={usecase.title} delay={idx * 0.08}>
              <Card
                sx={{
                  height: "100%",
                  p: 1,
                  "&:hover": {
                    borderColor: "primary.main",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: "secondary.light",
                        color: "primary.dark",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {Icon ? <Icon /> : null}
                    </Box>
                    <Typography variant="h5">{usecase.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {usecase.text}
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
