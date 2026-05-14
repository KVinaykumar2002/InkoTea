"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import KitchenIcon from "@mui/icons-material/Kitchen";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { KIOSK_INVESTMENT_BUCKETS } from "@/data/franchiseModels";

const ICONS = {
  Kitchen: KitchenIcon,
  Inventory2: Inventory2Icon,
  Lightbulb: LightbulbIcon,
} as const;

/**
 * Kiosk Model investment breakdown — sourced from the Kiosk brochure.
 * Renders the 3-bucket structure (Equipment / Raw Materials / Branding)
 * around a single ₹2.5L total, sitting between the model comparison and
 * the café investment packages on the franchise page.
 */
export function KioskInvestmentBreakdown() {
  return (
    <Section bgcolor="background.default" id="kiosk-breakdown">
      <SectionHeading
        eyebrow="Kiosk Model — Investment Breakdown"
        title="Start your INKOTEA Kiosk from ₹2.5 Lakhs"
        description="Optimised for first-time entrepreneurs and small investors. Total investment is structured into three clear buckets you can plan against."
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
          gap: 3,
          alignItems: "stretch",
        }}
      >
        <ScrollReveal>
          <Card
            sx={{
              height: "100%",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 80% 20%, rgba(212,165,116,0.22) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <CardContent
              sx={{
                p: 4,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                gap: 2,
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <StorefrontIcon />
                </Box>
                <Typography
                  variant="overline"
                  sx={{ opacity: 0.85, letterSpacing: "0.18em" }}
                >
                  Total Investment
                </Typography>
              </Stack>

              <Typography
                variant="h1"
                sx={{
                  color: "secondary.light",
                  fontStyle: "italic",
                  lineHeight: 1.05,
                }}
              >
                ₹2.5L
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "rgba(255,255,255,0.9)" }}
              >
                Compact, branded kiosk built for high-footfall locations.
                Minimum 150 sq ft. 7 – 10 day setup. Investment recovery
                target of 8 – 10 months.
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                sx={{ mt: "auto", pt: 2 }}
              >
                <Chip
                  label="Daily ₹5K – ₹15K+"
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.12)",
                    color: "secondary.light",
                    border: "1px solid rgba(255,255,255,0.2)",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label="150 sq ft min"
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.12)",
                    color: "secondary.light",
                    border: "1px solid rgba(255,255,255,0.2)",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label="Recovery 8 – 10 mo"
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.12)",
                    color: "secondary.light",
                    border: "1px solid rgba(255,255,255,0.2)",
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </ScrollReveal>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          {KIOSK_INVESTMENT_BUCKETS.map((bucket, idx) => {
            const Icon = ICONS[bucket.icon as keyof typeof ICONS];
            return (
              <ScrollReveal key={bucket.key} delay={idx * 0.08}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Stack spacing={2}>
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
                        {Icon ? <Icon /> : null}
                      </Box>
                      <Typography variant="h6">{bucket.label}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.55 }}
                      >
                        {bucket.detail}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </Box>
      </Box>

      <Typography
        variant="caption"
        align="center"
        display="block"
        color="text.secondary"
        sx={{ mt: 4, fontStyle: "italic" }}
      >
        Indicative daily gross sales of ₹5,000 – ₹15,000+ depending on footfall
        and operations. Actual results vary based on location and execution.
      </Typography>
    </Section>
  );
}
