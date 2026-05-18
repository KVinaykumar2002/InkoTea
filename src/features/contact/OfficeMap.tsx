"use client";

import Box from "@mui/material/Box";

/**
 * Embedded Google Maps preview centered on Hyderabad. Uses an iframe so we
 * avoid needing a Google Maps API key for the demo.
 */
export function OfficeMap() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 280, md: 400 },
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 14px 40px -16px rgba(0,0,0,0.18)",
      }}
    >
      <Box
        component="iframe"
        title="INKOTEA HQ — Miyapur, Hyderabad"
        src="https://www.google.com/maps?q=INKOTEA+Miyapur+Hyderabad+Telangana+India&output=embed"
        sx={{ border: 0, width: "100%", height: "100%" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Box>
  );
}
