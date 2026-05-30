import { createTheme, alpha } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material/styles";
import { lightPalette, darkPalette, brandColors } from "./palette";
import { fontFamily, fontSize, fontWeight, lineHeight } from "./fonts";
import { typography } from "./typography";

/**
 * Build the INKOTEA MUI theme for a given palette mode.
 * Centralizes design tokens (palette, typography, shape, components) so the
 * brand can be re-skinned in one place.
 */
export const buildTheme = (mode: PaletteMode) => {
  const base = createTheme({
    palette: mode === "dark" ? darkPalette : lightPalette,
    typography,
    shape: { borderRadius: 12 },
    spacing: 8,
    breakpoints: {
      values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: "smooth" },
          body: {
            overflowX: "hidden",
            fontFamily: fontFamily.stack,
            fontSize: fontSize.base,
            fontWeight: fontWeight.base,
            lineHeight: lineHeight.base,
          },
          "::selection": {
            backgroundColor: brandColors.amberGold,
            color: brandColors.charcoal,
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 24,
            paddingBlock: 10,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": { transform: "translateY(-1px)" },
          },
          containedPrimary: ({ theme }) => ({
            boxShadow: `0 6px 20px -8px ${alpha(theme.palette.primary.main, 0.5)}`,
            "&:hover": {
              boxShadow: `0 10px 28px -8px ${alpha(theme.palette.primary.main, 0.7)}`,
            },
          }),
          containedSecondary: ({ theme }) => ({
            boxShadow: `0 6px 20px -8px ${alpha(theme.palette.secondary.main, 0.6)}`,
          }),
          sizeLarge: {
            paddingInline: 32,
            paddingBlock: 14,
            fontSize: fontSize.base,
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: ({ theme }) => ({
            border: `1px solid ${theme.palette.divider}`,
            transition:
              "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
          }),
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: "transparent" },
      },
      MuiContainer: {
        defaultProps: { maxWidth: "lg" },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: fontFamily.stack,
            fontWeight: fontWeight.semibold,
            fontSize: fontSize.sm,
          },
        },
      },
      MuiTypography: {
        defaultProps: { variantMapping: undefined },
        styleOverrides: {
          root: {
            fontFamily: fontFamily.stack,
            fontWeight: fontWeight.base,
          },
          h1: {
            fontFamily: fontFamily.stack,
            fontSize: fontSize.base,
            fontWeight: fontWeight.bold,
            lineHeight: lineHeight.base,
          },
          h2: {
            fontFamily: fontFamily.stack,
            fontSize: fontSize["4xl"],
            fontWeight: fontWeight.bold,
            lineHeight: lineHeight.snug,
          },
          h3: {
            fontFamily: fontFamily.stack,
            fontSize: fontSize["3xl"],
            fontWeight: fontWeight.semibold,
            lineHeight: lineHeight.snug,
          },
          h4: {
            fontFamily: fontFamily.stack,
            fontSize: fontSize["2xl"],
            fontWeight: fontWeight.semibold,
            lineHeight: lineHeight.snug,
          },
          h5: {
            fontFamily: fontFamily.stack,
            fontSize: fontSize.xl,
            fontWeight: fontWeight.semibold,
            lineHeight: lineHeight.snug,
          },
          h6: {
            fontFamily: fontFamily.stack,
            fontSize: fontSize.lg,
            fontWeight: fontWeight.semibold,
            lineHeight: lineHeight.snug,
          },
          body1: {
            fontSize: fontSize.base,
            fontWeight: fontWeight.base,
            lineHeight: lineHeight.base,
          },
          body2: {
            fontSize: fontSize.md,
            fontWeight: fontWeight.base,
            lineHeight: lineHeight.base,
          },
          button: {
            fontSize: fontSize.base,
            lineHeight: lineHeight.base,
          },
          caption: { fontSize: fontSize.xs },
          overline: { fontSize: fontSize.sm },
        },
      },
      MuiTextField: {
        defaultProps: { variant: "outlined", fullWidth: true, size: "medium" },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            fontSize: fontSize.base,
            lineHeight: lineHeight.base,
            "&::placeholder": {
              opacity: 0.55,
              fontWeight: 400,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 14,
            fontSize: fontSize.base,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFFFFF"
                : alpha("#FFFFFF", 0.04),
            transition:
              "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor:
                theme.palette.mode === "light"
                  ? alpha(theme.palette.text.primary, 0.22)
                  : alpha("#FFFFFF", 0.22),
              transition: "border-color 0.2s ease",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor:
                theme.palette.mode === "light"
                  ? alpha(theme.palette.primary.main, 0.5)
                  : alpha(theme.palette.primary.light, 0.6),
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
              borderWidth: 2,
            },
            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.error.main,
            },
            "&.Mui-disabled": {
              backgroundColor:
                theme.palette.mode === "light"
                  ? alpha(theme.palette.text.primary, 0.03)
                  : alpha("#FFFFFF", 0.02),
            },
          }),
          input: {
            paddingTop: 17.5,
            paddingBottom: 17.5,
            paddingLeft: 16,
            paddingRight: 16,
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px transparent inset",
              transition: "background-color 9999s ease-in-out 0s",
            },
          },
          inputSizeSmall: {
            paddingTop: 13,
            paddingBottom: 13,
            paddingLeft: 14,
            paddingRight: 14,
          },
          multiline: {
            paddingTop: 17.5,
            paddingBottom: 17.5,
            paddingLeft: 16,
            paddingRight: 16,
            "&.MuiInputBase-sizeSmall": {
              paddingTop: 13,
              paddingBottom: 13,
              paddingLeft: 14,
              paddingRight: 14,
            },
          },
          inputMultiline: {
            padding: 0,
          },
          notchedOutline: { transition: "border-color 0.2s ease" },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontFamily: "inherit",
            fontSize: fontSize.base,
            fontWeight: fontWeight.medium,
            lineHeight: lineHeight.snug,
            color:
              theme.palette.mode === "light"
                ? alpha(theme.palette.text.primary, 0.62)
                : alpha("#FFFFFF", 0.62),
            "&.Mui-focused": {
              color: theme.palette.primary.main,
              fontWeight: 600,
            },
            "&.Mui-error": { color: theme.palette.error.main },
            "&.MuiInputLabel-shrink": {
              fontWeight: 600,
              letterSpacing: "0.01em",
            },
            // Override MUI's outlined-variant transforms in the root slot so
            // they are emitted with full specificity (the `outlined` slot in
            // MUI v6 uses ownerState variants that swallow flat overrides).
            "&.MuiInputLabel-outlined": {
              transform: "translate(16px, 19px) scale(1)",
              "&.MuiInputLabel-shrink": {
                transform: "translate(14px, -9px) scale(0.78)",
              },
              "&.MuiInputLabel-sizeSmall": {
                transform: "translate(14px, 14px) scale(1)",
                "&.MuiInputLabel-shrink": {
                  transform: "translate(12px, -8px) scale(0.78)",
                },
              },
            },
          }),
          sizeSmall: { fontSize: fontSize.md },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: ({ theme }) => ({
            marginInline: 6,
            marginTop: 6,
            fontSize: fontSize.sm,
            lineHeight: 1.4,
            "&.Mui-error": { color: theme.palette.error.main },
          }),
        },
      },
      MuiSelect: {
        defaultProps: {
          MenuProps: {
            PaperProps: {
              sx: {
                mt: 1,
                borderRadius: 2,
                boxShadow: "0 18px 50px -16px rgba(0,0,0,0.22)",
                border: 1,
                borderColor: "divider",
                maxHeight: 360,
              },
            },
            anchorOrigin: { vertical: "bottom", horizontal: "left" },
            transformOrigin: { vertical: "top", horizontal: "left" },
          },
        },
        styleOverrides: {
          select: {
            fontSize: fontSize.base,
            fontWeight: fontWeight.medium,
            display: "flex",
            alignItems: "center",
          },
          icon: ({ theme }) => ({
            color: theme.palette.text.secondary,
            transition: "transform 0.2s ease",
          }),
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: 12,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: "0 18px 50px -16px rgba(0,0,0,0.22)",
            backgroundImage: "none",
          }),
          list: { paddingTop: 8, paddingBottom: 8 },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontWeight: fontWeight.medium,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 16,
            paddingRight: 16,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
            "&.Mui-selected": {
              backgroundColor: alpha(theme.palette.primary.main, 0.12),
              fontWeight: 600,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.16),
              },
            },
          }),
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.secondary,
            marginRight: 6,
            "& .MuiTypography-root": {
              color: theme.palette.text.primary,
              fontSize: fontSize.base,
              fontWeight: fontWeight.semibold,
            },
          }),
          positionStart: { marginLeft: -2 },
        },
      },
      MuiLink: {
        defaultProps: { underline: "hover" },
      },
    },
  });

  return base;
};
