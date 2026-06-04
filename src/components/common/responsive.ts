import type { SxProps, Theme } from "@mui/material/styles";

/** Single column on phones; two columns from `sm` upward. */
export const gridTwoColFromSm = {
  xs: "1fr",
  sm: "1fr 1fr",
} as const;

/** Single column on phones; four columns from `md`. */
export const gridFourColFromMd = {
  xs: "1fr",
  sm: "1fr 1fr",
  md: "repeat(4, 1fr)",
} as const;

/** Full-width CTAs on mobile; auto width with optional min from `sm`. */
export const ctaButtonMobileSx = (minSm = 220): SxProps<Theme> => ({
  width: { xs: "100%", sm: "auto" },
  minWidth: { xs: 0, sm: minSm },
  maxWidth: { xs: "100%", sm: "none" },
});

/** Prevents flex children from forcing horizontal page scroll. */
export const containOverflowSx: SxProps<Theme> = {
  maxWidth: "100%",
  overflowX: "hidden",
};
