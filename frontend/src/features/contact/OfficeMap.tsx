"use client";

import Box from "@mui/material/Box";
import { BRAND } from "@/lib/brand";

/**
 * Embedded Google Maps preview for HQ. Uses an iframe so we avoid needing a
 * Google Maps API key; clicking opens {@link BRAND.mapsUrl} in a new tab.
 */
export function OfficeMap() {
  return (
    <Box
      component="a"
      href={BRAND.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open INKOTEA HQ in Google Maps"
      sx={{
        position: "relative",
        display: "block",
        width: "100%",
        height: "100%",
        minHeight: { xs: 280, md: 360 },
        borderRadius: 3,
        overflow: "hidden",
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
  );
}
