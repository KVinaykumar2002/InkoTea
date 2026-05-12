import * as yup from "yup";

export const franchiseFormSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long")
    .required("Name is required"),
  phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")
    .required("Phone is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .max(120, "Email is too long")
    .required("Email is required"),
  city: yup
    .string()
    .trim()
    .min(2, "Enter your city")
    .max(80, "City is too long")
    .required("City is required"),
  investmentRange: yup
    .string()
    .oneOf(
      ["under-3l", "3l-6.5l", "6.5l-9l", "9l-plus"],
      "Pick an investment range",
    )
    .required("Pick an investment range"),
  model: yup
    .string()
    .oneOf(["kiosk", "cafe", "both"], "Pick a model")
    .required("Pick a model"),
  message: yup.string().trim().max(500, "Keep it under 500 characters"),
});

export const INVESTMENT_RANGE_OPTIONS = [
  { value: "under-3l", label: "Under ₹3 Lakhs (Kiosk)" },
  { value: "3l-6.5l", label: "₹3 Lakhs – ₹6.5 Lakhs" },
  { value: "6.5l-9l", label: "₹6.5 Lakhs – ₹9 Lakhs (Café)" },
  { value: "9l-plus", label: "₹9 Lakhs+" },
] as const;

export const MODEL_OPTIONS = [
  { value: "kiosk", label: "INKOTEA Kiosk" },
  { value: "cafe", label: "INKOTEA Social Café" },
  { value: "both", label: "Open to both — advise me" },
] as const;
