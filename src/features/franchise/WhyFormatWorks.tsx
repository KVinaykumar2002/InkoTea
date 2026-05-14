"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import VerifiedIcon from "@mui/icons-material/Verified";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PlaceIcon from "@mui/icons-material/Place";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { WHY_FORMAT_WORKS } from "@/data/franchiseModels";

const ICONS = {
  Verified: VerifiedIcon,
  Handshake: HandshakeIcon,
  Place: PlaceIcon,
  Diversity3: Diversity3Icon,
} as const;

/**
 * Why-it-works confidence builder modeled on the Social Café brochure
 * (page 8). Sits above the apply form on the franchise page so partners
 * see the proof points right before converting.
 */
export function WhyFormatWorks() {
  return (
    <Section bgcolor="background.default">
      <SectionHeading
        eyebrow="Why It Works Today"
        title="Why the INKOTEA format works in today's market"
        description="A proven foundation, comprehensive support and a flexible footprint — engineered for India's next phase of consumer growth."
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
              <Card sx={{ height: "100%", p: 1 }}>
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
                    <Typography variant="h6">{reason.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {reason.description}
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
