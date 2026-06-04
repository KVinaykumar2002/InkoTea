"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme, type SxProps, type Theme } from "@mui/material/styles";
import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";
import { pillarCardSpacing, pillarIconSx } from "@/components/common/pillarCardStyles";
import { brandColors } from "@/theme/palette";

const HOVER_OVERLAY_TRANSITION =
  "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";

export interface ExperienceHoverCardProps {
  icon: ElementType;
  title: React.ReactNode;
  description: string;
  /** 0-based — drives stagger delay and corner watermark (01, 02, …). */
  index: number;
  /** Optional overline above the title (e.g. Mission, Vision). */
  eyebrow?: string;
  motionDelay?: number;
  iconWrapSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}

/**
 * Dark overlay slide + lift hover used in “More Than Just Tea” and matching sections.
 */
export function ExperienceHoverCard({
  icon: Icon,
  title,
  description,
  index,
  eyebrow,
  motionDelay,
  iconWrapSx,
  contentSx,
}: ExperienceHoverCardProps) {
  const theme = useTheme();
  const reduced = useReducedMotion();
  const accent = theme.palette.secondary.main;
  const hoverBg = brandColors.charcoal;
  const number = String(index + 1).padStart(2, "0");
  const delay = motionDelay ?? index * 0.05;

  return (
    <Box
      component={motion.div}
      initial={reduced ? false : { opacity: 0, scale: 0.95 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={reduced ? undefined : { y: -8 }}
      transition={{ duration: 0.35, delay }}
      sx={[
        {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 3,
          border: `2px solid ${alpha(brandColors.charcoal, 0.06)}`,
          bgcolor: "background.paper",
          p: { xs: 3, md: 4 },
          height: "100%",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
          "&:hover": {
            borderColor: alpha("#fff", 0.12),
            boxShadow: `0 24px 48px -12px ${alpha(accent, 0.22)}`,
            "& .experience-overlay": {
              transform: "translateY(0)",
            },
            "& .experience-number": {
              color: alpha("#fff", 0.06),
            },
            "& .experience-icon-wrap": {
              bgcolor: alpha(accent, 0.2),
              borderColor: alpha(accent, 0.4),
              transform: "scale(1.1)",
            },
            "& .experience-icon": {
              color: accent,
            },
            "& .experience-eyebrow": {
              color: alpha(accent, 0.9),
            },
            "& .experience-title": {
              color: brandColors.textOnDark,
            },
            "& .experience-text": {
              color: alpha(brandColors.textOnDark, 0.7),
            },
          },
        },
        ...(Array.isArray(contentSx) ? contentSx : contentSx ? [contentSx] : []),
      ]}
    >
      <Box
        className="experience-overlay"
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: hoverBg,
          transform: "translateY(100%)",
          transition: HOVER_OVERLAY_TRANSITION,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
        }}
      >
        <Typography
          className="experience-number"
          aria-hidden
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            fontSize: "4.5rem",
            fontWeight: 700,
            lineHeight: 1,
            color: alpha(brandColors.charcoal, 0.04),
            userSelect: "none",
            pointerEvents: "none",
            transition: "color 0.3s ease",
          }}
        >
          {number}
        </Typography>

        <Stack spacing={pillarCardSpacing} sx={{ height: "100%" }}>
          <Box
            className="experience-icon-wrap"
            sx={[
              {
                ...pillarIconSx,
                bgcolor: "secondary.light",
                transition:
                  "background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
              },
              ...(Array.isArray(iconWrapSx)
                ? iconWrapSx
                : iconWrapSx
                  ? [iconWrapSx]
                  : []),
            ]}
          >
            <Icon
              className="experience-icon"
              sx={{
                color: "primary.dark",
                transition: "color 0.3s ease",
              }}
            />
          </Box>

          {eyebrow ? (
            <Typography
              className="experience-eyebrow"
              variant="overline"
              sx={{
                color: "secondary.dark",
                letterSpacing: "0.18em",
                transition: "color 0.3s ease",
              }}
            >
              {eyebrow}
            </Typography>
          ) : null}

          <Typography
            className="experience-title"
            variant="h5"
            sx={{ transition: "color 0.3s ease", pr: 5 }}
          >
            {title}
          </Typography>

          <Typography
            className="experience-text"
            variant="body2"
            color="text.secondary"
            sx={{ transition: "color 0.3s ease" }}
          >
            {description}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
