"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import { useCallback, useEffect, useRef, useState } from "react";
import { FormikProvider } from "formik";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

import { FormikTextField } from "@/components/forms/FormikTextField";
import { FormikPhoneField } from "@/components/forms/FormikPhoneField";
import { FormSuccessState } from "@/components/forms/FormSuccessState";
import {
  buildDarkSurfaceFieldSx,
  darkSurfaceSubmitSx,
} from "@/components/forms/darkSurfaceFieldSx";
import { useFooterEnquiryForm } from "@/hooks/useFooterEnquiryForm";

const CARD_SURFACE = "#3B1D0E";
const AUTO_CLOSE_MS = 3000;

/**
 * Welcome enquiry dialog — opens automatically for 3 seconds on full page
 * reload only (not on client-side navigation). Visitors can close
 * early or submit before it dismisses. Auto-close pauses once the visitor
 * focuses a field or enters data. Leads are tagged `source: "popup"`.
 */
function formHasInput(values: {
  name: string;
  phone: string;
  city: string;
  message: string;
}) {
  return [values.name, values.phone, values.city, values.message].some(
    (v) => v.trim().length > 0,
  );
}

export function WelcomeEnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [autoClosePaused, setAutoClosePaused] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { formik, snackbar, closeSnackbar, submittedName, resetSubmitted } =
    useFooterEnquiryForm({ source: "popup" });
  const isSubmitting = formik.isSubmitting;
  const fieldStyles = buildDarkSurfaceFieldSx(CARD_SURFACE);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const pauseAutoClose = useCallback(() => {
    clearCloseTimer();
    setAutoClosePaused(true);
  }, [clearCloseTimer]);

  // Mount-only: runs on full reload; skipped during in-app page changes.
  useEffect(() => {
    setOpen(true);
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, AUTO_CLOSE_MS);
    return clearCloseTimer;
  }, [clearCloseTimer]);

  useEffect(() => {
    if (formHasInput(formik.values)) {
      pauseAutoClose();
    }
  }, [formik.values, pauseAutoClose]);

  useEffect(() => {
    if (submittedName || isSubmitting) {
      pauseAutoClose();
    }
  }, [submittedName, isSubmitting, pauseAutoClose]);

  const handleClose = () => {
    clearCloseTimer();
    setOpen(false);
    resetSubmitted();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="welcome-enquiry-title"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              bgcolor: CARD_SURFACE,
              color: "#F5EFE5",
              overflow: "hidden",
            },
          },
        }}
      >
        <DialogTitle
          id="welcome-enquiry-title"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
            pr: 1.5,
          }}
        >
          <Stack spacing={0.5}>
            <Typography
              variant="overline"
              sx={{ color: "secondary.light", letterSpacing: "0.18em" }}
            >
              Welcome to INKOTEA
            </Typography>
            <Typography variant="h5" sx={{ color: "inherit", ...fontDisplayItalicSx }}>
              Start your franchise journey
            </Typography>
          </Stack>
          <IconButton
            onClick={handleClose}
            aria-label="Close welcome enquiry dialog"
            sx={{ color: "#F5EFE5", mt: 0.5 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 0 }}>
          {submittedName ? (
            <FormSuccessState
              name={submittedName}
              description="Our franchise team will reach out within 24 hours with the full investment kit."
              resetLabel="Submit another enquiry"
              onReset={resetSubmitted}
            />
          ) : (
            <FormikProvider value={formik}>
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                onFocusCapture={pauseAutoClose}
                noValidate
                aria-busy={isSubmitting}
              >
                <Stack
                  spacing={2}
                  sx={{
                    transition: "opacity 0.2s ease",
                    opacity: isSubmitting ? 0.7 : 1,
                    pointerEvents: isSubmitting ? "none" : "auto",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(245,239,229,0.78)" }}
                  >
                    Share your details and we&apos;ll send the investment kit,
                    location guidance and a personal walkthrough.
                  </Typography>

                  <FormikTextField
                    name="name"
                    label="Your name"
                    required
                    fullWidth
                    autoComplete="name"
                    sx={fieldStyles}
                  />
                  <FormikPhoneField
                    name="phone"
                    label="Phone"
                    required
                    fullWidth
                    sx={fieldStyles}
                  />
                  <FormikTextField
                    name="city"
                    label="City of interest"
                    required
                    fullWidth
                    autoComplete="address-level2"
                    sx={fieldStyles}
                  />
                  <FormikTextField
                    name="message"
                    label="Message (optional)"
                    multiline
                    minRows={2}
                    fullWidth
                    sx={fieldStyles}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    fullWidth
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
                    sx={darkSurfaceSubmitSx}
                  >
                    {isSubmitting ? "Sending…" : "Send enquiry"}
                  </Button>
                </Stack>
              </Box>
            </FormikProvider>
          )}
        </DialogContent>

        {!submittedName && (
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Typography variant="caption" sx={{ color: "rgba(245,239,229,0.6)" }}>
              {autoClosePaused
                ? "Take your time — close when you're done."
                : "Closes automatically in a few seconds if you don't start filling in."}
            </Typography>
          </DialogActions>
        )}
      </Dialog>

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
