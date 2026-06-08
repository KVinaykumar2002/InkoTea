"use client";

import { fontDescriptionSx, fontDisplayItalicSx } from "@/theme/fonts";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { motion } from "framer-motion";
import { BRAND_IMAGES } from "@/lib/brandImages";

const HERO_IMG = BRAND_IMAGES.cafeOutdoorSeating;

export function OutletsHero() {
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
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
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
            "linear-gradient(180deg, rgba(26,18,11,0.55) 0%, rgba(26,18,11,0.85) 100%)",
          zIndex: 1,
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Stack
          spacing={3}
          maxWidth={760}
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Chip
            label="Our Outlets"
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
            40+ outlets and counting.
            <Box
              component="span"
              sx={{
                display: "block",
                color: "secondary.light",
                ...fontDisplayItalicSx,
              }}
            >
              Find the one nearest you.
            </Box>
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
            From Hyderabad&rsquo;s IT corridors to Vizag&rsquo;s beach road —
            INKOTEA is growing across Telangana and Andhra Pradesh.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
