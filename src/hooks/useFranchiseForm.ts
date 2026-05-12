"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { submitLead } from "@/services/leads";
import type { FranchiseModelKey, LeadPayload } from "@/types";
import { franchiseFormSchema } from "@/features/franchise/validationSchema";

export interface FranchiseFormValues {
  name: string;
  phone: string;
  email: string;
  city: string;
  investmentRange: "" | "under-3l" | "3l-6.5l" | "6.5l-9l" | "9l-plus";
  model: "" | FranchiseModelKey | "both";
  message: string;
}

const initialValues: FranchiseFormValues = {
  name: "",
  phone: "",
  email: "",
  city: "",
  investmentRange: "",
  model: "",
  message: "",
};

interface SnackbarState {
  open: boolean;
  severity: "success" | "error";
  message: string;
}

/**
 * Encapsulates state, validation, and submission for the franchise enquiry
 * form. Returns the formik instance plus snackbar bindings for the UI layer.
 */
export function useFranchiseForm() {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "success",
    message: "",
  });
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const formik = useFormik<FranchiseFormValues>({
    initialValues,
    validationSchema: franchiseFormSchema,
    onSubmit: async (values, helpers) => {
      const payload: LeadPayload = {
        name: values.name.trim(),
        phone: values.phone,
        email: values.email.trim(),
        city: values.city.trim(),
        investmentRange: values.investmentRange,
        model: values.model as FranchiseModelKey | "both",
        message: values.message.trim(),
        source: "franchise",
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
