"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

interface Props {
  /** First name (or full name) of the person who just submitted. */
  name?: string;
  /** Optional headline override. */
  title?: string;
  /** Optional body copy override. */
  description?: string;
  /** Label for the secondary action that resets the form. */
  resetLabel?: string;
  /** Reset handler — typically clears the inline success flag in the hook. */
  onReset: () => void;
  /** Use dark text on white popup cards (default is cream-on-tea-brown). */
  lightSurface?: boolean;
}

/**
 * Inline confirmation that replaces a form's body after a successful
 * submission. Pairs with the transient Snackbar so users get a clear,
 * persistent acknowledgement on the card itself — much friendlier than
 * staring at a still-filled form after sending.
 */
export function FormSuccessState({
  name,
  title,
  description,
  resetLabel = "Send another",
  onReset,
  lightSurface = false,
}: Props) {
  const displayTitle =
    title ??
    (name ? `Thanks, ${name.split(" ")[0]}!` : "Thanks for reaching out!");
  const displayDescription =
    description ??
    "Our team will reach out within 24 hours with the next steps.";

  return (
    <Stack
      spacing={2.5}
      alignItems="center"
      sx={{
        py: { xs: 4, md: 5 },
        textAlign: "center",
      }}
      role="status"
      aria-live="polite"
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          bgcolor: "rgba(216,165,106,0.18)",
          color: "#D8A56A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckCircleRoundedIcon sx={{ fontSize: 36 }} />
      </Box>

      <Stack spacing={1} alignItems="center" sx={{ maxWidth: 380 }}>
        <Typography
          variant="h5"
          sx={{
            color: lightSurface ? "text.primary" : "#F5EFE5",
            fontWeight: 700,
            lineHeight: 1.25,
          }}
        >
          {displayTitle}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: lightSurface ? "text.secondary" : "rgba(245,239,229,0.75)",
            lineHeight: 1.55,
          }}
        >
          {displayDescription}
        </Typography>
      </Stack>

      <Button
        onClick={onReset}
        variant="text"
        sx={{
          color: lightSurface ? "primary.main" : "#D8A56A",
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            color: lightSurface ? "primary.dark" : "#E2B37C",
            bgcolor: "transparent",
          },
        }}
      >
        {resetLabel}
      </Button>
    </Stack>
  );
}
