"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { motion } from "framer-motion";

import { SafeImage } from "@/components/common/SafeImage";
import { BRAND_IMAGES } from "@/lib/brandImages";

/** Beverages + bakes spread from the Social Café brochure. */
const HERO_IMG = BRAND_IMAGES.cafeMenuSpread;

export function MenuHero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 10 },
        mt: { xs: -8, md: -10 },
        overflow: "hidden",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #5C6B2C 0%, #3F4A1C 50%, #2A3318 100%)",
          zIndex: 0,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 85% 30%, rgba(212,165,116,0.14) 0%, transparent 55%)",
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.05fr 1fr" },
            gap: { xs: 5, lg: 6 },
            alignItems: "center",
          }}
        >
          <Stack
            spacing={3}
            maxWidth={640}
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
                color: "rgba(255,255,255,0.88)",
                fontWeight: 400,
                lineHeight: 1.55,
              }}
            >
              From hand-pounded ginger chai to oven-fresh comfort bites — every
              INKOTEA item is built for that one more sip, one more bite.
            </Typography>
          </Stack>

          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: { xs: 520, lg: "none" },
              mx: { xs: "auto", lg: 0 },
            }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
                aspectRatio: { xs: "4 / 3", md: "5 / 4" },
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 28px 70px -24px rgba(0,0,0,0.55)",
              }}
            >
              <SafeImage
                src={HERO_IMG}
                alt="INKOTEA menu — signature teas, coffee and comfort bites"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 520px"
                style={{ objectFit: "cover", objectPosition: "center 42%" }}
              />
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(26,18,11,0.02) 0%, rgba(26,18,11,0.35) 100%)",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
