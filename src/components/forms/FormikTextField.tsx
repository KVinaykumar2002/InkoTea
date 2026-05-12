"use client";

import { useField } from "formik";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

type Props = Omit<TextFieldProps, "name" | "value" | "onChange" | "error"> & {
  name: string;
};

/**
 * Formik-bound MUI TextField. Wires value, blur, error and helperText
 * automatically. Pass any standard `TextFieldProps` for further customization.
 */
export function FormikTextField({ name, helperText, ...rest }: Props) {
  const [field, meta] = useField(name);
  const showError = Boolean(meta.touched && meta.error);

  return (
    <TextField
      {...field}
      {...rest}
      error={showError}
      helperText={showError ? meta.error : helperText}
    />
  );
}
