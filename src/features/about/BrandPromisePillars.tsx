"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SpaIcon from "@mui/icons-material/Spa";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import NoFoodIcon from "@mui/icons-material/NoFood";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { BRAND_PROMISE_PILLARS } from "@/data/competitors";

const ICONS = {
  Spa: SpaIcon,
  LocalFlorist: LocalFloristIcon,
  WaterDrop: WaterDropIcon,
  LocalDrink: LocalDrinkIcon,
  NoFood: NoFoodIcon,
  Whatshot: WhatshotIcon,
  Verified: VerifiedIcon,
  EmojiFoodBeverage: EmojiFoodBeverageIcon,
} as const;

export function BrandPromisePillars() {
  return (
    <Section bgcolor="background.paper">
      <SectionHeading
        eyebrow="What's in every cup"
        title="The careful the selection, the tastier the tea"
        description="Quality is not a marketing line. It's eight non-negotiable standards that every INKOTEA outlet follows, every shift, every day."
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {BRAND_PROMISE_PILLARS.map((pillar, idx) => {
          const Icon = ICONS[pillar.icon as keyof typeof ICONS];
          return (
            <ScrollReveal key={pillar.title} delay={idx * 0.06}>
              <Stack
                spacing={1.5}
                alignItems="flex-start"
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 3,
                  bgcolor: "background.default",
                  border: (t) => `1px solid ${t.palette.divider}`,
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "primary.main",
                    boxShadow: "0 14px 40px -16px rgba(0,0,0,0.18)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    bgcolor: "secondary.light",
                    color: "primary.dark",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {Icon ? <Icon fontSize="small" /> : null}
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {pillar.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pillar.text}
                </Typography>
              </Stack>
            </ScrollReveal>
          );
        })}
      </Box>
    </Section>
  );
}
