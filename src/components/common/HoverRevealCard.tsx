"use client";

import Box from "@mui/material/Box";
import { alpha, type SxProps, type Theme } from "@mui/material/styles";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { brandColors } from "@/theme/palette";

export const HOVER_REVEAL_CARD_TRANSITION = {
  duration: 0.28,
  ease: "easeOut",
} as const;

export const HOVER_REVEAL_ACCENT_CLASS = "inkotea-hover-accent-bar";

interface HoverRevealCardProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
  /** Stronger primary border (e.g. featured positioning card). */
  featured?: boolean;
}

/**
 * Lift + accent-bar hover treatment shared across feature / pillar grids.
 */
export function HoverRevealCard({
  children,
  sx,
  featured = false,
}: HoverRevealCardProps) {
  const reduced = useReducedMotion();

  return (
    <Box
      component={motion.div}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={HOVER_REVEAL_CARD_TRANSITION}
      sx={[
        {
          position: "relative",
          overflow: "hidden",
          height: "100%",
          bgcolor: "background.paper",
          border: 1,
          borderColor: featured ? "primary.main" : "divider",
          borderWidth: featured ? 2 : 1,
          borderRadius: 3,
          transition:
            "border-color 0.28s ease, box-shadow 0.28s ease, background-color 0.28s ease",
          "&:hover": {
            borderColor: "primary.main",
            bgcolor: alpha(brandColors.oliveGreen, 0.04),
            boxShadow: `0 16px 40px -24px ${alpha(brandColors.teaBrown, 0.28)}`,
            [`& .${HOVER_REVEAL_ACCENT_CLASS}`]: {
              height: "100%",
            },
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Box
        className={HOVER_REVEAL_ACCENT_CLASS}
        aria-hidden
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 3,
          height: 0,
          bgcolor: "secondary.main",
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
          transition: "height 0.35s ease-in-out",
          pointerEvents: "none",
        }}
      />
      <Box sx={{ position: "relative", height: "100%" }}>{children}</Box>
    </Box>
  );
}
