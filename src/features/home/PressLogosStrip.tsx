"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PRESS_LOGOS } from "@/data/competitors";

/**
 * "As Featured In" credibility strip. Uses placeholder typographic marks
 * (no real logos in demo). Replace with actual SVG logos when partnerships
 * confirm.
 */
export function PressLogosStrip() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 7 },
        bgcolor: "background.paper",
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          align="center"
          display="block"
          sx={{
            letterSpacing: "0.25em",
            color: "text.secondary",
            mb: 3,
          }}
        >
          As featured in
        </Typography>
        <Stack
          direction="row"
          spacing={{ xs: 3, md: 6 }}
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
        >
          {PRESS_LOGOS.map((logo) => (
            <Typography
              key={logo}
              variant="h6"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                color: "text.secondary",
                opacity: 0.55,
                fontSize: { xs: "1rem", md: "1.25rem" },
                transition: "opacity 0.2s ease, color 0.2s ease",
                "&:hover": { opacity: 1, color: "primary.main" },
              }}
            >
              {logo}
            </Typography>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
