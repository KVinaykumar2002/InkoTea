"use client";

import { fontDescriptionSx, fontDisplayItalicSx } from "@/theme/fonts";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import { DEFAULT_FRANCHISE_CONTENT } from "@shared/pageContent";
import { usePageContent } from "@/hooks/useApiContent";
import { resolveMediaUrl } from "@/lib/resolveMediaUrl";

export function FranchiseHero() {
  const { content } = usePageContent("franchise", DEFAULT_FRANCHISE_CONTENT);

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
          backgroundImage: `url(${resolveMediaUrl(content.backgroundImage)})`,
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
            label={content.chip}
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
            {content.title}
            <Box
              component="span"
              sx={{
                display: "block",
                color: "secondary.light",
                ...fontDisplayItalicSx,
              }}
            >
              {content.titleAccent}
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
            {content.subtitle}
          </Typography>

          <Stack
            direction="row"
            spacing={1.5}
            flexWrap="wrap"
            useFlexGap
            sx={{ mt: 1 }}
          >
            {content.usps.map((usp) => (
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
