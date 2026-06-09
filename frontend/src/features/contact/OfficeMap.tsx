"use client";

import Box from "@mui/material/Box";
import { DEFAULT_CONTACT_CONTENT } from "@shared/pageContent";
import { usePageContent } from "@/hooks/useApiContent";

/**
 * Embedded Google Maps preview for HQ. Uses an iframe so we avoid needing a
 * Google Maps API key; clicking opens the configured maps URL in a new tab.
 */
export function OfficeMap() {
  const { content } = usePageContent("contact", DEFAULT_CONTACT_CONTENT);

  return (
    <Box
      component="a"
      href={content.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open INKOTEA HQ in Google Maps"
      sx={{
        position: "relative",
        display: "block",
        width: "100%",
        height: { xs: 280, md: 400 },
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 14px 40px -16px rgba(0,0,0,0.18)",
        textDecoration: "none",
      }}
    >
      <Box
        component="iframe"
        title="INKOTEA HQ — InkoTea Enterprises Pvt Ltd, Hyderabad"
        src={content.mapsEmbedSrc}
        sx={{ border: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Box>
  );
}
