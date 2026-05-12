"use client";

import { FormikProvider } from "formik";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { FormikTextField } from "@/components/forms/FormikTextField";
import { FormikPhoneField } from "@/components/forms/FormikPhoneField";
import { FormikSelect } from "@/components/forms/FormikSelect";
import { FormSuccessState } from "@/components/forms/FormSuccessState";
import {
  buildDarkSurfaceFieldSx,
  darkSurfaceSubmitSx,
} from "@/components/forms/darkSurfaceFieldSx";
import { useContactForm } from "@/hooks/useContactForm";
import { SUBJECT_OPTIONS } from "@/features/contact/validationSchema";

export function ContactFormBlock() {
  const { formik, snackbar, closeSnackbar, submittedName, resetSubmitted } =
    useContactForm();

  const CARD_SURFACE = "#4A240F";
  const fieldStyles = buildDarkSurfaceFieldSx(CARD_SURFACE);
  const isSubmitting = formik.isSubmitting;

  return (
    <ScrollReveal>
      <Box
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: "28px",
          bgcolor: CARD_SURFACE,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
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
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                  >
                    <FormikTextField
                      name="name"
                      label="Your name"
                      required
                      autoComplete="name"
                      sx={fieldStyles}
                    />
                    <FormikTextField
                      name="email"
                      label="Email"
                      type="email"
                      required
                      autoComplete="email"
                      sx={fieldStyles}
                    />
                  </Stack>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                  >
                    <FormikPhoneField
                      name="phone"
                      label="Phone"
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
                        <CircularProgress
                          size={16}
                          color="inherit"
                          aria-label="Sending"
                        />
                      ) : (
                        <SendIcon />
                      )
                    }
                    sx={{ ...darkSurfaceSubmitSx, minWidth: "220px" }}
                  >
                    {isSubmitting ? "Sending…" : "Send message"}
                  </Button>
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
