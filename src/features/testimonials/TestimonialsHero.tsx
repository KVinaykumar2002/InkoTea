"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { motion } from "framer-motion";
import { fontDescriptionSx, fontDisplayItalicSx } from "@/theme/fonts";
import { BRAND_IMAGES } from "@/lib/brandImages";

const HERO_IMG = BRAND_IMAGES.cafeFriendsChat;

export function TestimonialsHero() {
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

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <Stack
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          spacing={2}
          alignItems="center"
          textAlign="center"
        >
          <Chip
            label="Testimonials"
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.12)",
              color: "inherit",
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          />
          <Typography
            variant="h1"
            sx={{
              ...fontDisplayItalicSx,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              maxWidth: 640,
            }}
          >
            What Our Customers Say
          </Typography>
          <Typography
            variant="body1"
            sx={{
              ...fontDescriptionSx,
              color: "rgba(255,255,255,0.82)",
              maxWidth: 520,
              lineHeight: 1.7,
            }}
          >
            Real stories from chai lovers, cafe regulars and families who keep
            coming back for one more cup.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
