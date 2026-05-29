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
import {
  compactSectionPy,
  pillarCardPadding,
  pillarCardSpacing,
} from "@/components/common/pillarCardStyles";
import { BRAND } from "@/lib/brand";
import { BRAND_IMAGES } from "@/lib/brandImages";
import { fontDisplayItalicSx, fontDisplaySx } from "@/theme/fonts";

const FOUNDER_IMG = BRAND_IMAGES.founderSrinivas;

export function FounderSection() {
  return (
    <Section bgcolor="background.paper" py={compactSectionPy}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" },
          gap: { xs: 3, md: 5 },
          alignItems: "center",
        }}
      >
        <ScrollReveal>
          <Stack spacing={pillarCardSpacing}>
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

            <Typography variant="body1" color="text.secondary">
              Srinivas P. Mahendra is the Founder of INKOTEA, a passionate
              entrepreneur with a vision to redefine the tea café experience by
              blending quality, affordability, and strong franchise
              opportunities. He launched the first INKOTEA outlet in April 2021
              at Miyapur, Hyderabad, with the dream of building a proudly
              Indian tea brand that could reach every town and city.
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Under his leadership, INKOTEA has rapidly expanded across multiple
              locations and states through a scalable franchise model focused
              on consistency, customer satisfaction, and innovative business
              ideas. His entrepreneurial journey reflects dedication, practical
              execution, and a strong belief in empowering young entrepreneurs
              through affordable business opportunities.
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Apart from INKOTEA, Srinivas is also actively involved in
              renewable energy and startup innovation sectors, bringing a
              modern and growth-oriented approach to every venture he builds.
            </Typography>

            <Box
              sx={{
                position: "relative",
                pl: pillarCardPadding,
                py: 0.5,
                borderLeft: (t) => `3px solid ${t.palette.secondary.main}`,
                color: "text.secondary",
              }}
            >
              <FormatQuoteIcon
                sx={{
                  position: "absolute",
                  top: -6,
                  left: -8,
                  fontSize: 28,
                  color: "secondary.main",
                  opacity: 0.5,
                }}
              />
              <Typography
                variant="overline"
                sx={{
                  color: "secondary.dark",
                  letterSpacing: "0.2em",
                  fontWeight: 700,
                }}
              >
                Vision
              </Typography>
              <Typography
                variant="h6"
                component="blockquote"
                sx={{
                  mt: 0.75,
                  ...fontDisplayItalicSx,
                  fontWeight: 500,
                  color: "text.primary",
                  m: 0,
                }}
              >
                &ldquo;To build INKOTEA into one of India&rsquo;s most trusted
                and loved tea café brands by creating premium beverage
                experiences at affordable prices, while empowering entrepreneurs
                through sustainable and scalable franchise opportunities.&rdquo;
              </Typography>
            </Box>

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

        <ScrollReveal delay={0.15}>
          <Box
            sx={{
              position: "relative",
              maxWidth: 360,
              mx: { xs: "auto", md: "0 0 0 auto" },
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                inset: -12,
                borderRadius: 4,
                bgcolor: "secondary.light",
                opacity: 0.45,
                transform: "rotate(3deg)",
                zIndex: 0,
              }}
            />
            <Avatar
              src={FOUNDER_IMG}
              alt={BRAND.founder.name}
              variant="rounded"
              imgProps={{ loading: "lazy" }}
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 300, md: 400 },
                borderRadius: 4,
                zIndex: 1,
                boxShadow: "0 20px 60px -20px rgba(0,0,0,0.3)",
                bgcolor: "primary.main",
                color: "primary.contrastText",
                ...fontDisplaySx,
                fontSize: "var(--font-size-base)",
                fontWeight: 700,
                "& img": {
                  objectFit: "cover",
                  objectPosition: "center 20%",
                },
              }}
            >
              {BRAND.founder.name
                .split(" ")
                .map((n) => n[0])
                .filter(Boolean)
                .slice(0, 2)
                .join("")}
            </Avatar>
          </Box>
        </ScrollReveal>
      </Box>
    </Section>
  );
}
