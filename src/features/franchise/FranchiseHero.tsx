"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import { motion } from "framer-motion";
import { FRANCHISE_USPS } from "@/data/franchiseModels";
import { BRAND_IMAGES } from "@/lib/brandImages";

/**
 * Two-image brand showcase rendered on the right side of the franchise hero
 * (or stacked below the copy on mobile). Visually anchors the "Two formats.
 * One brand." promise with real outlet photography from the brochures.
 * Will later be swapped for the Lottie/scroll animation slot.
 */
/**
 * Per-image `background-position` so the portrait source photos crop to
 * their most distinctive subject area inside the landscape showcase cards:
 *   - Kiosk : keep the green "INKOTEA" neon header + the vendor visible.
 *   - Café  : keep the "INKOTEA Social Cafe — Sit. Sip. Smile." sign band
 *             visible at the top of the strip rather than the sidewalk.
 */
const SHOWCASE_IMAGES = [
  {
    src: BRAND_IMAGES.franchiseKioskNight,
    label: "Kiosk Model",
    sub: "From \u20B92.5L",
    icon: StorefrontIcon,
    focus: "center 38%",
  },
  {
    src: BRAND_IMAGES.franchiseCafeStorefront,
    label: "Social Caf\u00E9 Model",
    sub: "From \u20B96.5L",
    icon: LocalCafeIcon,
    focus: "center 28%",
  },
] as const;

// The franchise-page hero background reuses the brand kiosk shot for the
// high-energy "Indian street culture" feel.
const HERO_BG = BRAND_IMAGES.franchiseKioskNight;

export function FranchiseHero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        pt: { xs: 12, md: 16 },
        pb: { xs: 10, md: 14 },
        mt: { xs: -8, md: -10 },
        overflow: "hidden",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.22,
          zIndex: 0,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(62,38,21,0.55) 0%, rgba(26,18,11,0.88) 100%), radial-gradient(circle at 80% 20%, rgba(212,165,116,0.18) 0%, transparent 55%), radial-gradient(circle at 10% 80%, rgba(63,107,74,0.18) 0%, transparent 55%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.1fr 1fr" },
            gap: { xs: 6, lg: 8 },
            alignItems: "center",
          }}
        >
          <Stack
            spacing={4}
            component={motion.div}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Chip
              label="Franchise Opportunity"
              sx={{
                alignSelf: "flex-start",
                bgcolor: "rgba(212,165,116,0.18)",
                color: "secondary.light",
                border: "1px solid rgba(212,165,116,0.35)",
                fontWeight: 600,
                letterSpacing: "0.12em",
                fontSize: "0.7rem",
                textTransform: "uppercase",
              }}
            />
            <Typography variant="h1" sx={{ color: "inherit" }}>
              Start Your Own Tea or Café Business
              <Box
                component="span"
                sx={{
                  display: "block",
                  color: "secondary.light",
                  fontStyle: "italic",
                }}
              >
                with INKOTEA
              </Box>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "rgba(255,255,255,0.88)",
                fontWeight: 400,
                maxWidth: 620,
                lineHeight: 1.55,
              }}
            >
              Two scalable formats. One proven brand. Pick the model that fits
              your investment, your city, and your ambition.
            </Typography>

            <Stack
              direction="row"
              spacing={1.5}
              flexWrap="wrap"
              useFlexGap
              sx={{ mt: 1 }}
            >
              {FRANCHISE_USPS.map((usp) => (
                <Stack
                  key={usp}
                  direction="row"
                  spacing={0.75}
                  alignItems="center"
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 999,
                    bgcolor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <CheckCircleIcon
                    sx={{ color: "secondary.light", fontSize: 18 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.95)", fontWeight: 500 }}
                  >
                    {usp}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>

          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", lg: "1fr" },
              gap: { xs: 2, lg: 2.5 },
              // Cap the desktop column to ~80% of its grid track so the cards
              // (and the section as a whole) read as a focused brand-strip,
              // not a wall of imagery. Anchored right to preserve the
              // staggered offset on the second card.
              width: { lg: "80%" },
              justifySelf: { lg: "end" },
            }}
          >
            {SHOWCASE_IMAGES.map(({ src, label, sub, icon: Icon, focus }, idx) => (
              <Box
                key={label}
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                  // Sources are portrait (≈ 2:3). Cards mirror that on small
                  // screens, and stretch to a calmer 4:3 on desktop so the
                  // signage + subject fit without being chopped.
                  aspectRatio: { xs: "3 / 4", sm: "4 / 5", lg: "4 / 3" },
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 24px 60px -24px rgba(0,0,0,0.6)",
                  // Slight stagger of the second card on large screens so the
                  // pair reads as a deliberate brand-strip, not a flat grid.
                  transform: {
                    lg: idx === 1 ? "translateX(20px)" : "translateX(-10px)",
                  },
                  transition: "transform 0.4s ease",
                  "&:hover": {
                    transform: { lg: "translateY(-4px)" },
                  },
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                    backgroundPosition: focus,
                  }}
                />
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.78) 100%)",
                  }}
                />
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{
                    position: "absolute",
                    left: 16,
                    right: 16,
                    bottom: 16,
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1.5,
                      bgcolor: "rgba(212,165,116,0.92)",
                      color: "primary.dark",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  <Stack spacing={0}>
                    <Typography
                      variant="overline"
                      sx={{
                        color: "secondary.light",
                        letterSpacing: "0.16em",
                        lineHeight: 1.2,
                      }}
                    >
                      {sub}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#fff",
                        fontStyle: "italic",
                        lineHeight: 1.2,
                      }}
                    >
                      {label}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
