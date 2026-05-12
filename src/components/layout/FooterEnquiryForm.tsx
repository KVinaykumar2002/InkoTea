"use client";

import { FormikProvider } from "formik";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";

import { FormikTextField } from "@/components/forms/FormikTextField";
import { FormikPhoneField } from "@/components/forms/FormikPhoneField";
import { FormSuccessState } from "@/components/forms/FormSuccessState";
import {
  buildDarkSurfaceFieldSx,
  darkSurfaceSubmitSx,
} from "@/components/forms/darkSurfaceFieldSx";
import { useFooterEnquiryForm } from "@/hooks/useFooterEnquiryForm";

/**
 * Footer enquiry form — primary lead capture in the global footer.
 * Renders an inline success state once the user submits so the card
 * confirms receipt without needing them to find the Snackbar.
 */
export function FooterEnquiryForm() {
  const { formik, snackbar, closeSnackbar, submittedName, resetSubmitted } =
    useFooterEnquiryForm();

  // The label-shrink notch backing must match the surface immediately
  // behind the input. The footer card sits on a slightly different brown
  // than ContactFormBlock / FranchiseForm.
  const FOOTER_CARD_SURFACE = "#3B1D0E";
  const fieldStyles = buildDarkSurfaceFieldSx(FOOTER_CARD_SURFACE);
  const isSubmitting = formik.isSubmitting;

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: "820px", ml: "auto" }}>
        {submittedName ? (
          <FormSuccessState
            name={submittedName}
            description="Our franchise team will reach out within 24 hours with the full investment kit."
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
                    direction={{ xs: "column", md: "row" }}
                    spacing={1.5}
                  >
                    <Box flex={1}>
                      <FormikTextField
                        name="name"
                        label="Your name"
                        required
                        fullWidth
                        autoComplete="name"
                        sx={fieldStyles}
                      />
                    </Box>

                    <Box flex={1}>
                      <FormikPhoneField
                        name="phone"
                        label="Phone"
                        required
                        fullWidth
                        sx={fieldStyles}
                      />
                    </Box>
                  </Stack>

                  <FormikTextField
                    name="city"
                    label="City"
                    required
                    fullWidth
                    autoComplete="address-level2"
                    sx={fieldStyles}
                  />

                  <FormikTextField
                    name="message"
                    label="Message (optional)"
                    multiline
                    minRows={3}
                    fullWidth
                    sx={{
                      ...fieldStyles,
                      "& .MuiOutlinedInput-root": {
                        ...fieldStyles["& .MuiOutlinedInput-root"],
                        minHeight: "130px",
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
                    {isSubmitting ? "Sending…" : "Send enquiry"}
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
    </>
  );
}
