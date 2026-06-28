"use client";

import Box from "@mui/material/Box";
import { alpha, useTheme } from "@mui/material/styles";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  compactSectionHeadingSx,
  compactSectionPy,
} from "@/components/common/pillarCardStyles";

const ABOUT_VIDEO_ID = "837Kzoin45s";

export function AboutBrandVideo() {
  const theme = useTheme();

  return (
    <Section bgcolor="background.paper" py={compactSectionPy}>
      <SectionHeading
        eyebrow="Watch our story"
        title="The INKOTEA experience"
        description="A glimpse of the chai culture, cafe ambience and community spirit we bring to every neighbourhood."
        sx={compactSectionHeadingSx}
      />

      <ScrollReveal>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 920,
            mx: "auto",
            borderRadius: { xs: 2.5, md: 3 },
            overflow: "hidden",
            aspectRatio: "16 / 9",
            bgcolor: theme.palette.primary.dark,
            border: `1px solid ${alpha(theme.palette.secondary.main, 0.35)}`,
            boxShadow: `0 24px 56px -28px ${alpha(theme.palette.primary.dark, 0.55)}, 0 0 0 1px ${alpha(theme.palette.secondary.main, 0.08)}`,
          }}
        >
          <Box
            component="iframe"
            src={`https://www.youtube.com/embed/${ABOUT_VIDEO_ID}?rel=0&modestbranding=1`}
            title="INKOTEA brand video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
              display: "block",
            }}
          />
        </Box>
      </ScrollReveal>
    </Section>
  );
}
