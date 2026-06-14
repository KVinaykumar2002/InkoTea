"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { BRAND } from "@/lib/brand";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { brandColors } from "@/theme/palette";
import { fontDescriptionSx, fontDisplayItalicSx } from "@/theme/fonts";
import {
  contactOutlinedButtonSx,
  contactPrimaryButtonSx,
} from "./contactStyles";

export function ContactPageHero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        bgcolor: brandColors.cream,
        color: "text.primary",
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 10 },
        mt: { xs: -8, md: -10 },
        overflow: "hidden",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${BRAND_IMAGES.cafeFriendsChat})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "70% center", md: "center" },
          backgroundRepeat: "no-repeat",
          filter: "blur(2px) saturate(0.85) sepia(0.22)",
          transform: "scale(1.04)",
          zIndex: 0,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(
            90deg,
            ${brandColors.cream} 0%,
            rgba(251, 247, 241, 0.96) 28%,
            rgba(242, 225, 205, 0.78) 48%,
            rgba(107, 63, 27, 0.28) 72%,
            rgba(74, 43, 18, 0.42) 100%
          )`,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(74, 43, 18, 0.08) 0%, transparent 35%, transparent 70%, rgba(74, 43, 18, 0.12) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Stack spacing={3} maxWidth={640}>
          <Typography
            variant="overline"
            sx={{ color: "secondary.dark", letterSpacing: "0.22em", fontWeight: 700 }}
          >
            Get in touch
          </Typography>

          <Typography variant="h1" sx={{ lineHeight: 1.05 }}>
            We&apos;d love to hear{" "}
            <Box component="span" sx={{ ...fontDisplayItalicSx, color: "success.main" }}>
              from you
            </Box>
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{
              ...fontDescriptionSx,
              color: "text.secondary",
              fontWeight: 400,
              lineHeight: 1.65,
              maxWidth: 520,
            }}
          >
            Whether you&apos;re exploring a franchise, investing, or just saying
            hello — our team is here to help and responds within 24 hours.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} useFlexGap flexWrap="wrap">
            <Button
              component="a"
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<WhatsAppIcon />}
              endIcon={<ArrowForwardIcon />}
              sx={contactPrimaryButtonSx}
            >
              Chat on WhatsApp
            </Button>
            <Button
              component="a"
              href={`tel:${BRAND.phoneDigits}`}
              variant="outlined"
              startIcon={<PhoneIcon />}
              sx={contactOutlinedButtonSx}
            >
              Call Us
            </Button>
            <Button
              component="a"
              href={`mailto:${BRAND.emails.hello}`}
              variant="outlined"
              startIcon={<EmailIcon />}
              sx={contactOutlinedButtonSx}
            >
              Email Us
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
