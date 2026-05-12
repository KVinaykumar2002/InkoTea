"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { BRAND } from "@/lib/brand";

const STATS = [
  { end: BRAND.metrics.outlets, label: "Active Outlets", suffix: "+" },
  {
    end: BRAND.metrics.franchisePartners,
    label: "Franchise Partners",
    suffix: "+",
  },
  {
    end: BRAND.metrics.cupsServedDaily,
    label: "Cups Served Daily",
    suffix: "+",
    separator: ",",
  },
  {
    end: BRAND.metrics.statesServed,
    label: "States — Telangana & AP",
    suffix: "",
  },
];

export function StatsStrip() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: "background.paper",
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: { xs: 4, md: 2 },
          }}
        >
          {STATS.map((stat, idx) => (
            <ScrollReveal key={stat.label} delay={idx * 0.1}>
              <AnimatedCounter
                end={stat.end}
                suffix={stat.suffix}
                separator={stat.separator}
                label={stat.label}
              />
            </ScrollReveal>
          ))}
        </Box>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mt: 6, fontStyle: "italic" }}
        >
          Expanding across Telangana, Andhra Pradesh, and beyond.
        </Typography>
      </Container>
    </Box>
  );
}
