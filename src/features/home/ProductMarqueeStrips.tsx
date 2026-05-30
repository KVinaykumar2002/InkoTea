"use client";

import Box from "@mui/material/Box";
import { InfiniteMarquee, type MarqueeItem } from "@/components/common/InfiniteMarquee";
import { MENU_CATEGORIES } from "@/data/menu";
import { BRAND } from "@/lib/brand";

const PRODUCT_ROW: MarqueeItem[] = MENU_CATEGORIES.map((c) => ({
  label: c.label,
  detail: c.priceRange,
}));

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

/**
 * Dual infinite-scroll strips (furniture-site pattern): product categories
 * scroll one way, brand moments scroll the other.
 */
export function ProductMarqueeStrips() {
  return (
    <Box component="section" aria-label="Product highlights">
      <InfiniteMarquee items={PRODUCT_ROW} direction="left" durationSeconds={36} />
      <InfiniteMarquee
        items={BRAND_ROW}
        direction="right"
        durationSeconds={42}
        variant="accent"
      />
    </Box>
  );
}
