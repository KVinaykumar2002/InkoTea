"use client";

import { fontDescriptionSx, fontDisplayItalicSx } from "@/theme/fonts";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import { FRANCHISE_USPS } from "@/data/franchiseModels";
import { BRAND_IMAGES } from "@/lib/brandImages";

const HERO_BG = BRAND_IMAGES.franchiseKioskNight;

export function FranchiseHero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        pt: { xs: 12, md: 16 },
        pb: { xs: 7, md: 9 },
        mt: { xs: -8, md: -10 },
        overflow: "hidden",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.22,
          zIndex: 0,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(62,38,21,0.55) 0%, rgba(26,18,11,0.88) 100%), radial-gradient(circle at 80% 20%, rgba(212,165,116,0.18) 0%, transparent 55%), radial-gradient(circle at 10% 80%, rgba(63,107,74,0.18) 0%, transparent 55%)",
          pointerEvents: "none",
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
            Start Your Own Tea or Cafe Business
            <Box
              component="span"
              sx={{
                display: "block",
                color: "secondary.light",
                ...fontDisplayItalicSx,
              }}
            >
              with INKOTEA
            </Box>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              ...fontDescriptionSx,
              color: "rgba(255,255,255,0.88)",
              fontWeight: 400,
              maxWidth: 620,
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
            sx={{ mt: 1 }}
          >
            {FRANCHISE_USPS.map((usp, idx) => {
              const isInvestmentUsp = idx < 2;
              return (
              <Stack
                key={usp}
                direction="row"
                spacing={0.75}
                alignItems="center"
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 999,
                  bgcolor: isInvestmentUsp
                    ? "rgba(212,165,116,0.22)"
                    : "rgba(255,255,255,0.08)",
                  border: isInvestmentUsp
                    ? "1px solid rgba(212,165,116,0.55)"
                    : "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <CheckCircleIcon
                  sx={{
                    color: isInvestmentUsp ? "secondary.main" : "secondary.light",
                    fontSize: 18,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.95)",
                    fontWeight: isInvestmentUsp ? 700 : 500,
                  }}
                >
                  {usp}
                </Typography>
              </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
