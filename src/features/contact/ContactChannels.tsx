"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StorefrontIcon from "@mui/icons-material/Storefront";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import {
  pillarCardPadding,
  pillarCardSpacing,
  pillarIconSx,
} from "@/components/common/pillarCardStyles";
import { BRAND } from "@/lib/brand";

const CHANNELS = [
  {
    icon: StorefrontIcon,
    label: "Franchise",
    title: "Talk to franchise team",
    text: "Investment, location, rollout — get the full kit and a personal walkthrough.",
    cta: { label: "Email franchise team", href: `mailto:${BRAND.emails.franchise}` },
    bg: "primary.main",
    color: "primary.contrastText",
  },
  {
    icon: WhatsAppIcon,
    label: "Quick Chat",
    title: "WhatsApp",
    text: `Talk to us instantly on ${BRAND.phone} or ${BRAND.phoneSecondary} — Mon–Sat, 10am to 7pm IST.`,
    cta: { label: "Open WhatsApp", href: BRAND.whatsappLink },
    bg: "success.main",
    color: "success.contrastText",
  },
];

export function ContactChannels() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
        gap: 3,
      }}
    >
      {CHANNELS.map((c, idx) => (
        <ScrollReveal key={c.label} delay={idx * 0.1}>
          <Stack
            spacing={pillarCardSpacing}
            sx={{
              p: pillarCardPadding,
              borderRadius: 3,
              bgcolor: c.bg,
              color: c.color,
              height: "100%",
              transition: "transform 0.25s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <Box
              sx={{
                ...pillarIconSx,
                bgcolor: "rgba(255,255,255,0.18)",
                color: "inherit",
              }}
            >
              <c.icon />
            </Box>
            <Typography
              variant="overline"
              sx={{
                color: "inherit",
                opacity: 0.9,
                letterSpacing: "0.18em",
              }}
            >
              {c.label}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "inherit",
                fontStyle: "italic",
              }}
            >
              {c.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "inherit",
                opacity: 0.88,
                flexGrow: 1,
              }}
            >
              {c.text}
            </Typography>
            <Button
              component="a"
              href={c.cta.href}
              target={c.cta.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              sx={{
                alignSelf: "flex-start",
                fontWeight: 700,
                borderColor: "rgba(255,255,255,0.5)",
                color: "inherit",
                "&:hover": {
                  borderColor: "currentColor",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {c.cta.label}
            </Button>
          </Stack>
        </ScrollReveal>
      ))}
    </Box>
  );
}
