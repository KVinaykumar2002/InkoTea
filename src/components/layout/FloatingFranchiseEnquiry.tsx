"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import { useState } from "react";
import { FormikProvider } from "formik";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
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
import StorefrontIcon from "@mui/icons-material/Storefront";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { motion, useReducedMotion } from "framer-motion";

import { FormikTextField } from "@/components/forms/FormikTextField";
import { FormikPhoneField } from "@/components/forms/FormikPhoneField";
import { FormSuccessState } from "@/components/forms/FormSuccessState";
import {
  buildDarkSurfaceFieldSx,
  darkSurfaceSubmitSx,
} from "@/components/forms/darkSurfaceFieldSx";
import { useFooterEnquiryForm } from "@/hooks/useFooterEnquiryForm";

/**
 * Floating "Enquire about franchise" FAB shown only on the Home page.
 * Anchors bottom-left so it never crowds the right-side WhatsApp FAB.
 * Tapping the pill opens a dialog with a compact 3-field enquiry form
 * (re-uses `useFooterEnquiryForm`), routing the lead to the franchise
 * pipeline without making the visitor leave the page.
 */

const CARD_SURFACE = "#3B1D0E";

export function FloatingFranchiseEnquiry() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const { formik, snackbar, closeSnackbar, submittedName, resetSubmitted } =
    useFooterEnquiryForm();
  const isSubmitting = formik.isSubmitting;
  const fieldStyles = buildDarkSurfaceFieldSx(CARD_SURFACE);

  const handleClose = () => {
    setOpen(false);
    resetSubmitted();
  };

  return (
    <>
      <Box
        component={motion.div}
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
        sx={{
          position: "fixed",
          left: { xs: 16, md: 24 },
          bottom: { xs: 88, md: 24 },
          zIndex: 1200,
        }}
      >
        <Fab
          variant="extended"
          color="secondary"
          aria-label="Open franchise enquiry form"
          onClick={() => setOpen(true)}
          sx={{
            fontWeight: 700,
            textTransform: "none",
            px: { xs: 1.75, sm: 2.25 },
            maxWidth: { xs: "calc(100vw - 96px)", sm: "none" },
            boxShadow: "0 14px 36px -10px rgba(212,165,116,0.55)",
            "&:hover": {
              boxShadow: "0 18px 40px -8px rgba(212,165,116,0.7)",
            },
          }}
        >
          <StorefrontIcon sx={{ mr: { xs: 0.75, sm: 1 } }} fontSize="small" />
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Enquire about Franchise
          </Box>
          <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
            Franchise
          </Box>
        </Fab>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="franchise-enquiry-title"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              m: { xs: 1, sm: 2 },
              maxHeight: { xs: "calc(100% - 16px)", sm: "calc(100% - 48px)" },
              bgcolor: CARD_SURFACE,
              color: "#F5EFE5",
              overflow: "hidden",
            },
          },
        }}
      >
        <DialogTitle
          id="franchise-enquiry-title"
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
              Franchise Enquiry
            </Typography>
            <Typography variant="h5" sx={{ color: "inherit", ...fontDisplayItalicSx }}>
              Start your INKOTEA outlet
            </Typography>
          </Stack>
          <IconButton
            onClick={handleClose}
            aria-label="Close franchise enquiry dialog"
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
                    Tell us where you&apos;d like to open an outlet — we&apos;ll
                    share the investment kit, location guidance and a personal
                    walkthrough.
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

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Typography
            variant="caption"
            sx={{ color: "rgba(245,239,229,0.6)" }}
          >
            We respect your privacy and never share your details.
          </Typography>
        </DialogActions>
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
