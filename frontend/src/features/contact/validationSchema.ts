import * as yup from "yup";

export const contactFormSchema = yup.object({
  name: yup.string().trim().min(2, "Enter your name").required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")
    .required("Phone is required"),
  subject: yup
    .string()
    .oneOf(
      ["franchise", "investor", "general", "feedback"],
      "Pick a subject",
    )
    .required("Pick a subject"),
  message: yup
    .string()
    .trim()
    .min(10, "Tell us a bit more (10+ characters)")
    .max(800, "Keep it under 800 characters")
    .required("Message is required"),
});

export const SUBJECT_OPTIONS = [
  { value: "franchise", label: "Franchise enquiry" },
  { value: "investor", label: "Investor enquiry" },
  { value: "general", label: "General question" },
  { value: "feedback", label: "Feedback / suggestion" },
] as const;
