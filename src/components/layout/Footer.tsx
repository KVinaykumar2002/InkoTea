"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { BrandLogo } from "@/components/common/BrandLogo";
import { FooterEnquiryForm } from "./FooterEnquiryForm";
import {
  BRAND,
  FOOTER_QUICK_LINKS,
  MODEL_LINKS,
} from "@/lib/brand";
import { BRAND_IMAGES } from "@/lib/brandImages";

/**
 * Single full-bleed footer background — a cinematic wide-aspect INKOTEA
 * kiosk scene with the founder, guests, and the lit "One More Cup" menu
 * board. Anchors the end of every page in real brand energy. A dark
 * tea-brown gradient sits on top so the content stays high-contrast.
 */
const FOOTER_BG_IMAGE = BRAND_IMAGES.footerKioskScene;

/** Cream amber used inside the dark footer for hover/accent states. */
const FOOTER_ACCENT = "#E6C19A"; // brand amberGoldLight

/** Visual treatment shared by the three Reach Us call-to-action buttons. */
const reachUsButtonSx = {
  color: "#F5EFE5",
  borderColor: "rgba(245,239,229,0.28)",
  bgcolor: "rgba(245,239,229,0.04)",
  borderRadius: 999,
  textTransform: "none" as const,
  fontWeight: 600,
  justifyContent: "flex-start",
  py: 1,
  px: 2,
  "& .MuiButton-startIcon": { color: FOOTER_ACCENT },
  "&:hover": {
    borderColor: FOOTER_ACCENT,
    color: FOOTER_ACCENT,
    bgcolor: "rgba(230,193,154,0.08)",
    "& .MuiButton-startIcon": { color: FOOTER_ACCENT },
  },
};

const socialLinks = [
  { icon: InstagramIcon, href: BRAND.socials.instagram, label: "Instagram" },
  { icon: FacebookIcon, href: BRAND.socials.facebook, label: "Facebook" },
  { icon: YouTubeIcon, href: BRAND.socials.youtube, label: "YouTube" },
  { icon: LinkedInIcon, href: BRAND.socials.linkedin, label: "LinkedIn" },
];

