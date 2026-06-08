import type { SxProps, Theme } from "@mui/material/styles";

/**
 * Cream-on-tea-brown field tokens shared by every lead-capture form
 * (FooterEnquiryForm, ContactFormBlock, FranchiseForm). These cards stay
 * warm regardless of the global light/dark theme — so we hardcode the
 * tokens here rather than pulling from `theme.palette`.
 */
export const FIELD_TEXT = "#E9D7C3";
export const FIELD_CARET = "#D8A56A";
export const FIELD_ERROR = "#FFB4B4";

/**
 * Shape of the dark-surface field sx object. Indexed by the MUI selector
 * keys it overrides, so callers can spread `fieldStyles["& .MuiOutlinedInput-root"]`
 * into a per-field override (e.g. tall multiline textarea).
 */
export type DarkSurfaceFieldSx = {
  [key: string]: Record<string, unknown>;
};

/**
 * `sx` builder for inputs sitting on a tea-brown card. The notched
 * label background must match the card's surface color so the floating
 * label appears to "cut" the border cleanly — pass the parent card's
 * background as `surface`.
 */
export const buildDarkSurfaceFieldSx = (
  surface: string,
): DarkSurfaceFieldSx => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "18px",
    backgroundColor: "rgba(255,255,255,0.02)",
    color: FIELD_TEXT,
    fontSize: "var(--font-size-base)",
    minHeight: "56px",

    "& fieldset": {
      borderColor: "rgba(255,255,255,0.16)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.28)",
    },
    "&.Mui-focused fieldset": {
      borderColor: FIELD_CARET,
      borderWidth: "1.5px",
    },
    "&.Mui-disabled fieldset": {
      borderColor: "rgba(255,255,255,0.10)",
    },

    "& input": {
      padding: "15px 14px",
      color: FIELD_TEXT,
      caretColor: FIELD_CARET,
    },
    "& textarea": {
      padding: "15px 14px",
      color: FIELD_TEXT,
      caretColor: FIELD_CARET,
    },

    // Chrome / Safari autofill: force cream text + transparent background
    // so autofilled values stay readable on the dark brown card regardless
    // of the global theme.
    "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active, & textarea:-webkit-autofill":
      {
        WebkitTextFillColor: FIELD_TEXT,
        caretColor: FIELD_CARET,
        transition: "background-color 600000s 0s, color 600000s 0s",
        borderRadius: "inherit",
      },
  },

  "& .MuiInputLabel-root": {
    color: "rgba(233,215,195,0.72)",
    fontSize: "var(--font-size-base)",
    transform: "translate(14px, 17px) scale(1)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: FIELD_CARET,
  },
  "& .MuiInputLabel-shrink": {
    transform: "translate(14px, -9px) scale(0.82)",
    backgroundColor: surface,
    padding: "0 6px",
    borderRadius: "6px",
  },

  "& .MuiSelect-select": {
    color: FIELD_TEXT,
  },
  "& .MuiSelect-icon": {
    color: "rgba(233,215,195,0.7)",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(233,215,195,0.55)",
    opacity: 1,
  },

  // Phone field "+91" prefix
  "& .MuiInputAdornment-root, & .MuiInputAdornment-root .MuiTypography-root": {
    color: FIELD_TEXT,
    fontSize: "var(--font-size-base)",
  },

  "& .MuiFormHelperText-root": {
    color: "rgba(233,215,195,0.65)",
    marginLeft: "6px",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: FIELD_ERROR,
  },
});

/** White-card field tokens for popup / light-surface enquiry dialogs. */
export const buildLightSurfaceFieldSx = (
  surface = "#FFFFFF",
): DarkSurfaceFieldSx => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "18px",
    backgroundColor: surface,
    color: "text.primary",
    fontSize: "var(--font-size-base)",
    minHeight: "56px",

    "& fieldset": {
      borderColor: "divider",
    },
    "&:hover fieldset": {
      borderColor: "text.disabled",
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
      borderWidth: "1.5px",
    },
    "&.Mui-disabled fieldset": {
      borderColor: "action.disabledBackground",
    },

    "& input, & textarea": {
      padding: "15px 14px",
      color: "inherit",
      caretColor: "primary.main",
    },

    "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active, & textarea:-webkit-autofill":
      {
        WebkitTextFillColor: "#1C1A12",
        caretColor: "primary.main",
        transition: "background-color 600000s 0s, color 600000s 0s",
        borderRadius: "inherit",
      },
  },

  "& .MuiInputLabel-root": {
    color: "text.secondary",
    fontSize: "var(--font-size-base)",
    transform: "translate(14px, 17px) scale(1)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "primary.main",
  },
  "& .MuiInputLabel-shrink": {
    transform: "translate(14px, -9px) scale(0.82)",
    backgroundColor: surface,
    padding: "0 6px",
    borderRadius: "6px",
  },

  "& .MuiSelect-select": {
    color: "text.primary",
  },
  "& .MuiSelect-icon": {
    color: "text.secondary",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "text.disabled",
    opacity: 1,
  },

  "& .MuiInputAdornment-root, & .MuiInputAdornment-root .MuiTypography-root": {
    color: "text.primary",
    fontSize: "var(--font-size-base)",
  },

  "& .MuiFormHelperText-root": {
    color: "text.secondary",
    marginLeft: "6px",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "error.main",
  },
});

/**
 * Shared submit button sx for the warm tea-brown forms — amber pill, dark
 * label text, generous touch target. Each form passes its own `minWidth`
 * via the `sx` override on `<Button>`.
 */
export const darkSurfaceSubmitSx: SxProps<Theme> = {
  alignSelf: { xs: "stretch", sm: "flex-start" },
  width: { xs: "100%", sm: "auto" },
  minWidth: { xs: 0, sm: 220 },
  maxWidth: { xs: "100%", sm: "none" },
  mt: 1,
  px: 4,
  py: 1.4,
  borderRadius: "999px",
  textTransform: "none",
  fontSize: "var(--font-size-base)",
  fontWeight: 700,
  backgroundColor: FIELD_CARET,
  color: "#1E120B",
  boxShadow: "0 10px 28px rgba(216,165,106,0.2)",
  "&:hover": { backgroundColor: "#E2B37C" },
  "&.Mui-disabled": {
    backgroundColor: "rgba(216,165,106,0.6)",
    color: "rgba(30,18,11,0.7)",
  },
};
