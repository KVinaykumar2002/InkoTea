"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PaymentsIcon from "@mui/icons-material/Payments";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { UNIT_ECONOMICS } from "@/data/franchiseModels";

const ICONS = [TrendingUpIcon, PaymentsIcon, EventAvailableIcon];

export function UnitEconomics() {
  return (
    <Section bgcolor="background.default">
      <SectionHeading
        eyebrow="Cafe Business Potential"
        title="Predictable cashflow. Healthy margins."
        description="Illustrative ranges for the Social Cafe format, based on operating outlets across Telangana. Actual numbers vary with location and execution."
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        {UNIT_ECONOMICS.map((kpi, idx) => {
          const Icon = ICONS[idx];
          return (
            <ScrollReveal key={kpi.label} delay={idx * 0.1}>
              <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
                <CardContent>
                  <Stack alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        bgcolor: "secondary.light",
                        color: "primary.dark",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {Icon ? <Icon /> : null}
                    </Box>
                    <Typography variant="overline" color="text.secondary">
                      {kpi.label}
                    </Typography>
                    <Typography variant="h2" color="primary.main">
                      {kpi.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {kpi.description}
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
