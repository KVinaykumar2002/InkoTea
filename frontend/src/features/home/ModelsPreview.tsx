"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { FRANCHISE_MODELS } from "@/data/franchiseModels";
import { BRAND_IMAGES } from "@/lib/brandImages";

const MODEL_ICONS = {
  kiosk: StorefrontIcon,
  cafe: LocalCafeIcon,
} as const;

const MODEL_HEADER_IMAGES = {
  kiosk: BRAND_IMAGES.kioskDaylight,
  cafe: BRAND_IMAGES.cafeHeroSitSipSmile,
} as const;

interface ModelsPreviewProps {
  /** Render without the outer Section wrapper (for grouped home layout). */
  embedded?: boolean;
}

export function ModelsPreview({ embedded = false }: ModelsPreviewProps) {
  const content = (
    <>
      <SectionHeading
        eyebrow="Two Formats. One Brand."
        title="One strong cafe brand. Two simple investment options."
        description="From a compact ₹2.5L kiosk for high-footfall locations to a full ₹6.5L social cafe, every entrepreneur finds a way in."
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2.5,
          maxWidth: 960,
          mx: "auto",
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
                    position: "relative",
                    bgcolor: accentBg,
                    color: accentText,
                    px: 2.5,
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    overflow: "hidden",
                    minHeight: 112,
                  }}
                >
                  <Box
                    aria-hidden
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${MODEL_HEADER_IMAGES[model.key]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: 0.4,
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
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: "rgba(255,255,255,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <Icon />
                  </Box>
                  <Stack spacing={0.5} sx={{ position: "relative", zIndex: 2 }}>
                    <Typography
                      variant="overline"
                      sx={{ opacity: 0.9, letterSpacing: "0.18em" }}
                    >
                      {model.format}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ color: "inherit", ...fontDisplayItalicSx }}
                    >
                      {model.name}
                    </Typography>
                  </Stack>
                </Box>

                <CardContent sx={{ px: 2.5, py: 2, "&:last-child": { pb: 2.5 } }}>
                  <Stack spacing={2}>
                    <Typography variant="body2" color="text.secondary">
                      {model.description}
                    </Typography>

                    <Button
                      component={Link}
                      href={`/franchise#${model.key}`}
                      variant="contained"
                      color={model.accentColor}
                      size="small"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        alignSelf: "flex-start",
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

      <Stack direction="row" justifyContent="center" sx={{ mt: 3, mb: 0 }}>
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
    </>
  );

  if (embedded) return content;

  return (
    <Section bgcolor="background.paper" pt={{ xs: 8, md: 12 }} pb={{ xs: 8, md: 12 }}>
      {content}
    </Section>
  );
}
