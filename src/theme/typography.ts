import type { TypographyVariantsOptions } from "@mui/material/styles";
import { fontFamily, fontSize, fontWeight, lineHeight } from "./fonts";

const headingLineHeight = lineHeight.base;

/**
 * MUI typography mapped strictly to the Lato token scale.
 * `base` (14px) is the largest size; headings use bold weights on the ramp.
 */
export const typography: TypographyVariantsOptions = {
  fontFamily: fontFamily.stack,
  fontSize: 14,
  fontWeightLight: fontWeight.regular,
  fontWeightRegular: fontWeight.regular,
  fontWeightMedium: fontWeight.medium,
  fontWeightBold: fontWeight.bold,
  h1: {
    fontFamily: fontFamily.stack,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.base,
    lineHeight: headingLineHeight,
    letterSpacing: "-0.01em",
  },
  h2: {
    fontFamily: fontFamily.stack,
    fontWeight: fontWeight.bold,
    fontSize: fontSize["4xl"],
    lineHeight: headingLineHeight,
  },
  h3: {
    fontFamily: fontFamily.stack,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize["3xl"],
    lineHeight: headingLineHeight,
  },
  h4: {
    fontFamily: fontFamily.stack,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize["2xl"],
    lineHeight: headingLineHeight,
  },
  h5: {
    fontFamily: fontFamily.stack,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.xl,
    lineHeight: headingLineHeight,
  },
  h6: {
    fontFamily: fontFamily.stack,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.lg,
    lineHeight: headingLineHeight,
  },
  subtitle1: {
    fontFamily: fontFamily.stack,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.base,
  },
  subtitle2: {
    fontFamily: fontFamily.stack,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.md,
    lineHeight: lineHeight.base,
    letterSpacing: "0.02em",
  },
  body1: {
    fontFamily: fontFamily.stack,
    fontWeight: fontWeight.base,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
  },
  body2: {
    fontFamily: fontFamily.stack,
    fontWeight: fontWeight.base,
    fontSize: fontSize.md,
    lineHeight: lineHeight.base,
  },
  button: {
    fontFamily: fontFamily.stack,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    letterSpacing: "0.02em",
    textTransform: "none",
  },
  caption: {
    fontFamily: fontFamily.stack,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.base,
    letterSpacing: "0.02em",
  },
  overline: {
    fontFamily: fontFamily.stack,
    fontWeight: fontWeight.bold,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.base,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
};
