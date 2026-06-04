"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import RepeatIcon from "@mui/icons-material/Repeat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HubIcon from "@mui/icons-material/Hub";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { HoverRevealCard } from "@/components/common/HoverRevealCard";
import {
  compactCardContentSx,
  compactSectionHeadingSx,
  compactSectionPy,
  pillarCardSpacing,
  pillarIconSx,
} from "@/components/common/pillarCardStyles";
import { CORE_USPS } from "@/data/competitors";

const ICONS = {
  Storefront: StorefrontIcon,
  PriceCheck: PriceCheckIcon,
  Repeat: RepeatIcon,
  TrendingUp: TrendingUpIcon,
  Hub: HubIcon,
} as const;

export function USPGrid() {
  return (
    <Section bgcolor="background.paper" py={compactSectionPy}>
      <SectionHeading
        eyebrow="Core USPs"
        title="Five reasons INKOTEA is built to scale"
        sx={compactSectionHeadingSx}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: 3,
        }}
      >
        {CORE_USPS.map((usp, idx) => {
          const Icon = ICONS[usp.icon as keyof typeof ICONS];
          return (
            <ScrollReveal key={usp.title} delay={idx * 0.08}>
              <HoverRevealCard sx={{ bgcolor: "background.default" }}>
                <Box sx={compactCardContentSx}>
                  <Stack spacing={pillarCardSpacing}>
                    <Box
                      sx={{
                        ...pillarIconSx,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                      }}
                    >
                      {Icon ? <Icon fontSize="small" /> : null}
                    </Box>
                    <Typography variant="h6">{usp.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {usp.description}
                    </Typography>
                  </Stack>
                </Box>
              </HoverRevealCard>
            </ScrollReveal>
          );
        })}
      </Box>
    </Section>
  );
}
