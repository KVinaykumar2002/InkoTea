"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import { FormikProvider } from "formik";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import SendIcon from "@mui/icons-material/Send";
import VerifiedIcon from "@mui/icons-material/Verified";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";

import { FormikTextField } from "@/components/forms/FormikTextField";
import { FormikPhoneField } from "@/components/forms/FormikPhoneField";
import { FormikSelect } from "@/components/forms/FormikSelect";
import { FormSuccessState } from "@/components/forms/FormSuccessState";
import {
  buildDarkSurfaceFieldSx,
  darkSurfaceSubmitSx,
} from "@/components/forms/darkSurfaceFieldSx";

import { useFranchiseForm } from "@/hooks/useFranchiseForm";

import {
  INVESTMENT_RANGE_OPTIONS,
  MODEL_OPTIONS,
} from "@/features/franchise/validationSchema";

import { BRAND } from "@/lib/brand";

const TRUST_POINTS = [
  {
    icon: VerifiedIcon,
    title: "No spam, ever",
    text: "Your details stay with our franchise team only.",
  },
  {
    icon: CallIcon,
    title: "Reply within 24 hours",
    text: "A franchise specialist will call you with the full kit.",
  },
  {
    icon: EmailIcon,
    title: "Detailed proposal",
    text: "Investment plan, location guidance, and ROI projections.",
  },
];

export function FranchiseForm() {
  const { formik, snackbar, closeSnackbar, submittedName, resetSubmitted } =
    useFranchiseForm();

  const CARD_SURFACE = "#4A240F";
  const fieldStyles = buildDarkSurfaceFieldSx(CARD_SURFACE);
  const isSubmitting = formik.isSubmitting;

  return (
    <Section bgcolor="background.default" id="apply">
      <SectionHeading
        eyebrow="Apply Now"
        title="Tell us about your INKOTEA dream"
        description="Fill the form — our team will personally walk you through investment, location and rollout."
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.6fr" },
          gap: { xs: 4, md: 6 },
          alignItems: "stretch",
        }}
      >
        <ScrollReveal>
          <Stack
            spacing={3}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: "28px",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              height: "100%",
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "secondary.light", letterSpacing: "0.18em" }}
            >
              Why apply with us
            </Typography>

            <Typography
              variant="h3"
              sx={{ color: "inherit", ...fontDisplayItalicSx, lineHeight: 1.2 }}
            >
              The fastest way into India&apos;s chai retail boom.
            </Typography>

            <Stack spacing={2.5} sx={{ mt: 2 }}>
              {TRUST_POINTS.map(({ icon: Icon, title, text }) => (
                <Stack key={title} direction="row" spacing={2}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: "14px",
                      bgcolor: "rgba(255,255,255,0.12)",
                      color: "secondary.light",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>

                  <Stack spacing={0.5}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "inherit", fontWeight: 700 }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.78)" }}
                    >
                      {text}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>

            <Box
              sx={{
                mt: "auto",
                pt: 4,
                borderTop: "1px solid rgba(255,255,255,0.16)",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "secondary.light",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Prefer to talk?
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "inherit", mt: 1, fontWeight: 600 }}
              >
                Call us on{" "}
                <Box
                  component="a"
                  href={`tel:${BRAND.phoneDigits}`}
                  sx={{
                    color: "secondary.light",
                    textDecoration: "none",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {BRAND.phone}
                </Box>
              </Typography>
            </Box>
          </Stack>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
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
                title={`Thanks, ${submittedName.split(" ")[0]}!`}
                description="A franchise specialist will reach out within 24 hours with your full investment kit, location guidance and ROI projections."
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
                          label="Full name"
                          required
                          autoComplete="name"
                          sx={fieldStyles}
                        />
                        <FormikPhoneField
                          name="phone"
                          label="Mobile"
                          required
                          sx={fieldStyles}
                        />
                      </Stack>

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                      >
                        <FormikTextField
                          name="email"
                          label="Email"
                          type="email"
                          required
                          autoComplete="email"
                          sx={fieldStyles}
                        />
                        <FormikTextField
                          name="city"
                          label="City of interest"
                          required
                          autoComplete="address-level2"
                          sx={fieldStyles}
                        />
                      </Stack>

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                      >
                        <FormikSelect
                          name="investmentRange"
                          label="Investment range"
                          placeholder="Select range"
                          options={INVESTMENT_RANGE_OPTIONS}
                          required
                          sx={fieldStyles}
                        />
                        <FormikSelect
                          name="model"
                          label="Preferred model"
                          placeholder="Select model"
                          options={MODEL_OPTIONS}
                          required
                          sx={fieldStyles}
                        />
                      </Stack>

                      <FormikTextField
                        name="message"
                        label="Your message"
                        multiline
                        minRows={3}
                        required
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
                              aria-label="Submitting"
                            />
                          ) : (
                            <SendIcon />
                          )
                        }
                        sx={{ ...darkSurfaceSubmitSx, minWidth: "250px" }}
                      >
                        {isSubmitting
                          ? "Submitting…"
                          : "Submit application"}
                      </Button>

                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(255,255,255,0.55)", mt: 1 }}
                      >
                        By submitting, you agree to be contacted by
                        INKOTEA&apos;s franchise team. We never share your
                        details.
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </FormikProvider>
            )}
          </Box>
        </ScrollReveal>
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
    </Section>
  );
}
