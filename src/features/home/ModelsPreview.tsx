"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { FRANCHISE_MODELS } from "@/data/franchiseModels";

const MODEL_ICONS = {
  kiosk: StorefrontIcon,
  cafe: LocalCafeIcon,
} as const;

export function ModelsPreview() {
  return (
    <Section bgcolor="background.paper">
      <SectionHeading
        eyebrow="Two Formats. One Brand."
        title="Choose your INKOTEA business model"
        description="From a compact ₹2.5L kiosk to a full social café, every entrepreneur finds a way in."
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        {FRANCHISE_MODELS.map((model, idx) => {
          const Icon = MODEL_ICONS[model.key];
          const accentBg =
            model.accentColor === "primary" ? "primary.main" : "success.main";
          const accentText =
            model.accentColor === "primary"
              ? "primary.contrastText"
              : "success.contrastText";

          return (
            <ScrollReveal key={model.key} delay={idx * 0.15}>
              <Card
                sx={{
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 20px 50px -20px rgba(0,0,0,0.18)",
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: accentBg,
                    color: accentText,
                    px: 4,
                    py: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
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
                    <Icon />
                  </Box>
                  <Stack spacing={0.5}>
                    <Typography
                      variant="overline"
                      sx={{ opacity: 0.85, letterSpacing: "0.18em" }}
                    >
                      {model.format}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ color: "inherit", fontStyle: "italic" }}
                    >
                      {model.name}
                    </Typography>
                  </Stack>
                </Box>

                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={3}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ minHeight: { md: 96 } }}
                    >
                      {model.description}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip
                        label={`Investment ${model.investment}`}
                        color={model.accentColor}
                        variant="outlined"
                      />
                      <Chip
                        label={`Space ${model.spaceSqFt}`}
                        variant="outlined"
                      />
                      <Chip
                        label={`Setup ${model.setupTime}`}
                        variant="outlined"
                      />
                    </Stack>

                    <Stack spacing={1.25}>
                      {model.highlights.slice(0, 4).map((h) => (
                        <Typography
                          key={h}
                          variant="body2"
                          color="text.primary"
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1.5,
                            // Custom dot bullet rendered as a ::before
                            // pseudo-element so it inherits body2's line
                            // metrics. `1lh` then resolves to body2's line
                            // height (responsive-safe) and the calc keeps
                            // the 6px dot centered on the first line —
                            // even when the text wraps to multiple lines.
                            "&::before": {
                              content: '""',
                              flexShrink: 0,
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              bgcolor: accentBg,
                              mt: "calc((1lh - 6px) / 2)",
                            },
                          }}
                        >
                          {h}
                        </Typography>
                      ))}
                    </Stack>

                    <Button
                      component={Link}
                      href={`/franchise#${model.key}`}
                      variant="contained"
                      color={model.accentColor}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        alignSelf: "flex-start",
                        mt: 1,
                        // Force pure white over the deep olive / tea-brown
                        // backgrounds so the CTA reads sharply in light theme
                        // (the palette's `cream` contrastText looked muted).
                        color: "#fff",
                        fontWeight: 700,
                        "&:hover": { color: "#fff" },
                      }}
                    >
                      Explore {model.name}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </ScrollReveal>
          );
        })}
      </Box>

      <Stack direction="row" justifyContent="center" sx={{ mt: 6 }}>
        <Button
          component={Link}
          href="/franchise"
          variant="text"
          color="primary"
          size="large"
          endIcon={<ArrowForwardIcon />}
        >
          Compare both models in detail
        </Button>
      </Stack>
    </Section>
  );
}
