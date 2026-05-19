"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { motion, useReducedMotion } from "framer-motion";
import { pillarCardPadding } from "@/components/common/pillarCardStyles";
import { JOURNEY_META } from "./journeyMeta";

interface Props {
  year: string;
  title: string;
  text: string;
  /** Which side the card pushes toward (affects text alignment + stamp anchor). */
  align: "left" | "right";
}

/**
 * One milestone card on the journey timeline.
 *
 * Design intent — reads like a tea-stall receipt / wooden bookmark tag:
 *   - Warm amber-gold gradient background, soft brand shadow.
 *   - The year sits inside a circular "tea-ring stamp" anchored to the
 *     outer edge (left on right-aligned cards, right on left-aligned cards),
 *     visually balancing the pour-line glyph on the opposite side.
 *   - A small cumulative-outlet pill ("25 outlets", "40+ outlets") gives
 *     the milestone a concrete proof-point beyond the prose.
 *   - Card fades + slides into view from the spine side on first reveal.
 *
 * Honours `prefers-reduced-motion` by skipping the motion entry entirely.
 */
export function JourneyMilestone({ year, title, text, align }: Props) {
  const reduced = useReducedMotion();
  const meta = JOURNEY_META[year];
  // Cards "push" into view from the spine — left-aligned cards come from
  // the right and vice-versa, so each card feels poured from the line.
  const enterX = align === "right" ? -24 : 24;

  return (
    <Stack
      component={motion.div}
      initial={reduced ? false : { opacity: 0, x: enterX, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      spacing={1.25}
      sx={{
        position: "relative",
        p: pillarCardPadding,
        pr: align === "right" ? { md: 4.5 } : undefined,
        pl: align === "left" ? { md: 4.5 } : undefined,
        borderRadius: 3,
        textAlign: align,
        bgcolor: "background.paper",
        border: (t) => `1px solid ${t.palette.divider}`,
        background: (t) =>
          t.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(212,165,116,0.06) 0%, rgba(58,34,16,0.0) 65%)"
            : "linear-gradient(135deg, rgba(212,165,116,0.10) 0%, rgba(255,255,255,0.0) 60%)",
        boxShadow: "0 8px 28px -16px rgba(58,34,16,0.18)",
      }}
    >
      <YearStamp year={year} side={align === "right" ? "left" : "right"} />

      <Typography
        variant="h5"
        sx={{
          fontStyle: "italic",
          color: "primary.dark",
          // Make room for the stamp on the side it lives on.
          pl: align === "right" ? 0 : { md: 2 },
          pr: align === "left" ? 0 : { md: 2 },
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ lineHeight: 1.7 }}
      >
        {text}
      </Typography>

      {meta?.cumulative ? (
        <Box
          sx={{
            alignSelf: align === "left" ? "flex-start" : "flex-end",
            mt: 0.5,
            px: 1.5,
            py: 0.5,
            borderRadius: 999,
            bgcolor: (t) =>
              t.palette.mode === "dark"
                ? "rgba(212,165,116,0.14)"
                : "rgba(160,107,67,0.10)",
            border: "1px solid rgba(160,107,67,0.28)",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "secondary.dark",
              fontWeight: 700,
              letterSpacing: "0.16em",
              fontSize: "0.7rem",
              lineHeight: 1.6,
            }}
          >
            {meta.cumulative}
          </Typography>
        </Box>
      ) : null}
    </Stack>
  );
}

/**
 * Circular "tea-ring" year stamp. Pinned to a corner so it doesn't crowd
 * the headline. The double-ring + radial wash mimics a real ceramic-cup
 * tea-stain — small but distinctive detail.
 */
function YearStamp({ year, side }: { year: string; side: "left" | "right" }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: -10,
        [side]: -10,
        width: 48,
        height: 48,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: (t) =>
          t.palette.mode === "dark"
            ? "radial-gradient(circle at 35% 30%, rgba(212,165,116,0.42), rgba(58,34,16,0.95) 70%)"
            : "radial-gradient(circle at 35% 30%, rgba(255,238,210,0.95), rgba(212,165,116,0.4) 70%)",
        border: "1.5px solid rgba(160,107,67,0.55)",
        boxShadow: "0 0 0 3px rgba(212,165,116,0.18), 0 4px 12px -4px rgba(58,34,16,0.18)",
        zIndex: 2,
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 4,
          borderRadius: "50%",
          border: "1px dashed rgba(160,107,67,0.45)",
          pointerEvents: "none",
        },
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 800,
          color: "primary.dark",
          letterSpacing: "0.04em",
          fontSize: "0.8rem",
          lineHeight: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        {year}
      </Typography>
    </Box>
  );
}
