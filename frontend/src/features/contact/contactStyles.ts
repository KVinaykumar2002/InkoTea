import type { SxProps, Theme } from "@mui/material/styles";
import { brandColors } from "@/theme/palette";

export const contactPageBg = brandColors.cream;

export const contactCardSx: SxProps<Theme> = {
  p: { xs: 2.5, md: 3 },
  borderRadius: 3,
  bgcolor: "background.paper",
  border: 1,
  borderColor: "divider",
  boxShadow: "0 10px 36px -16px rgba(28, 26, 18, 0.12)",
  height: "100%",
};

export const contactIconBoxSx: SxProps<Theme> = {
  width: 48,
  height: 48,
  borderRadius: 2,
  bgcolor: brandColors.creamDark,
  color: brandColors.teaBrown,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export const contactArrowButtonSx: SxProps<Theme> = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: 1,
  borderColor: "divider",
  color: brandColors.teaBrown,
  bgcolor: "background.paper",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
  "&:hover": {
    bgcolor: brandColors.cream,
    borderColor: brandColors.amberGold,
  },
};

export const contactPrimaryButtonSx: SxProps<Theme> = {
  textTransform: "none",
  fontWeight: 700,
  borderRadius: "999px",
  px: 2.5,
  py: 1.1,
  bgcolor: brandColors.teaBrown,
  color: "#fff",
  boxShadow: "0 10px 28px -12px rgba(74, 43, 18, 0.35)",
  "&:hover": { bgcolor: brandColors.teaBrownDark },
};

export const contactOutlinedButtonSx: SxProps<Theme> = {
  textTransform: "none",
  fontWeight: 600,
  borderRadius: "999px",
  px: 2.5,
  py: 1.1,
  borderColor: "divider",
  color: "text.primary",
  bgcolor: "background.paper",
  "&:hover": {
    borderColor: brandColors.teaBrown,
    bgcolor: brandColors.cream,
  },
};

export const lightFormSubmitSx: SxProps<Theme> = {
  alignSelf: { xs: "stretch", sm: "flex-start" },
  width: { xs: "100%", sm: "auto" },
  minWidth: { xs: 0, sm: 220 },
  mt: 1,
  px: 4,
  py: 1.4,
  borderRadius: "999px",
  textTransform: "none",
  fontWeight: 700,
  bgcolor: brandColors.teaBrown,
  color: "#fff",
  boxShadow: "0 10px 28px -12px rgba(74, 43, 18, 0.3)",
  "&:hover": { bgcolor: brandColors.teaBrownDark },
  "&.Mui-disabled": {
    bgcolor: "rgba(74, 43, 18, 0.45)",
    color: "rgba(255,255,255,0.8)",
  },
};
