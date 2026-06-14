"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { brandColors } from "@/theme/palette";
import { contactPrimaryButtonSx } from "./contactStyles";

export function ContactBottomCta() {
  return (
    <Box
      sx={{
        bgcolor: brandColors.teaBrownDark,
        color: "#fff",
        py: { xs: 4, md: 5 },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
        sx={{ maxWidth: "lg", mx: "auto", px: { xs: 2, sm: 3 } }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "inherit",
            maxWidth: 560,
            lineHeight: 1.35,
          }}
        >
          Have a franchise idea in mind? Let&apos;s build your INKOTEA chapter
          together.
        </Typography>
        <Button
          component={Link}
          href="#contact-form"
          variant="contained"
          color="secondary"
          endIcon={<ArrowForwardIcon />}
          sx={{
            ...contactPrimaryButtonSx,
            bgcolor: brandColors.amberGold,
            color: brandColors.charcoal,
            flexShrink: 0,
            "&:hover": { bgcolor: brandColors.amberGoldLight },
          }}
        >
          Start a Conversation
        </Button>
      </Stack>
    </Box>
  );
}
