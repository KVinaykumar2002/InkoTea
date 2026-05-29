"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useReducedMotion } from "framer-motion";
import { fontBodySx, fontDisplayItalicSx } from "@/theme/fonts";

export interface MarqueeItem {
  label: string;
  /** Optional short descriptor shown after a dot separator */
  detail?: string;
}

interface InfiniteMarqueeProps {
  items: readonly MarqueeItem[];
  /** Scroll direction — row 1 typically left, row 2 right */
  direction?: "left" | "right";
  durationSeconds?: number;
  /** Muted strip vs inverted accent strip */
  variant?: "default" | "accent";
}

/**
 * Seamless horizontal marquee (furniture-site style). Duplicates the item
 * list so CSS can loop translateX(-50%) without a visible seam.
 */
export function InfiniteMarquee({
  items,
  direction = "left",
  durationSeconds = 32,
  variant = "default",
}: InfiniteMarqueeProps) {
  const reduced = Boolean(useReducedMotion());
  const doubled = [...items, ...items];

  return (
    <Box
      sx={{
        overflow: "hidden",
        py: { xs: 1.75, md: 2.25 },
        bgcolor: variant === "accent" ? "primary.main" : "background.paper",
        borderTop: (t) =>
          variant === "accent" ? "none" : `1px solid ${t.palette.divider}`,
        borderBottom: (t) =>
          variant === "accent" ? "none" : `1px solid ${t.palette.divider}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          animation: reduced
            ? "none"
            : `inkotea-marquee-${direction} ${durationSeconds}s linear infinite`,
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      >
        {doubled.map((item, idx) => (
          <Box
            key={`${item.label}-${idx}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: { xs: 3, md: 5 },
              flexShrink: 0,
            }}
          >
            <Typography
              component="span"
              sx={{
                ...fontDisplayItalicSx,
                fontWeight: 600,
                fontSize: "var(--font-size-base)",
                color:
                  variant === "accent"
                    ? "secondary.light"
                    : "primary.main",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </Typography>
            {item.detail ? (
              <Typography
                component="span"
                sx={{
                  ...fontBodySx,
                  fontSize: "var(--font-size-sm)",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:
                    variant === "accent"
                      ? "rgba(255,255,255,0.72)"
                      : "text.secondary",
                  whiteSpace: "nowrap",
                }}
              >
                {item.detail}
              </Typography>
            ) : null}
            <Box
              aria-hidden
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor:
                  variant === "accent" ? "secondary.main" : "primary.main",
                opacity: 0.45,
                flexShrink: 0,
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
