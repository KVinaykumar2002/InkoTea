"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { motion } from "framer-motion";

const HERO_IMG =
  "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=2000&q=70";

export function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "100vh", md: "92vh" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        color: "#fff",
        mt: { xs: -8, md: -10 },
        pt: { xs: 8, md: 10 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.55) saturate(1.1)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(26,18,11,0.25) 0%, rgba(26,18,11,0.55) 60%, rgba(26,18,11,0.85) 100%)",
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, py: 8 }}>
        <Stack
          spacing={4}
          maxWidth={780}
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Chip
            label="The Feeling of One More"
            sx={{
              alignSelf: "flex-start",
              bgcolor: "rgba(212, 165, 116, 0.18)",
              color: "secondary.light",
              border: "1px solid rgba(212, 165, 116, 0.4)",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontSize: "0.7rem",
              backdropFilter: "blur(8px)",
            }}
          />
          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              fontWeight: 700,
              maxWidth: 720,
            }}
          >
            India's Chai Culture.
            <Box
              component="span"
              sx={{
                display: "block",
                color: "secondary.light",
                fontStyle: "italic",
              }}
            >
              Reimagined for Today.
            </Box>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255,255,255,0.88)",
              fontWeight: 400,
              maxWidth: 620,
              lineHeight: 1.5,
            }}
          >
            From street-side chai to modern café spaces — INKOTEA is building
            India's most accessible beverage brand. 40+ outlets and growing.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button
              component={Link}
              href="/franchise"
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ minWidth: 220 }}
            >
              Explore Franchise
            </Button>
            <Button
              component={Link}
              href="/outlets"
              variant="outlined"
              size="large"
              startIcon={<StorefrontIcon />}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.5)",
                minWidth: 220,
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Find Nearest Outlet
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        sx={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          display: { xs: "none", md: "block" },
        }}
      >
        <Typography
          variant="caption"
          sx={{ letterSpacing: "0.3em", textTransform: "uppercase" }}
        >
          Scroll to explore
        </Typography>
      </Box>
    </Box>
  );
}
