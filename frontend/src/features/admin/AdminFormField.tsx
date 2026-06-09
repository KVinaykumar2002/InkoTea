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
            border: "1px solid",
            borderColor: "divider",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            "&:before, &:after": { display: "none" },
            "&:hover": {
              bgcolor: "grey.100",
              borderColor: "text.disabled",
            },
            "&.Mui-focused": {
              bgcolor: "background.paper",
              borderColor: "primary.main",
              boxShadow: (t) => `0 0 0 3px ${t.palette.primary.main}22`,
            },
            ...(props.multiline && {
              alignItems: "flex-start",
              "& .MuiFilledInput-input": {
                py: 1.5,
              },
            }),
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
