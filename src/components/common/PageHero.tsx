"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { motion } from "framer-motion";
import { fontDisplayItalicSx } from "@/theme/fonts";

interface Props {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  variant?: "light" | "dark";
}

/**
 * Reusable page hero used across content pages (Blog, FAQ, Outlets, Contact,
 * Why). Lives in a client boundary so theme callback `sx` props don't cross
 * the RSC serialization boundary.
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  variant = "light",
}: Props) {
  const isDark = variant === "dark";
  return (
    <Box
      component="section"
      sx={{
        bgcolor: isDark ? "primary.main" : "background.paper",
        color: isDark ? "primary.contrastText" : "text.primary",
        pt: { xs: 12, md: 18 },
        pb: { xs: 8, md: 10 },
        mt: { xs: -8, md: -10 },
        borderBottom: 1,
        borderColor: isDark ? "transparent" : "divider",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={3}
          maxWidth={760}
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Chip
            label={eyebrow}
            color={isDark ? "secondary" : "primary"}
            sx={{
              alignSelf: "flex-start",
              fontWeight: 700,
              letterSpacing: "0.12em",
              fontSize: "var(--font-size-xs)",
              textTransform: "uppercase",
              ...(isDark && {
                bgcolor: "rgba(212,165,116,0.18)",
                color: "secondary.light",
                border: "1px solid rgba(212,165,116,0.4)",
              }),
            }}
          />
          <Typography variant="h1" sx={{ color: "inherit" }}>
            {title}
            {highlight ? (
              <Box
                component="span"
                sx={{
                  display: "block",
                  color: isDark ? "secondary.light" : "primary.main",
                  ...fontDisplayItalicSx,
                }}
              >
                {highlight}
              </Box>
            ) : null}
          </Typography>
          {description ? (
            <Typography
              variant="h5"
              sx={{
                color: isDark ? "rgba(255,255,255,0.85)" : "text.secondary",
                fontWeight: 400,
                lineHeight: 1.55,
              }}
            >
              {description}
            </Typography>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}
