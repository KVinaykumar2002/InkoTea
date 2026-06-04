"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import CheckIcon from "@mui/icons-material/Check";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { compactSectionHeadingSx } from "@/components/common/pillarCardStyles";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  FRANCHISE_MODELS,
  formatStartingFromInvestment,
} from "@/data/franchiseModels";
import { BRAND_IMAGES } from "@/lib/brandImages";

const MODEL_ICONS = {
  kiosk: StorefrontIcon,
  cafe: LocalCafeIcon,
} as const;

const MODEL_HEADER_IMAGES = {
  kiosk: BRAND_IMAGES.franchiseKioskNight,
  cafe: BRAND_IMAGES.franchiseCafeStorefront,
} as const;

/**
 * Per-image focus point so the portrait source photos crop to the most
 * distinctive band inside the wide card headers — see
 * `FranchiseHero.SHOWCASE_IMAGES` for the same reasoning.
 */
const MODEL_HEADER_FOCUS: Record<keyof typeof MODEL_HEADER_IMAGES, string> = {
  kiosk: "center 38%",
  cafe: "center 28%",
};

const SPEC_ROWS: { key: keyof (typeof FRANCHISE_MODELS)[number]; label: string }[] = [
  { key: "investment", label: "Investment" },
  { key: "spaceSqFt", label: "Minimum Space" },
  { key: "setupTime", label: "Setup time" },
  { key: "staff", label: "Staff" },
  { key: "format", label: "Format" },
  { key: "roiSpeed", label: "ROI speed" },
  { key: "target", label: "Best for" },
];

export function ModelComparison() {
  return (
    <Section
      bgcolor="background.default"
      id="models"
      pt={{ xs: 4, md: 5 }}
      pb={{ xs: 2, md: 3 }}
    >
      <SectionHeading
        eyebrow="Choose Your Model"
        title="One strong cafe brand. Two simple investment options."
        description="Both formats are profitable — they simply reward different operator profiles, locations and ambitions."
        sx={compactSectionHeadingSx}
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
          const accentBgSoft =
            model.accentColor === "primary"
              ? "rgba(92,58,33,0.06)"
              : "rgba(63,107,74,0.06)";

          return (
            <ScrollReveal key={model.key} delay={idx * 0.12}>
              <Card
                id={model.key}
                sx={{
                  height: "100%",
                  scrollMarginTop: { xs: 80, md: 100 },
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    bgcolor: accentBg,
                    color: "primary.contrastText",
                    px: { xs: 3, md: 4 },
                    py: { xs: 3, md: 4 },
                    overflow: "hidden",
                    aspectRatio: { xs: "5 / 4", md: "16 / 10" },
                    minHeight: { xs: 260, md: 320 },
                  }}
                >
                  <Box
                    aria-hidden
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${MODEL_HEADER_IMAGES[model.key]})`,
                      backgroundSize: "cover",
                      backgroundPosition: MODEL_HEADER_FOCUS[model.key],
                      opacity: 0.42,
                      zIndex: 0,
                    }}
                  />
                  <Box
                    aria-hidden
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)",
                      zIndex: 1,
                    }}
                  />
                  <Stack spacing={2} sx={{ position: "relative", zIndex: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          bgcolor: "rgba(255,255,255,0.18)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <Icon fontSize="medium" />
                      </Box>
                      <Stack>
                        <Typography
                          variant="overline"
                          sx={{ opacity: 0.85, letterSpacing: "0.18em" }}
                        >
                          {model.format}
                        </Typography>
                        <Typography
                          variant="h3"
                          sx={{ color: "inherit", ...fontDisplayItalicSx }}
                        >
                          {model.name}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography
                      variant="body1"
                      sx={{ color: "rgba(255,255,255,0.95)" }}
                    >
                      {model.tagline}
                    </Typography>
                  </Stack>
                </Box>

                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={3}>
                    <Typography variant="body1" color="text.secondary">
                      {model.description}
                    </Typography>

                    <Box
                      sx={{
                        bgcolor: accentBgSoft,
                        borderRadius: 2,
                        p: 2.5,
                      }}
                    >
                      <Stack spacing={1.5}>
                        {SPEC_ROWS.map((row) => (
                          <Stack
                            key={row.key}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            spacing={2}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ minWidth: 100 }}
                            >
                              {row.label}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                textAlign: "right",
                                color: "text.secondary",
                              }}
                            >
                              {row.key === "investment"
                                ? formatStartingFromInvestment(
                                    String(model.investment),
                                  )
                                : String(model[row.key])}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Box>

                    <Divider />

                    <Stack spacing={1.5}>
                      <Typography variant="overline" color="text.secondary">
                        Highlights
                      </Typography>
                      {model.highlights.map((h) => (
                        <Stack
                          key={h}
                          direction="row"
                          spacing={1.5}
                          alignItems="flex-start"
                        >
                          <CheckIcon
                            sx={{
                              color: accentBg,
                              fontSize: 20,
                              mt: "2px",
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {h}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>

                    <Divider />

                    <Stack spacing={1.5}>
                      <Typography variant="overline" color="text.secondary">
                        Ideal Locations
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {model.idealLocations.map((loc) => (
                          <Chip
                            key={loc}
                            label={loc}
                            size="small"
                            color={model.accentColor}
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Stack>
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
