"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { motion } from "framer-motion";

const HERO_IMG =
  "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?auto=format&fit=crop&w=2000&q=70";

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
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.28,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(62,38,21,0.4) 0%, rgba(26,18,11,0.85) 100%)",
          zIndex: 1,
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Stack
          spacing={4}
          maxWidth={760}
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Chip
            label="Our Menu"
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
      </Container>
    </Box>
  );
}
