"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CoffeeIcon from "@mui/icons-material/Coffee";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { REVENUE_STREAMS } from "@/data/competitors";

const ICONS = {
  Coffee: CoffeeIcon,
  Restaurant: RestaurantIcon,
  ShoppingBag: ShoppingBagIcon,
  Handshake: HandshakeIcon,
} as const;

export function RevenueStreams() {
  return (
    <Section bgcolor="background.default" pt={{ xs: 4, md: 5 }} pb={0}>
      <SectionHeading
        eyebrow="Revenue Streams"
        title="Multiple compounding sources of growth"
        description="Beyond the daily cup. Each stream layers on top of the next."
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
        {REVENUE_STREAMS.map((stream, idx) => {
          const Icon = ICONS[stream.icon as keyof typeof ICONS];
          return (
            <ScrollReveal key={stream.title} delay={idx * 0.08}>
              <Stack
                spacing={2}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 3,
                  bgcolor: "background.paper",
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
                    bgcolor: "secondary.light",
                    color: "primary.dark",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {Icon ? <Icon fontSize="small" /> : null}
                </Box>
                <Typography variant="h6">{stream.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {stream.text}
                </Typography>
              </Stack>
            </ScrollReveal>
          );
        })}
      </Box>
    </Section>
  );
}
