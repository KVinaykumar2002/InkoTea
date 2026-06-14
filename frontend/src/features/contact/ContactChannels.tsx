"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { BRAND } from "@/lib/brand";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  contactArrowButtonSx,
  contactCardSx,
  contactIconBoxSx,
} from "./contactStyles";

const CHANNELS = [
  {
    title: "WhatsApp",
    description: "Fastest way to reach our franchise desk — we reply same day.",
    href: BRAND.whatsappLink,
    icon: WhatsAppIcon,
    external: true,
  },
  {
    title: "Call Us",
    description: `${BRAND.phone} or ${BRAND.phoneSecondary}`,
    href: `tel:${BRAND.phoneDigits}`,
    icon: PhoneIcon,
    external: false,
  },
  {
    title: "Email Us",
    description: BRAND.emails.hello,
    href: `mailto:${BRAND.emails.hello}`,
    icon: EmailIcon,
    external: false,
  },
] as const;

export function ContactChannels() {
  return (
    <Box sx={{ width: "100%" }}>
      <SectionHeading
        eyebrow="We're here for you"
        title="Drop a note — we'll get back within 24 hours"
        align="center"
        maxWidth={720}
        sx={{ mb: { xs: 4, md: 5 } }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 2.5,
        }}
      >
        {CHANNELS.map((channel, idx) => {
          const Icon = channel.icon;
          return (
            <ScrollReveal key={channel.title} delay={idx * 0.06} fullHeight>
              <Stack
                spacing={2}
                sx={{
                  ...contactCardSx,
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 16px 44px -14px rgba(28, 26, 18, 0.16)",
                  },
                }}
              >
                <Box sx={contactIconBoxSx}>
                  <Icon />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ mb: 0.75 }}>
                    {channel.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                    {channel.description}
                  </Typography>
                </Box>
                <IconButton
                  component="a"
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={channel.title}
                  sx={contactArrowButtonSx}
                >
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </Stack>
            </ScrollReveal>
          );
        })}
      </Box>
    </Box>
  );
}
