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
  /** Muted strip vs inverted accent strip vs press / featured logos */
  variant?: "default" | "accent" | "press";
  /** Omit top/bottom borders when the parent section already defines them */
  edgeless?: boolean;
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
  edgeless = false,
}: InfiniteMarqueeProps) {
  const reduced = Boolean(useReducedMotion());
  const doubled = [...items, ...items];
  const isAccent = variant === "accent";
  const isPress = variant === "press";

  return (
    <Box
      sx={{
        overflow: "hidden",
        py: { xs: 1.75, md: 2.25 },
        bgcolor: isAccent ? "primary.main" : "background.paper",
        ...(!edgeless && {
          borderTop: (t) =>
            isAccent ? "none" : `1px solid ${t.palette.divider}`,
          borderBottom: (t) =>
            isAccent ? "none" : `1px solid ${t.palette.divider}`,
        }),
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
                fontWeight: isPress ? 500 : 600,
                fontSize: isPress
                  ? { xs: "1rem", md: "1.25rem" }
                  : { xs: "1.05rem", md: "1.35rem" },
                color: isAccent
                  ? "secondary.light"
                  : isPress
                    ? "text.secondary"
                    : "primary.main",
                opacity: isPress ? 0.55 : 1,
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
                  fontSize: { xs: "0.8rem", md: "0.875rem" },
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:
                    isAccent
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
                bgcolor: isAccent
                  ? "secondary.main"
                  : isPress
                    ? "text.secondary"
                    : "primary.main",
                opacity: isPress ? 0.35 : 0.45,
                flexShrink: 0,
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
