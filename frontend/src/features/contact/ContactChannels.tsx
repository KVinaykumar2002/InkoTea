"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

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
import { DEFAULT_CONTACT_CONTENT } from "@shared/pageContent";
import { usePageContent } from "@/hooks/useApiContent";

const CHANNEL_ICONS = {
  Franchise: StorefrontIcon,
  "Quick Chat": WhatsAppIcon,
} as const;

export function ContactChannels() {
  const { content } = usePageContent("contact", DEFAULT_CONTACT_CONTENT);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
        gap: 3,
      }}
    >
      {content.channels.map((c, idx) => {
        const Icon =
          CHANNEL_ICONS[c.label as keyof typeof CHANNEL_ICONS] ?? StorefrontIcon;
        const bg = c.variant === "success" ? "success.main" : "primary.main";
        const color =
          c.variant === "success" ? "success.contrastText" : "primary.contrastText";

        return (
        <ScrollReveal key={c.label} delay={idx * 0.1}>
          <Stack
            spacing={pillarCardSpacing}
            sx={{
              p: pillarCardPadding,
              borderRadius: 3,
              bgcolor: bg,
              color,
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
              <Icon />
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
                ...fontDisplayItalicSx,
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
              href={c.ctaHref}
              target={c.ctaHref.startsWith("http") ? "_blank" : undefined}
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
              {c.ctaLabel}
            </Button>
          </Stack>
        </ScrollReveal>
      );
      })}
    </Box>
  );
}
