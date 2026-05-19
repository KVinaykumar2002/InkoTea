"use client";

import { forwardRef, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { SxProps, Theme } from "@mui/material/styles";

interface Props {
  children: ReactNode;
  id?: string;
  bgcolor?: string;
  py?: { xs: number; md: number } | number;
  pt?: { xs: number; md: number } | number;
  pb?: { xs: number; md: number } | number;
  containerMaxWidth?: "sm" | "md" | "lg" | "xl" | false;
  sx?: SxProps<Theme>;
}

/**
 * Standard page section wrapper — applies vertical rhythm + container width
 * defined by the design system.
 */
export const Section = forwardRef<HTMLElement, Props>(function Section(
  {
    children,
    id,
    bgcolor,
    py = { xs: 8, md: 12 },
    pt,
    pb,
    containerMaxWidth = "lg",
    sx,
  },
  ref,
) {
  const paddingSx =
    pt !== undefined || pb !== undefined
      ? { pt: pt ?? py, pb: pb ?? py }
      : { py };

  return (
    <Box
      ref={ref}
      component="section"
      id={id}
      sx={{ bgcolor, ...paddingSx, ...sx }}
    >
      <Container maxWidth={containerMaxWidth}>{children}</Container>
    </Box>
  );
});
