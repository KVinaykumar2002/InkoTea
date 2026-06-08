"use client";

import Box from "@mui/material/Box";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type AdminFormFieldProps = TextFieldProps & {
  label: string;
  hint?: string;
};

/**
 * Stacked-label admin field (filled variant). Avoids the marketing site's
 * outlined floating labels that overlap in tight dialog layouts.
 */
export function AdminFormField({
  label,
  hint,
  id,
  ...props
}: AdminFormFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        component="label"
        htmlFor={fieldId}
        variant="body2"
        fontWeight={600}
        sx={{ display: "block", mb: 1, color: "text.primary" }}
      >
        {label}
      </Typography>
      <TextField
        id={fieldId}
        variant="filled"
        fullWidth
        hiddenLabel
        {...props}
        sx={{
          "& .MuiFilledInput-root": {
            borderRadius: 2,
            bgcolor: "grey.50",
            "&:before, &:after": { display: "none" },
            "&:hover": { bgcolor: "grey.100" },
            "&.Mui-focused": { bgcolor: "grey.100" },
          },
          ...props.sx,
        }}
      />
      {hint && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: "block" }}>
          {hint}
        </Typography>
      )}
    </Box>
  );
}
