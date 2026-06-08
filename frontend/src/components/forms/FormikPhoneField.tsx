"use client";

import { useField } from "formik";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

type Props = Omit<TextFieldProps, "name" | "value" | "onChange" | "error"> & {
  name: string;
};

/**
 * Indian-localized phone input bound to Formik. Strips non-digits and
 * caps length at 10 digits before propagating the change.
 *
 * Shows a default `10-digit mobile number` hint until the user starts
 * typing or a validation error appears, so the format expectation is
 * obvious before they fail validation.
 */
export function FormikPhoneField({ name, helperText, ...rest }: Props) {
  const [field, meta, helpers] = useField(name);
  const showError = Boolean(meta.touched && meta.error);
  const hint = helperText ?? "10-digit mobile number";

  return (
    <TextField
      {...rest}
      name={name}
      value={field.value ?? ""}
      onBlur={field.onBlur}
      onChange={(e) => {
        const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
        helpers.setValue(digits);
      }}
      type="tel"
      inputMode="numeric"
      placeholder="98765 43210"
      autoComplete="tel-national"
      InputLabelProps={{ shrink: true }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">+91</InputAdornment>
          ),
        },
      }}
      error={showError}
      helperText={showError ? meta.error : hint}
    />
  );
}
