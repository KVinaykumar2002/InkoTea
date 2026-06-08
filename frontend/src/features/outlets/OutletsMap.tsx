"use client";

import { fontDisplayItalicSx } from "@/theme/fonts";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { BRAND } from "@/lib/brand";

export function OutletsMap() {
  return (
    <Section bgcolor="background.paper" pt={{ xs: 4, md: 5 }} pb={{ xs: 4, md: 5 }}>
      <SectionHeading
        eyebrow="Coverage Map"
        title="Live across Telangana & Andhra Pradesh"
        description="A bird's-eye view of where INKOTEA outlets currently operate."
      />
      <Box
        component="a"
        href={BRAND.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open INKOTEA HQ in Google Maps"
        sx={{
          display: "block",
          width: "100%",
          height: { xs: 360, md: 480 },
          borderRadius: 3,
          overflow: "hidden",
          border: (t) => `1px solid ${t.palette.divider}`,
          boxShadow: "0 14px 40px -16px rgba(0,0,0,0.18)",
          textDecoration: "none",
        }}
      >
        <Box
          component="iframe"
          title="INKOTEA HQ — InkoTea Enterprises Pvt Ltd, Hyderabad"
          src={BRAND.mapsEmbedSrc}
          sx={{ border: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ ...fontDisplayItalicSx }}
        >
          Tap the map to open INKOTEA headquarters in Google Maps for
          directions.
        </Typography>
      </Stack>
    </Section>
  );
}
