"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { InfiniteMarquee } from "@/components/common/InfiniteMarquee";
import { PRESS_LOGOS } from "@/data/competitors";

const FEATURED_ITEMS = PRESS_LOGOS.map((logo) => ({ label: logo }));

/**
 * "As Featured In" credibility strip — continuous right-to-left marquee.
 */
export function PressLogosStrip() {
  return (
    <Box
      component="section"
      aria-label="As featured in"
      sx={{
        pt: { xs: 5, md: 6 },
        pb: { xs: 4, md: 5 },
        bgcolor: "background.default",
      }}
    >
      <Typography
        variant="overline"
        align="center"
        display="block"
        sx={{
          letterSpacing: "0.25em",
          color: "text.secondary",
          mb: { xs: 2.5, md: 3 },
          px: 2,
        }}
      >
        As featured in
      </Typography>
      <InfiniteMarquee
        items={FEATURED_ITEMS}
        direction="left"
        durationSeconds={38}
        variant="accent"
        edgeless
      />
    </Box>
  );
}
