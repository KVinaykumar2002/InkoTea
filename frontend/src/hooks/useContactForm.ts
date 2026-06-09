"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { submitLead } from "@/services/leads";
import type { LeadPayload } from "@/types";
import { contactFormSchema } from "@/features/contact/validationSchema";

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: "" | "franchise" | "investor" | "general" | "feedback";
  message: string;
}

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

interface SnackbarState {
  open: boolean;
  severity: "success" | "error";
  message: string;
}

export function useContactForm() {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "success",
    message: "",
  });
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const formik = useFormik<ContactFormValues>({
    initialValues,
    validationSchema: contactFormSchema,
    onSubmit: async (values, helpers) => {
      const payload: LeadPayload = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone,
        city: "Via contact page",
        message: `[${values.subject}] ${values.message.trim()}`,
        source: "contact",
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
