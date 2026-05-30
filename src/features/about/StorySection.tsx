"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import { motion } from "framer-motion";

import { BRAND_IMAGES } from "@/lib/brandImages";

// Real INKOTEA kiosk at night with a crowd — sets the "single kiosk
// in Hyderabad" origin-story tone for the About page.
const HERO_IMG = BRAND_IMAGES.kioskNightCrowd;

export function StorySection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        pt: { xs: 12, md: 18 },
        pb: { xs: 10, md: 16 },
        mt: { xs: -8, md: -10 },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          // Brand olive-green as the underlying paint so the section never
          // looks empty if the remote image fails.
          bgcolor: "#3F4A1C",
          backgroundImage: `url(${HERO_IMG}), linear-gradient(135deg, #5C6B2C 0%, #3F4A1C 100%)`,
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
          opacity: 0.18,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(62,38,21,0.6), rgba(26,18,11,0.85))",
          zIndex: 1,
        }}
      />
      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 2 }}
        component={motion.div}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Stack spacing={4} maxWidth={820}>
          <Chip
            label="Our Story"
            sx={{
              alignSelf: "flex-start",
              bgcolor: "rgba(212,165,116,0.18)",
              color: "secondary.light",
              border: "1px solid rgba(212,165,116,0.4)",
              fontWeight: 600,
              letterSpacing: "0.12em",
              fontSize: "var(--font-size-xs)",
              textTransform: "uppercase",
            }}
          />
          <Typography variant="h1" sx={{ color: "inherit" }}>
            One More Cup.
            <Box
              component="span"
              sx={{
                display: "block",
                color: "secondary.light",
                ...fontDisplayItalicSx,
              }}
            >
              One More Success.
            </Box>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255,255,255,0.88)",
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: 700,
            }}
          >
            <Box component="strong" sx={{ color: "secondary.light" }}>
              Inko
            </Box>{" "}
            means &ldquo;One More&rdquo; in Telugu — our motto celebrates the
            joy of that perfect cup you can&rsquo;t resist. Founded in 2021 in
            Hyderabad, INKOTEA has grown to 40+ outlets across India, bringing
            comfort, affordability and quality in every serving — and is now
            expanding aggressively through our Social Cafe format.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
