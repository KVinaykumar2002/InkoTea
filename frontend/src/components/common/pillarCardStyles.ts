import type { SxProps, Theme } from "@mui/material/styles";

/** Tighter rhythm for icon + title + body pillar cards */
export const PILLAR_ICON_SIZE = 48;

export const pillarIconSx: SxProps<Theme> = {
  width: PILLAR_ICON_SIZE,
  height: PILLAR_ICON_SIZE,
  borderRadius: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const pillarCardPadding = { xs: 2.5, md: 3 } as const;

export const pillarCardSpacing = 2;

export const compactSectionHeadingSx: SxProps<Theme> = {
  mb: { xs: 3.5, md: 4.5 },
};

export const compactSectionPy = { xs: 5, md: 8 } as const;

export const compactCardContentSx: SxProps<Theme> = {
  p: pillarCardPadding,
  "&:last-child": { pb: pillarCardPadding },
};
