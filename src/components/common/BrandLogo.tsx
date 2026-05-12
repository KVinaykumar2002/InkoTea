"use client";

import Link from "next/link";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
  size?: "sm" | "md" | "lg";
  /** Override wordmark color (logo image stays as-is) */
  color?: string;
  href?: string;
  /** Hide the wordmark and show only the badge */
  badgeOnly?: boolean;
}

const SIZE_MAP = {
  sm: { mark: 36, text: "1rem" },
  md: { mark: 52, text: "1.25rem" },
  lg: { mark: 72, text: "1.6rem" },
} as const;

/**
 * Official INKOTEA badge + wordmark. Wraps a Next.js `Link` and uses
 * `next/image` for the badge so it stays sharp on high-DPI displays.
 */
export function BrandLogo({
  size = "md",
  color,
  href = "/",
  badgeOnly = false,
}: Props) {
  const dims = SIZE_MAP[size];

  return (
    <Box
      component={Link}
      href={href}
      aria-label="INKOTEA — go to home"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.25}>
        <Box
          sx={{
            position: "relative",
            width: dims.mark,
            height: dims.mark,
            flexShrink: 0,
          }}
        >
          <Image
            src="/logo.png"
            alt="INKOTEA logo"
            fill
            sizes={`${dims.mark}px`}
            style={{ objectFit: "contain", display: "block" }}
            priority
            unoptimized
          />
        </Box>
        {badgeOnly ? null : (
          <Typography
            component="span"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: dims.text,
              letterSpacing: "0.04em",
              color: color ?? "primary.main",
              lineHeight: 1,
            }}
          >
            INKOTEA
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