/** Footer always uses the warm tea-brown surface for cross-theme consistency. */
const FOOTER_BG = "#3A2210";
const FOOTER_TEXT = "#F5EFE5";
const FOOTER_TEXT_MUTED = "rgba(245, 239, 229, 0.78)";
const FOOTER_DIVIDER = "rgba(245, 239, 229, 0.16)";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        bgcolor: FOOTER_BG,
        color: FOOTER_TEXT,
        pt: { xs: 8, md: 12 },
        pb: 4,
        mt: { xs: 8, md: 12 },
        overflow: "hidden",
      }}
    >
      {/* Single full-bleed brand photo — cinematic kiosk scene. Sits behind
          a warm tea-brown gradient that keeps copy readable while letting
          the green neon menu board and crowd glow through. */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${FOOTER_BG_IMAGE})`,
          backgroundSize: "cover",
          // Source is wide landscape (≈ 2.5:1). On desktop the centre frames
          // the menu board + founder beautifully; on mobile we shift slightly
          // right so the lit menu stays in view as the crop narrows.
          backgroundPosition: { xs: "65% center", md: "center" },
          backgroundRepeat: "no-repeat",
          opacity: 0.32,
          zIndex: 0,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(58,34,16,0.82) 0%, rgba(26,18,11,0.96) 100%)",
          zIndex: 1,
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 6, md: 8 },
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            mb: { xs: 6, md: 8 },
          }}
        >
          <Stack spacing={2.5}>
            <Typography
              variant="overline"
              sx={{ color: "secondary.light", letterSpacing: "0.18em" }}
            >
              Talk to our team
            </Typography>
            <Typography variant="h3" sx={{ color: "inherit" }}>
              Start your INKOTEA journey today.
            </Typography>
            <Typography variant="body1" sx={{ color: "inherit", opacity: 0.85 }}>
              Drop your details — our franchise team will reach out within
              24 hours with the full investment kit.
            </Typography>
          </Stack>

          {/* FooterEnquiryForm owns its own field styling (cream-on-tea-brown
              brand surface). Keeping this wrapper free of overrides avoids
              the previous double-styling that was hard to reason about. */}
          <Box>
            <FooterEnquiryForm />
          </Box>
        </Box>

        <Divider sx={{ borderColor: FOOTER_DIVIDER, mb: 6 }} />

        <Box
          sx={{
            display: "grid",
            gap: 6,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "2fr 1fr 1fr 1.5fr",
            },
          }}
        >
          <Stack spacing={2.5}>
            <BrandLogo size="md" color={FOOTER_TEXT} />
            <Typography
              variant="body2"
              sx={{ color: FOOTER_TEXT_MUTED, maxWidth: 320 }}
            >
              {BRAND.shortDescription}
            </Typography>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.light",
                ...fontDisplayItalicSx,
                letterSpacing: "0.18em",
              }}
            >
              &ldquo;{BRAND.tagline}&rdquo;
            </Typography>
            <Stack direction="row" spacing={0.5}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <IconButton
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label={label}
                  sx={{
                    color: "inherit",
                    opacity: 0.85,
                    "&:hover": { opacity: 1, color: "secondary.light" },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Stack>

          <Stack spacing={1.5}>
            <Typography
              variant="overline"
              sx={{ color: "secondary.light", letterSpacing: "0.18em" }}
            >
              Quick Links
            </Typography>
            {FOOTER_QUICK_LINKS.map((link) => (
              <Box
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  color: "inherit",
                  opacity: 0.85,
                  textDecoration: "none",
                  fontSize: "var(--font-size-md)",
                  "&:hover": { opacity: 1, color: "secondary.light" },
                }}
              >
                {link.label}
              </Box>
            ))}
          </Stack>

          <Stack spacing={1.5}>
            <Typography
              variant="overline"
              sx={{ color: "secondary.light", letterSpacing: "0.18em" }}
            >
              Models
            </Typography>
            {MODEL_LINKS.map((link) => (
              <Box
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  color: "inherit",
                  opacity: 0.85,
                  textDecoration: "none",
                  fontSize: "var(--font-size-md)",
                  "&:hover": { opacity: 1, color: "secondary.light" },
                }}
              >
                {link.label}
              </Box>
            ))}
          </Stack>

          <Stack spacing={1.5}>
            <Typography
              variant="overline"
              sx={{ color: "secondary.light", letterSpacing: "0.18em" }}
            >
              Reach Us
            </Typography>

            <Button
              component="a"
              href={`tel:${BRAND.phoneDigits}`}
              variant="outlined"
              startIcon={<PhoneIcon />}
              sx={reachUsButtonSx}
              aria-label={`Call ${BRAND.name} on ${BRAND.phone}`}
            >
              {BRAND.phone}
            </Button>

            <Button
              component="a"
              href={`tel:${BRAND.phoneSecondaryDigits}`}
              variant="outlined"
              startIcon={<PhoneIcon />}
              sx={reachUsButtonSx}
              aria-label={`Call ${BRAND.name} on ${BRAND.phoneSecondary}`}
            >
              {BRAND.phoneSecondary}
            </Button>

            <Button
              component="a"
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<WhatsAppIcon />}
              sx={reachUsButtonSx}
              aria-label="Chat with INKOTEA on WhatsApp"
            >
              WhatsApp Chat
            </Button>

            <Button
              component="a"
              href={`mailto:${BRAND.emails.franchise}`}
              variant="outlined"
              startIcon={<EmailIcon />}
              sx={reachUsButtonSx}
              aria-label={`Email ${BRAND.emails.franchise}`}
            >
              {BRAND.emails.franchise}
            </Button>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="flex-start"
              sx={{ pt: 0.5, px: 0.5 }}
            >
              <LocationOnIcon
                fontSize="small"
                sx={{ color: "secondary.light", mt: 0.4 }}
              />
              <Typography
                variant="body2"
                sx={{ opacity: 0.9, color: "inherit" }}
              >
                {BRAND.hq}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: FOOTER_DIVIDER, my: 5 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >
          <Typography variant="caption" sx={{ color: "inherit", opacity: 0.65 }}>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Box
              component={Link}
              href="/privacy"
              sx={{
                fontSize: "var(--font-size-xs)",
                color: "inherit",
                opacity: 0.65,
                textDecoration: "none",
                "&:hover": { opacity: 1 },
              }}
            >
              Privacy
            </Box>
            <Box
              component={Link}
              href="/terms"
              sx={{
                fontSize: "var(--font-size-xs)",
                color: "inherit",
                opacity: 0.65,
                textDecoration: "none",
                "&:hover": { opacity: 1 },
              }}
            >
              Terms
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
