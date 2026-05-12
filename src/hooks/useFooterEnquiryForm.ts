"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { submitLead } from "@/services/leads";
import type { LeadPayload } from "@/types";

export interface FooterEnquiryValues {
  name: string;
  phone: string;
  city: string;
  message: string;
}

const initialValues: FooterEnquiryValues = {
  name: "",
  phone: "",
  city: "",
  message: "",
};

const validationSchema = yup.object({
  name: yup.string().trim().min(2, "Name is too short").required("Name is required"),
  phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")
    .required("Phone is required"),
  city: yup.string().trim().min(2, "City is too short").required("City is required"),
  message: yup.string().trim().max(400, "Keep it under 400 characters"),
});

interface SnackbarState {
  open: boolean;
  severity: "success" | "error";
  message: string;
}

/**
 * Encapsulates state, validation and submission for the footer mini-enquiry
 * form. Components consuming this hook stay declarative.
 */
export function useFooterEnquiryForm() {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "success",
    message: "",
  });
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const formik = useFormik<FooterEnquiryValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      const payload: LeadPayload = {
        name: values.name.trim(),
        phone: values.phone,
        city: values.city.trim(),
        message: values.message.trim(),
        source: "footer",
      };
      try {
        const res = await submitLead(payload);
        setSnackbar({ open: true, severity: "success", message: res.message });
        setSubmittedName(payload.name);
        helpers.resetForm();
      } catch {
        setSnackbar({
          open: true,
          severity: "error",
          message: "Something went wrong. Please try again.",
        });
      }
    },
  });

  const closeSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const resetSubmitted = () => setSubmittedName(null);

  return { formik, snackbar, closeSnackbar, submittedName, resetSubmitted };
}
