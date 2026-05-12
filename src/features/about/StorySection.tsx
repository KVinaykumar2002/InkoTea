"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import { motion } from "framer-motion";

const HERO_IMG =
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2000&q=70";

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
              fontSize: "0.7rem",
              textTransform: "uppercase",
            }}
          />
          <Typography variant="h1" sx={{ color: "inherit" }}>
            India runs on chai.
            <Box
              component="span"
              sx={{
                display: "block",
                color: "secondary.light",
                fontStyle: "italic",
              }}
            >
              We're giving it structure.
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
            INKOTEA was founded to organize India's most-loved beverage into a
            scalable retail brand — without losing its emotion. From a single
            kiosk in Hyderabad to 40+ outlets across Telangana and AP.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
