"use client";

import { useField } from "formik";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import type { SxProps, Theme } from "@mui/material/styles";

interface Option {
  value: string;
  label: string;
}

interface Props {
  name: string;
  label: string;
  options: readonly Option[] | Option[];
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";

  // ADD THIS
  sx?: SxProps<Theme>;
}

/**
 * Formik-bound MUI Select rendered as a `select` TextField for consistent
 * styling. Shows validation errors via `helperText` when touched.
 */
export function FormikSelect({
  name,
  label,
  options,
  placeholder,
  required,
  fullWidth = true,
  size = "medium",
  sx,
}: Props) {
  const [field, meta] = useField(name);

  const showError = Boolean(meta.touched && meta.error);

  const hasPlaceholder = Boolean(placeholder);

  return (
    <TextField
      {...field}
      select
      label={label}
      required={required}
      fullWidth={fullWidth}
      size={size}
      error={showError}
      helperText={showError ? meta.error : undefined}
      SelectProps={{ displayEmpty: hasPlaceholder }}
      InputLabelProps={
        hasPlaceholder ? { shrink: true } : undefined
      }

      // ADD THIS
      sx={sx}
    >
      {hasPlaceholder ? (
        <MenuItem
          value=""
          disabled
          sx={{ color: "text.disabled" }}
        >
          {placeholder}
        </MenuItem>
      ) : null}

      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
}