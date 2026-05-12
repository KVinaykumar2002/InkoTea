"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import IconButton from "@mui/material/IconButton";
import { Section } from "@/components/common/Section";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { BRAND } from "@/lib/brand";

const FOUNDER_IMG =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80";

export function FounderSection() {
  return (
    <Section bgcolor="background.paper">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.5fr" },
          gap: { xs: 5, md: 8 },
          alignItems: "center",
        }}
      >
        <ScrollReveal>
          <Box
            sx={{
              position: "relative",
              maxWidth: 360,
              mx: { xs: "auto", md: 0 },
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                inset: -16,
                borderRadius: 4,
                bgcolor: "secondary.light",
                opacity: 0.45,
                transform: "rotate(-3deg)",
                zIndex: 0,
              }}
            />
            <Avatar
              src={FOUNDER_IMG}
              alt={BRAND.founder.name}
              variant="rounded"
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 320, md: 400 },
                borderRadius: 4,
                zIndex: 1,
                boxShadow: "0 20px 60px -20px rgba(0,0,0,0.3)",
              }}
            />
          </Box>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <Stack spacing={3}>
            <Typography
              variant="overline"
              sx={{ color: "secondary.dark", letterSpacing: "0.2em" }}
            >
              About the Founder
            </Typography>
            <Typography variant="h2">{BRAND.founder.name}</Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "primary.main", fontWeight: 600 }}
            >
              {BRAND.founder.role}
            </Typography>

            <Box
              sx={{
                position: "relative",
                pl: 4,
                py: 1,
                borderLeft: (t) => `3px solid ${t.palette.secondary.main}`,
                color: "text.secondary",
              }}
            >
              <FormatQuoteIcon
                sx={{
                  position: "absolute",
                  top: -8,
                  left: -10,
                  fontSize: 36,
                  color: "secondary.main",
                  opacity: 0.5,
                }}
              />
              <Typography
                variant="h5"
                component="blockquote"
                sx={{
                  fontStyle: "italic",
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 500,
                  color: "text.primary",
                  m: 0,
                }}
              >
                Inko means "One More" in Telugu. We celebrate the joy of that
                perfect cup you can't resist.
              </Typography>
            </Box>

            <Typography variant="body1" color="text.secondary">
              Founded INKOTEA in {BRAND.founded} in Hyderabad with a single
              kiosk and one rule: every cup must taste the same, every single
              day. Built the brand into a 40+ outlet network across Telangana
              and Andhra Pradesh — and is now scaling the Social Café format
              for India's next phase of consumer growth.
            </Typography>

            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label={`${BRAND.founder.name} on LinkedIn`}
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </ScrollReveal>
      </Box>
    </Section>
  );
}
