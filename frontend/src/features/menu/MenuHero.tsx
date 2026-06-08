"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { motion } from "framer-motion";

import { SafeImage } from "@/components/common/SafeImage";
import { fontDescriptionSx } from "@/theme/fonts";
import { BRAND_IMAGES } from "@/lib/brandImages";

/** Beverages + bakes spread from the Social Cafe brochure. */
const HERO_IMG = BRAND_IMAGES.cafeMenuSpread;

export function MenuHero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        pt: { xs: 14, md: 20 },
        pb: { xs: 10, md: 14 },
        mt: { xs: -8, md: -10 },
        overflow: "hidden",
        minHeight: { xs: 380, md: 480 },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <SafeImage
          src={HERO_IMG}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 42%" }}
        />
      </Box>

      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(42,51,24,0.94) 0%, rgba(47,56,26,0.82) 38%, rgba(26,18,11,0.55) 72%, rgba(26,18,11,0.35) 100%)",
          zIndex: 1,
        }}
      />

      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 50%, rgba(212,165,116,0.12) 0%, transparent 55%)",
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Stack
          spacing={3}
          maxWidth={720}
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Chip
            label="Our Products"
            sx={{
              alignSelf: "flex-start",
              bgcolor: "rgba(212,165,116,0.18)",
              color: "secondary.light",
              border: "1px solid rgba(212,165,116,0.4)",
              fontWeight: 600,
              letterSpacing: "0.12em",
              fontSize: "0.7rem",
              textTransform: "uppercase",
            }}
          />
          <Typography variant="h1" sx={{ color: "inherit" }}>
            Crafted for everyday moments.
          </Typography>
          <Typography
            variant="h5"
            sx={{
              ...fontDescriptionSx,
              color: "rgba(255,255,255,0.88)",
              fontWeight: 400,
              lineHeight: 1.55,
            }}
          >
            From hand-pounded ginger chai to oven-fresh comfort bites — every
            INKOTEA item is built for that one more sip, one more bite.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
