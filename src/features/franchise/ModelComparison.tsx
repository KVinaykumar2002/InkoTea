"use client";

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
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { FRANCHISE_MODELS } from "@/data/franchiseModels";

const MODEL_ICONS = {
  kiosk: StorefrontIcon,
  cafe: LocalCafeIcon,
} as const;

const SPEC_ROWS: { key: keyof (typeof FRANCHISE_MODELS)[number]; label: string }[] = [
  { key: "investment", label: "Investment" },
  { key: "spaceSqFt", label: "Space" },
  { key: "setupTime", label: "Setup time" },
  { key: "staff", label: "Staff" },
  { key: "format", label: "Format" },
  { key: "roiSpeed", label: "ROI speed" },
  { key: "target", label: "Best for" },
];

export function ModelComparison() {
  return (
    <Section bgcolor="background.default" id="models">
      <SectionHeading
        eyebrow="Choose Your Model"
        title="One brand. Two simple investment options."
        description="Both formats are profitable. They simply reward different operator profiles."
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
                    bgcolor: accentBg,
                    color: "primary.contrastText",
                    px: 4,
                    py: 4,
                  }}
                >
                  <Stack spacing={2}>
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
                          sx={{ color: "inherit", fontStyle: "italic" }}
                        >
                          {model.name}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography
                      variant="body1"
                      sx={{ color: "rgba(255,255,255,0.92)" }}
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
                              sx={{ fontWeight: 600, textAlign: "right" }}
                            >
                              {String(model[row.key])}
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
                          <Typography variant="body2">{h}</Typography>
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
