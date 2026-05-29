"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";
import { Section } from "@/components/common/Section";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  compactSectionPy,
  pillarCardPadding,
  pillarCardSpacing,
} from "@/components/common/pillarCardStyles";
import { BRAND } from "@/lib/brand";

/**
 * Co-Founder profile — Naresh P. Mahendra.
 *
 * Photo-less, text-only treatment by request. A warm tea-brown accent
 * card frames the eyebrow + name on the left so the section still has
 * visual structure without an avatar placeholder. Drop the bio body
 * into the right column; the section auto-stacks on mobile.
 */
export function CoFounderSection() {
  return (
    <Section
      bgcolor="background.default"
      pt={compactSectionPy}
      pb={{ xs: 2, md: 3 }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.6fr" },
          gap: { xs: 3, md: 5 },
          alignItems: "flex-start",
        }}
      >
        <ScrollReveal>
          <Box
            sx={{
              position: "relative",
              borderRadius: 4,
              p: pillarCardPadding,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              overflow: "hidden",
              boxShadow: "0 24px 60px -28px rgba(0,0,0,0.35)",
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 80% 0%, rgba(212,165,116,0.22) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <Stack spacing={pillarCardSpacing} sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                variant="overline"
                sx={{ color: "secondary.light", letterSpacing: "0.2em" }}
              >
                About the Co-Founder
              </Typography>
              <Typography
                variant="h2"
                sx={{ color: "inherit", ...fontDisplayItalicSx, lineHeight: 1.15 }}
              >
                {BRAND.coFounder.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "secondary.light",
                  fontWeight: 600,
                }}
              >
                {BRAND.coFounder.role}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ pt: 0.5 }}>
                <IconButton
                  aria-label={`${BRAND.coFounder.name} on LinkedIn`}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.14)",
                    color: "secondary.light",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.22)" },
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <Stack spacing={pillarCardSpacing}>
            <Typography variant="body1" color="text.secondary">
              Naresh P. Mahendra, the Co-Founder of INKOTEA, has been a strong
              pillar behind the brand&rsquo;s growth journey. Being one of the
              younger brothers of Founder Srinivas P. Mahendra, Naresh played
              an important role from the very beginning — including suggesting
              the brand name &ldquo;INKOTEA,&rdquo; which later became the
              identity loved by tea enthusiasts across regions.
            </Typography>

            <Typography variant="body1" color="text.secondary">
              With his practical involvement in operations, outlet setup
              support, franchise coordination, and training assistance, Naresh
              continues to contribute actively toward maintaining quality and
              consistency across INKOTEA outlets. His energetic approach and
              ground-level understanding have helped the brand expand smoothly
              into multiple cities and states.
            </Typography>
          </Stack>
        </ScrollReveal>
      </Box>
    </Section>
  );
}
