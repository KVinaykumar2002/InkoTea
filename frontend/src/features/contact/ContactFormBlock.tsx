"use client";

import { FormikProvider } from "formik";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { FormikTextField } from "@/components/forms/FormikTextField";
import { FormikPhoneField } from "@/components/forms/FormikPhoneField";
import { FormikSelect } from "@/components/forms/FormikSelect";
import { FormSuccessState } from "@/components/forms/FormSuccessState";
import { buildLightSurfaceFieldSx } from "@/components/forms/darkSurfaceFieldSx";
import { useContactForm } from "@/hooks/useContactForm";
import { SUBJECT_OPTIONS } from "@/features/contact/validationSchema";
import { contactCardSx, lightFormSubmitSx } from "./contactStyles";

export function ContactFormBlock() {
  const { formik, snackbar, closeSnackbar, submittedName, resetSubmitted } =
    useContactForm();

  const fieldStyles = buildLightSurfaceFieldSx("#FFFFFF");
  const isSubmitting = formik.isSubmitting;

  return (
    <ScrollReveal fullHeight>
      <Box id="contact-form" sx={{ ...contactCardSx, scrollMarginTop: 96 }}>
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 3 }}>
          <SendIcon sx={{ color: "primary.main" }} />
          <Typography variant="h5">Send us a message</Typography>
        </Stack>

        {submittedName ? (
          <FormSuccessState
            name={submittedName}
            description="We've received your message and will reply within one business day."
            onReset={resetSubmitted}
          />
        ) : (
          <FormikProvider value={formik}>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              aria-busy={isSubmitting}
            >
              <Box
                sx={{
                  transition: "opacity 0.2s ease",
                  opacity: isSubmitting ? 0.7 : 1,
                  pointerEvents: isSubmitting ? "none" : "auto",
                }}
              >
                <Stack spacing={2}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <FormikTextField
                      name="name"
                      label="Your Name"
                      required
                      autoComplete="name"
                      sx={fieldStyles}
                    />
                    <FormikTextField
                      name="email"
                      label="Email Address"
                      type="email"
                      required
                      autoComplete="email"
                      sx={fieldStyles}
                    />
                  </Stack>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <FormikPhoneField
                      name="phone"
                      label="Phone Number"
                      required
                      sx={fieldStyles}
                    />
                    <FormikSelect
                      name="subject"
                      label="Subject"
                      placeholder="Select subject"
                      options={SUBJECT_OPTIONS}
                      required
                      sx={fieldStyles}
                    />
                  </Stack>

                  <FormikTextField
                    name="message"
                    label="Message"
                    multiline
                    minRows={5}
                    required
                    sx={{
                      ...fieldStyles,
                      "& .MuiOutlinedInput-root": {
                        ...fieldStyles["& .MuiOutlinedInput-root"],
                        minHeight: "150px",
                        alignItems: "flex-start",
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    endIcon={
                      isSubmitting ? (
                        <CircularProgress size={16} color="inherit" aria-label="Sending" />
                      ) : (
                        <SendIcon />
                      )
                    }
                    sx={lightFormSubmitSx}
                  >
                    {isSubmitting ? "Sending…" : "Send Message"}
                  </Button>

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ pt: 0.5 }}>
                    <LockOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary">
                      Your information is secure and confidential.
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </FormikProvider>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ScrollReveal>
  );
}
