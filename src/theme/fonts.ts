/**
 * Typography design tokens — Lato only, entire site.
 *
 * `font.family.stack` = Lato, sans-serif (Next.js loads via `--font-lato`).
 * All text sizes must come from this scale or `base` — no ad-hoc rem/px in components.
 */
export const fontFamily = {
  primary: "Lato",
  stack: 'var(--font-lato), Lato, sans-serif',
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
  tight: "23.8px",
  snug: "23.8px",
  normal: "23.8px",
  relaxed: "23.8px",
} as const;

/** CSS custom properties on `:root` (see globals.css) */
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

/** @deprecated Use `fontFamily.stack` */
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

/** Shorthand `sx` font-size tokens */
export const fontSizeSx = {
  xs: { fontSize: fontSize.xs },
  sm: { fontSize: fontSize.sm },
  md: { fontSize: fontSize.md },
  lg: { fontSize: fontSize.lg },
  xl: { fontSize: fontSize.xl },
  "2xl": { fontSize: fontSize["2xl"] },
  "3xl": { fontSize: fontSize["3xl"] },
  "4xl": { fontSize: fontSize["4xl"] },
  base: { fontSize: fontSize.base, lineHeight: lineHeight.base },
} as const;
