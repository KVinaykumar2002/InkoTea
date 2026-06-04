"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Section } from "@/components/common/Section";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function OpenYourCityCTA() {
  return (
    <Section
      bgcolor="success.main"
      sx={{ color: "success.contrastText", overflow: "hidden", position: "relative" }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.16) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <ScrollReveal>
        <Stack
          spacing={3}
          alignItems="center"
          textAlign="center"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Typography
            variant="overline"
            sx={{ color: "rgba(255,255,255,0.85)", letterSpacing: "0.25em" }}
          >
            Don't see your city?
          </Typography>
          <Typography
            variant="h2"
            sx={{ color: "inherit", maxWidth: 720, ...fontDisplayItalicSx }}
          >
            Open your city next.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.92)", maxWidth: 560 }}
          >
            We're actively looking for franchise partners across South India.
            Apply now to bring INKOTEA to your neighbourhood.
          </Typography>
          <Button
            component={Link}
            href="/franchise"
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              width: { xs: "100%", sm: "auto" },
              minWidth: { xs: 0, sm: 240 },
            }}
          >
            Apply for Franchise
          </Button>
        </Stack>
      </ScrollReveal>
    </Section>
  );
}
