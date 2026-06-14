"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { BRAND } from "@/lib/brand";
import { brandColors } from "@/theme/palette";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { OfficeMap } from "./OfficeMap";
import { contactOutlinedButtonSx } from "./contactStyles";

export function ContactLocationSection() {
  return (
    <Box sx={{ bgcolor: brandColors.creamDark, py: { xs: 6, md: 8 } }}>
      <Box
        sx={{
          maxWidth: "lg",
          mx: "auto",
          px: { xs: 2, sm: 3 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "0.9fr 1.1fr" },
          gap: { xs: 4, md: 5 },
          alignItems: "center",
        }}
      >
        <ScrollReveal>
          <Stack spacing={2.5} sx={{ maxWidth: 420 }}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <LocationOnIcon sx={{ color: "primary.main" }} />
              <Typography variant="h4">Our Location</Typography>
            </Stack>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.75 }}>
              Visit our headquarters in Hyderabad or open directions in Google Maps
              for the fastest route to {BRAND.name} HQ.
            </Typography>
            <Button
              component="a"
              href={BRAND.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              sx={{ ...contactOutlinedButtonSx, alignSelf: "flex-start" }}
            >
              Get Directions
            </Button>
          </Stack>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <Box
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: 1,
              borderColor: "divider",
              boxShadow: "0 14px 40px -16px rgba(0,0,0,0.14)",
              minHeight: { xs: 280, md: 360 },
            }}
          >
            <OfficeMap />
          </Box>
        </ScrollReveal>
      </Box>
    </Box>
  );
}
