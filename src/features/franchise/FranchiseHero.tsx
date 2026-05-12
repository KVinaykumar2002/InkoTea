"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import { FRANCHISE_USPS } from "@/data/franchiseModels";

export function FranchiseHero() {
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
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 80% 20%, rgba(212,165,116,0.22) 0%, transparent 55%), radial-gradient(circle at 10% 80%, rgba(63,107,74,0.18) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Stack
          spacing={4}
          maxWidth={840}
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
              maxWidth: 720,
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
            sx={{ mt: 2 }}
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
      </Container>
    </Box>
  );
}
