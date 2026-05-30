"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";

export function InvestorHero() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#0F0905",
        color: "#F5EFE5",
        pt: { xs: 14, md: 20 },
        pb: { xs: 12, md: 16 },
        mt: { xs: -8, md: -10 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 10% 30%, rgba(212,165,116,0.18) 0%, transparent 55%), radial-gradient(circle at 90% 70%, rgba(63,107,74,0.18) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          spacing={4}
          maxWidth={840}
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Chip
            label="Investor Relations"
            sx={{
              alignSelf: "flex-start",
              bgcolor: "rgba(212,165,116,0.18)",
              color: "secondary.light",
              border: "1px solid rgba(212,165,116,0.4)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              fontSize: "var(--font-size-xs)",
              textTransform: "uppercase",
            }}
          />
          <Typography variant="h1" sx={{ color: "inherit" }}>
            Building India's most accessible
            <Box
              component="span"
              sx={{
                display: "block",
                color: "secondary.light",
                ...fontDisplayItalicSx,
              }}
            >
              beverage retail brand.
            </Box>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(245,239,229,0.85)",
              fontWeight: 400,
              lineHeight: 1.55,
              maxWidth: 720,
            }}
          >
            INKOTEA is positioned at the intersection of India's largest
            beverage category and its fastest-growing cafe culture. Here's how
            we plan to scale.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Talk to investor desk
            </Button>
            <Button
              href="#deck"
              variant="outlined"
              size="large"
              sx={{
                color: "inherit",
                borderColor: "rgba(245,239,229,0.4)",
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.06)",
                },
              }}
            >
              View opportunity
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
