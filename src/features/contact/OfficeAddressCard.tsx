"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BRAND } from "@/lib/brand";

export function OfficeAddressCard() {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: "background.default",
        border: 1,
        borderColor: "divider",
      }}
    >
      <Typography variant="overline" color="text.secondary">
        Headquarters
      </Typography>
      <Typography variant="h6" sx={{ mt: 0.5 }}>
        {BRAND.name} HQ
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {BRAND.hq}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1.5, fontWeight: 600 }}>
        <Box
          component="a"
          href={`tel:${BRAND.phoneDigits}`}
          sx={{
            color: "primary.main",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {BRAND.phone}
        </Box>
      </Typography>
      <Typography variant="body2">
        <Box
          component="a"
          href={`mailto:${BRAND.emails.hello}`}
          sx={{
            color: "primary.main",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {BRAND.emails.hello}
        </Box>
      </Typography>
    </Box>
  );
}
