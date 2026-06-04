"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import GroupsIcon from "@mui/icons-material/Groups";
import LaptopIcon from "@mui/icons-material/Laptop";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import { motion } from "framer-motion";

import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  compactSectionHeadingSx,
  compactSectionPy,
  pillarCardSpacing,
  pillarIconSx,
} from "@/components/common/pillarCardStyles";
import { EXPERIENCE_USECASES } from "@/data/competitors";
import { brandColors } from "@/theme/palette";

const ICONS = {
  FlashOn: FlashOnIcon,
  Groups: GroupsIcon,
  Laptop: LaptopIcon,
  Nightlife: NightlifeIcon,
} as const;

const CARD_MOTION = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  whileHover: { y: -8 },
} as const;

const HOVER_OVERLAY_TRANSITION =
  "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";

export function ExperienceSection() {
  const theme = useTheme();
  const accent = theme.palette.secondary.main;
  const hoverBg = brandColors.charcoal;

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
          const number = String(idx + 1).padStart(2, "0");

          return (
            <Box
              key={usecase.title}
              component={motion.div}
              {...CARD_MOTION}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                borderRadius: 3,
                border: `2px solid ${alpha(brandColors.charcoal, 0.06)}`,
                bgcolor: "background.paper",
                p: { xs: 3, md: 4 },
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                "&:hover": {
                  borderColor: alpha("#fff", 0.12),
                  boxShadow: `0 24px 48px -12px ${alpha(accent, 0.22)}`,
                  "& .experience-overlay": {
                    transform: "translateY(0)",
                  },
                  "& .experience-number": {
                    color: alpha("#fff", 0.06),
                  },
                  "& .experience-icon-wrap": {
                    bgcolor: alpha(accent, 0.2),
                    borderColor: alpha(accent, 0.4),
                    transform: "scale(1.1)",
                  },
                  "& .experience-icon": {
                    color: accent,
                  },
                  "& .experience-title": {
                    color: brandColors.textOnDark,
                  },
                  "& .experience-text": {
                    color: alpha(brandColors.textOnDark, 0.7),
                  },
                },
              }}
            >
              <Box
                className="experience-overlay"
                aria-hidden
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: hoverBg,
                  transform: "translateY(100%)",
                  transition: HOVER_OVERLAY_TRANSITION,
                  zIndex: 0,
                }}
              />

              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  height: "100%",
                }}
              >
                <Typography
                  className="experience-number"
                  aria-hidden
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    fontSize: "4.5rem",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: alpha(brandColors.charcoal, 0.04),
                    userSelect: "none",
                    pointerEvents: "none",
                    transition: "color 0.3s ease",
                  }}
                >
                  {number}
                </Typography>

                <Stack spacing={pillarCardSpacing} sx={{ height: "100%" }}>
                  <Box
                    className="experience-icon-wrap"
                    sx={{
                      ...pillarIconSx,
                      bgcolor: "secondary.light",
                      transition:
                        "background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
                    }}
                  >
                    {Icon ? (
                      <Icon
                        className="experience-icon"
                        sx={{
                          color: "primary.dark",
                          transition: "color 0.3s ease",
                        }}
                      />
                    ) : null}
                  </Box>

                  <Typography
                    className="experience-title"
                    variant="h5"
                    sx={{ transition: "color 0.3s ease", pr: 5 }}
                  >
                    {usecase.title}
                  </Typography>

                  <Typography
                    className="experience-text"
                    variant="body2"
                    color="text.secondary"
                    sx={{ transition: "color 0.3s ease" }}
                  >
                    {usecase.text}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Section>
  );
}
