"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
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
    icon: TrendingUpIcon,
    label: "Investor",
    title: "Investor relations",
    text: "Long-term partnerships, multi-unit deals, and capital opportunities.",
    cta: { label: "Email investor desk", href: `mailto:${BRAND.emails.investor}` },
    bg: "background.paper",
    color: "text.primary",
  },
  {
    icon: WhatsAppIcon,
    label: "Quick Chat",
    title: "WhatsApp & call",
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
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
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
              border: (t) =>
                c.bg === "background.paper"
                  ? `1px solid ${t.palette.divider}`
                  : "none",
              transition: "transform 0.25s ease",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <Box
              sx={{
                ...pillarIconSx,
                bgcolor: "rgba(255,255,255,0.18)",
                color: "inherit",
                ...(c.bg === "background.paper" && {
                  bgcolor: "secondary.light",
                  color: "primary.dark",
                }),
              }}
            >
              <c.icon />
            </Box>
            <Typography
              variant="overline"
              sx={{
                color: "inherit",
                opacity: c.bg === "background.paper" ? 0.7 : 0.9,
                letterSpacing: "0.18em",
              }}
            >
              {c.label}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "inherit",
                fontStyle:
                  c.bg !== "background.paper" ? "italic" : "normal",
              }}
            >
              {c.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "inherit",
                opacity: c.bg === "background.paper" ? 0.75 : 0.88,
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
              variant={c.bg === "background.paper" ? "contained" : "outlined"}
              endIcon={<ArrowForwardIcon />}
              sx={{
                alignSelf: "flex-start",
                fontWeight: 700,
                // Contained variant lives on the light Investor card with
                // an olive primary fill — force white text so the CTA
                // pops sharply instead of reading as muted cream.
                ...(c.bg === "background.paper" && {
                  color: "#fff",
                  "&:hover": { color: "#fff" },
                }),
                // Outlined variants live on the dark franchise/whatsapp
                // panels; keep them inheriting the cream surface color
                // and lighten the border for legibility.
                ...(c.bg !== "background.paper" && {
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "inherit",
                  "&:hover": {
                    borderColor: "currentColor",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }),
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
