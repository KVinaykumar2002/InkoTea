"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { BRAND } from "@/lib/brand";
import { brandColors } from "@/theme/palette";
import { contactCardSx, contactIconBoxSx } from "./contactStyles";

const SOCIALS = [
  { label: "LinkedIn", href: BRAND.socials.linkedin, icon: LinkedInIcon },
  { label: "Instagram", href: BRAND.socials.instagram, icon: InstagramIcon },
  { label: "Facebook", href: BRAND.socials.facebook, icon: FacebookIcon },
  { label: "YouTube", href: BRAND.socials.youtube, icon: YouTubeIcon },
] as const;

const INFO_ROWS = [
  {
    icon: PhoneIcon,
    title: "Phone",
    lines: [
      { href: `tel:${BRAND.phoneDigits}`, text: BRAND.phone },
      { href: `tel:${BRAND.phoneSecondaryDigits}`, text: BRAND.phoneSecondary },
    ],
  },
  {
    icon: EmailIcon,
    title: "Email",
    lines: [{ href: `mailto:${BRAND.emails.hello}`, text: BRAND.emails.hello }],
  },
  {
    icon: LocationOnIcon,
    title: "Address",
    lines: [{ text: `${BRAND.name} HQ, ${BRAND.hq}, India` }],
  },
  {
    icon: ScheduleIcon,
    title: "Business Hours",
    lines: [{ text: "Mon – Sat, 10:00 AM – 7:00 PM IST" }],
  },
] as const;

export function ContactInfoPanel() {
  return (
    <Box sx={{ ...contactCardSx, p: { xs: 3, md: 3.5 } }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Contact Information
      </Typography>

      <Stack spacing={2.5}>
        {INFO_ROWS.map((row) => {
          const Icon = row.icon;
          return (
            <Stack key={row.title} direction="row" spacing={1.75} alignItems="flex-start">
              <Box sx={contactIconBoxSx}>
                <Icon fontSize="small" />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.35 }}>
                  {row.title}
                </Typography>
                {row.lines.map((line) =>
                  "href" in line ? (
                    <Typography
                      key={line.text}
                      variant="body2"
                      color="text.secondary"
                      component="a"
                      href={line.href}
                      sx={{
                        display: "block",
                        color: "text.secondary",
                        textDecoration: "none",
                        "&:hover": {
                          color: "primary.main",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {line.text}
                    </Typography>
                  ) : (
                    <Typography
                      key={line.text}
                      variant="body2"
                      color="text.secondary"
                      component="p"
                    >
                      {line.text}
                    </Typography>
                  ),
                )}
              </Box>
            </Stack>
          );
        })}
      </Stack>

      <Box sx={{ mt: 3.5, pt: 3, borderTop: 1, borderColor: "divider" }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
          Follow us
        </Typography>
        <Stack direction="row" spacing={1}>
          {SOCIALS.map(({ label, href, icon: SocialIcon }) => (
            <IconButton
              key={label}
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              sx={{
                width: 40,
                height: 40,
                border: 1,
                borderColor: "divider",
                color: brandColors.teaBrown,
                bgcolor: "background.paper",
                "&:hover": { bgcolor: "background.default" },
              }}
            >
              <SocialIcon fontSize="small" />
            </IconButton>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
