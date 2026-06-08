"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SchoolIcon from "@mui/icons-material/School";
import CampaignIcon from "@mui/icons-material/Campaign";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  compactCardContentSx,
  compactSectionHeadingSx,
  pillarCardSpacing,
  pillarIconSx,
} from "@/components/common/pillarCardStyles";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { HoverRevealCard } from "@/components/common/HoverRevealCard";
import { SUPPORT_PILLARS } from "@/data/franchiseModels";

const ICONS = {
  LocationOn: LocationOnIcon,
  Storefront: StorefrontIcon,
  School: SchoolIcon,
  Campaign: CampaignIcon,
  SupportAgent: SupportAgentIcon,
} as const;

export function SupportSystem() {
  return (
    <Section bgcolor="background.paper" pt={{ xs: 4, md: 5 }} pb={0}>
      <SectionHeading
        eyebrow="Franchise Support"
        title="We don't hand you a brand. We launch your business."
        description="Every INKOTEA partner gets the same playbook our 40+ outlets are built on."
        sx={compactSectionHeadingSx}
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
        {SUPPORT_PILLARS.map((pillar, idx) => {
          const Icon = ICONS[pillar.icon as keyof typeof ICONS];
          return (
            <ScrollReveal key={pillar.title} delay={idx * 0.08}>
              <HoverRevealCard>
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
                    <Typography variant="h6">{pillar.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pillar.description}
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
