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
    <Section bgcolor="background.paper">
      <SectionHeading
        eyebrow="Core USPs"
        title="Five reasons INKOTEA is built to scale"
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "repeat(5, 1fr)",
          },
          gap: 3,
        }}
      >
        {CORE_USPS.map((usp, idx) => {
          const Icon = ICONS[usp.icon as keyof typeof ICONS];
          return (
            <ScrollReveal key={usp.title} delay={idx * 0.08}>
              <Stack
                spacing={2}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 3,
                  bgcolor: "background.default",
                  border: (t) => `1px solid ${t.palette.divider}`,
                  transition: "all 0.25s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {Icon ? <Icon fontSize="small" /> : null}
                </Box>
                <Typography variant="h6">{usp.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {usp.description}
                </Typography>
              </Stack>
            </ScrollReveal>
          );
        })}
      </Box>
    </Section>
  );
}
