import type { PaletteOptions } from "@mui/material/styles";

/**
 * Brand palette derived directly from the INKOTEA logo:
 *  - Olive/sage green badge ring → primary
 *  - Warm cream/gold tea backdrop → secondary
 *  - Tea brown (cup contents) → success/accent
 */
export const brandColors = {
  oliveGreen: "#5C6B2C",
  oliveGreenDark: "#3F4A1C",
  oliveGreenLight: "#7A8B45",
  amberGold: "#D4A574",
  amberGoldDark: "#B68554",
  amberGoldLight: "#E6C19A",
  teaBrown: "#6B3F1B",
  teaBrownDark: "#4A2B12",
  teaBrownLight: "#8E5A2E",
  cream: "#FBF7F1",
  creamDark: "#F2EBDD",
  charcoal: "#1C1A12",
  charcoalLight: "#2A2719",
  textOnDark: "#F5EFE5",
} as const;

export const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: brandColors.oliveGreen,
    dark: brandColors.oliveGreenDark,
    light: brandColors.oliveGreenLight,
    contrastText: brandColors.cream,
  },
  secondary: {
    main: brandColors.amberGold,
    dark: brandColors.amberGoldDark,
    light: brandColors.amberGoldLight,
    contrastText: brandColors.charcoal,
  },
  success: {
    main: brandColors.teaBrown,
    dark: brandColors.teaBrownDark,
    light: brandColors.teaBrownLight,
    contrastText: brandColors.cream,
  },
  background: {
    default: brandColors.cream,
    paper: "#FFFFFF",
  },
  text: {
    primary: brandColors.charcoal,
    secondary: "#5A5240",
  },
  divider: "rgba(92, 107, 44, 0.14)",
  action: {
    hover: "rgba(92, 107, 44, 0.06)",
    selected: "rgba(92, 107, 44, 0.10)",
  },
};

export const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: brandColors.oliveGreenLight,
    dark: brandColors.oliveGreen,
    light: "#9CAD66",
    contrastText: brandColors.charcoal,
  },
  secondary: {
    main: brandColors.amberGold,
    dark: brandColors.amberGoldDark,
    light: brandColors.amberGoldLight,
    contrastText: brandColors.charcoal,
  },
  success: {
    main: brandColors.teaBrownLight,
    dark: brandColors.teaBrown,
    light: "#B47B4D",
    contrastText: brandColors.charcoal,
  },
  background: {
    default: brandColors.charcoal,
    paper: brandColors.charcoalLight,
  },
  text: {
    primary: brandColors.textOnDark,
    secondary: "#C9C0A8",
  },
  divider: "rgba(245, 239, 229, 0.12)",
  action: {
    hover: "rgba(245, 239, 229, 0.06)",
    selected: "rgba(245, 239, 229, 0.10)",
  },
};
