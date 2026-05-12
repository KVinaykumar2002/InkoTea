import type { TypographyVariantsOptions } from "@mui/material/styles";

const displayFamily =
  'var(--font-playfair), "Playfair Display", "Georgia", "Times New Roman", serif';
const bodyFamily =
  'var(--font-inter), "Inter", -apple-system, BlinkMacSystemFont, sans-serif';

export const typography: TypographyVariantsOptions = {
  fontFamily: bodyFamily,
  h1: {
    fontFamily: displayFamily,
    fontWeight: 700,
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  h2: {
    fontFamily: displayFamily,
    fontWeight: 700,
    fontSize: "clamp(2rem, 4vw, 3.25rem)",
    lineHeight: 1.15,
    letterSpacing: "-0.015em",
  },
  h3: {
    fontFamily: displayFamily,
    fontWeight: 600,
    fontSize: "clamp(1.625rem, 3vw, 2.25rem)",
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  },
  h4: {
    fontFamily: displayFamily,
    fontWeight: 600,
    fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)",
    lineHeight: 1.25,
  },
  h5: {
    fontFamily: bodyFamily,
    fontWeight: 600,
    fontSize: "1.25rem",
    lineHeight: 1.3,
  },
  h6: {
    fontFamily: bodyFamily,
    fontWeight: 600,
    fontSize: "1.0625rem",
    lineHeight: 1.35,
    letterSpacing: "0.01em",
  },
  subtitle1: {
    fontFamily: bodyFamily,
    fontWeight: 500,
    fontSize: "1.125rem",
    lineHeight: 1.5,
  },
  subtitle2: {
    fontFamily: bodyFamily,
    fontWeight: 500,
    fontSize: "0.95rem",
    lineHeight: 1.5,
    letterSpacing: "0.02em",
  },
  body1: {
    fontFamily: bodyFamily,
    fontWeight: 400,
    fontSize: "1.0625rem",
    lineHeight: 1.65,
  },
  body2: {
    fontFamily: bodyFamily,
    fontWeight: 400,
    fontSize: "0.9375rem",
    lineHeight: 1.6,
  },
  button: {
    fontFamily: bodyFamily,
    fontWeight: 600,
    fontSize: "0.95rem",
    letterSpacing: "0.04em",
    textTransform: "none",
  },
  caption: {
    fontFamily: bodyFamily,
    fontWeight: 500,
    fontSize: "0.8125rem",
    lineHeight: 1.5,
    letterSpacing: "0.02em",
  },
  overline: {
    fontFamily: bodyFamily,
    fontWeight: 700,
    fontSize: "0.75rem",
    lineHeight: 1.5,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
  },
};
