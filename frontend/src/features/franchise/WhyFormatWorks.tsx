"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VerifiedIcon from "@mui/icons-material/Verified";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PlaceIcon from "@mui/icons-material/Place";
import Diversity3Icon from "@mui/icons-material/Diversity3";
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
import { WHY_FORMAT_WORKS } from "@/data/franchiseModels";

const ICONS = {
  Verified: VerifiedIcon,
  Handshake: HandshakeIcon,
  Place: PlaceIcon,
  Diversity3: Diversity3Icon,
} as const;

/**
 * Why-it-works confidence builder modeled on the Social Cafe brochure
 * (page 8). Sits above the apply form on the franchise page so partners
 * see the proof points right before converting.
 */
export function WhyFormatWorks() {
  return (
    <Section
      bgcolor="background.default"
      pt={{ xs: 4, md: 5 }}
      pb={compactSectionPy}
    >
      <SectionHeading
        eyebrow="Why It Works Today"
        title="Why the INKOTEA format works in today's market"
        description="A proven foundation, comprehensive support and a flexible footprint — engineered for India's next phase of consumer growth."
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
          gap: 3,
        }}
      >
        {WHY_FORMAT_WORKS.map((reason, idx) => {
          const Icon = ICONS[reason.icon as keyof typeof ICONS];
          return (
            <ScrollReveal key={reason.title} delay={idx * 0.08}>
              <HoverRevealCard>
                <Box sx={compactCardContentSx}>
                  <Stack spacing={pillarCardSpacing}>
                    <Box
                      sx={{
                        ...pillarIconSx,
                        bgcolor: "secondary.light",
                        color: "primary.dark",
                      }}
                    >
                      {Icon ? <Icon /> : null}
                    </Box>
                    <Typography variant="h6">{reason.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {reason.description}
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
