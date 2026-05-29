/**
 * Typography design tokens — Lato primary stack.
 *
 * UI scale (`xs` → `4xl`) is compact; `base` is the main reading size.
 * Page headings use `display.*` sizes (still Lato) for marketing legibility.
 */
export const fontFamily = {
  primary: "Lato",
  stack: 'var(--font-lato), "Lato", sans-serif',
} as const;

export const fontSize = {
  xs: "10.88px",
  sm: "11.52px",
  md: "12.16px",
  lg: "12.48px",
  xl: "12.8px",
  "2xl": "13.12px",
  "3xl": "13.28px",
  "4xl": "13.33px",
  base: "14px",
} as const;

export const fontWeight = {
  base: 500,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeight = {
  base: "23.8px",
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.65,
} as const;

/** Page-level headings (Lato, larger than the UI ramp) */
export const fontSizeDisplay = {
  h1: "clamp(2rem, 4vw, 2.75rem)",
  h2: "clamp(1.75rem, 3.5vw, 2.25rem)",
  h3: "clamp(1.5rem, 3vw, 1.875rem)",
  h4: "clamp(1.25rem, 2.5vw, 1.5rem)",
} as const;

/** CSS custom properties written to `:root` in globals.css */
export const fontCssVars = {
  "--font-family-primary": fontFamily.primary,
  "--font-family-stack": fontFamily.stack,
  "--font-size-base": fontSize.base,
  "--font-weight-base": String(fontWeight.base),
  "--font-line-height-base": lineHeight.base,
  "--font-size-xs": fontSize.xs,
  "--font-size-sm": fontSize.sm,
  "--font-size-md": fontSize.md,
  "--font-size-lg": fontSize.lg,
  "--font-size-xl": fontSize.xl,
  "--font-size-2xl": fontSize["2xl"],
  "--font-size-3xl": fontSize["3xl"],
  "--font-size-4xl": fontSize["4xl"],
} as const;

/** @deprecated Use `fontFamily.stack` — kept for existing imports */
export const fonts = {
  body: fontFamily.stack,
  display: fontFamily.stack,
} as const;

export const fontBodySx = { fontFamily: fontFamily.stack } as const;

export const fontDisplaySx = { fontFamily: fontFamily.stack } as const;

export const fontDisplayItalicSx = {
  fontFamily: fontFamily.stack,
  fontStyle: "italic",
} as const;
