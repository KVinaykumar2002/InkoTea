"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BRAND } from "@/lib/brand";

const phoneLinkSx = {
  color: "primary.main",
  textDecoration: "none",
  fontWeight: 600,
  "&:hover": { textDecoration: "underline" },
} as const;

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
      <Stack spacing={0.5} sx={{ mt: 1.5 }}>
        <Typography variant="body2">
          <Box component="a" href={`tel:${BRAND.phoneDigits}`} sx={phoneLinkSx}>
            {BRAND.phone}
          </Box>
        </Typography>
        <Typography variant="body2">
          <Box
            component="a"
            href={`tel:${BRAND.phoneSecondaryDigits}`}
            sx={phoneLinkSx}
          >
            {BRAND.phoneSecondary}
          </Box>
        </Typography>
      </Stack>
      <Typography variant="body2" sx={{ mt: 1 }}>
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
