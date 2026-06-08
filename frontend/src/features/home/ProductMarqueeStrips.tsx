"use client";

import Box from "@mui/material/Box";
import { InfiniteMarquee, type MarqueeItem } from "@/components/common/InfiniteMarquee";
import { useMenu } from "@/hooks/useApiContent";
import { BRAND } from "@/lib/brand";

const BRAND_ROW: MarqueeItem[] = [
  { label: BRAND.tagline },
  { label: "Masala Chai" },
  { label: "Filter Coffee" },
  { label: "Social Cafe" },
  { label: "Kiosk Model" },
  { label: "Comfort Bites" },
  { label: "One More Cup" },
  { label: "Sit. Sip. Smile." },
];

export function ProductMarqueeStrips() {
  const { data } = useMenu();
  const productRow: MarqueeItem[] =
    data?.categories.map((c) => ({
      label: c.label,
      detail: c.priceRange,
    })) ?? [];

  if (!productRow.length) return null;

  return (
    <Box component="section" aria-label="Product highlights">
      <InfiniteMarquee items={productRow} direction="left" durationSeconds={28} edgeless />
      <InfiniteMarquee
        items={BRAND_ROW}
        direction="right"
        durationSeconds={32}
        variant="accent"
        edgeless
      />
    </Box>
  );
}
