/**
 * Centralised registry of brand-owned imagery shipped with the site.
 *
 * All assets live under `/public/brand` and are sourced from the official
 * INKOTEA Kiosk Model and Social Café brochures. Components should import
 * paths from this file (instead of hard-coding strings) so future swaps
 * stay a single-line change.
 */
export const BRAND_IMAGES = {
  /**
   * Home-page hero photo — masala chai glass on a wooden plank with
   * "INKOTEA – One More Cup" wooden signage and warm bokeh in the
   * background. The composition is intentionally dark on the left so
   * the headline + CTAs sit cleanly over the negative space.
   */
  heroChaiScene: "/brand/hero-chai-scene.jpeg",

  // ------- Kiosk Model assets -------
  /** Real INKOTEA kiosk at night with a crowd around it. Hero-quality. */
  kioskNightCrowd: "/brand/kiosk-night-crowd.jpeg",
  /** Dramatic chai pour against a green-neon backdrop. */
  chaiPourNeon: "/brand/chai-pour-neon.jpeg",
  /** Modern green kiosk in daylight with customers ordering. */
  kioskDaylight: "/brand/kiosk-daylight.jpeg",
  /** Indoor neon kiosk court — IT-park / food-court vibe. */
  kioskFoodcourt: "/brand/kiosk-foodcourt.jpeg",
  /** Outdoor open-plot kiosk with green/yellow neon. */
  kioskModernYellow: "/brand/kiosk-modern-yellow.jpeg",
  /** Standalone INKOTEA kiosk on a city street at night. */
  kioskStandaloneNight: "/brand/kiosk-standalone-night.jpeg",
  /** Wide banner — customer being served at a kiosk. */
  kioskCustomerBanner: "/brand/kiosk-customer-banner.jpeg",

  // ------- Social Café assets -------
  /** "INKOTEA SOCIAL CAFE — Sit. Sip. Smile." daytime storefront. */
  cafeHeroSitSipSmile: "/brand/cafe-hero-sitsipsmile.jpeg",
  /** Couple chatting over coffee inside a cozy café — dine-in experience. */
  cafeCoupleCoffee: "/brand/cafe-couple-coffee.jpeg",
  /** "INKOTEA SOCIAL CAFE" neon storefront at dusk. */
  cafeStorefrontNight: "/brand/cafe-storefront-night.jpeg",
  /** Menu spread — beverages, bakes and bites on a wooden table. */
  cafeMenuSpread: "/brand/cafe-menu-spread.jpeg",
  /** Busy café interior — espresso machine, hanging lights, customers. */
  cafeInteriorBusy: "/brand/cafe-interior-busy.jpeg",
  /** Group of friends laughing around a café table (Indian context). */
  cafeFriendsChat: "/brand/cafe-friends-chat.jpeg",
  /** Café storefront with outdoor cane-chair seating. */
  cafeOutdoorSeating: "/brand/cafe-outdoor-seating.jpeg",

  // ------- Franchise-page hero assets -------
  /**
   * Cinematic INKOTEA Social Cafe storefront at dusk — warm interior
   * lighting, full tables visible through the glass, "Sit. Sip. Smile."
   * tagline lit up. Used for the Social Café card in the franchise hero
   * and model comparison.
   */
  franchiseCafeStorefront: "/brand/franchise-cafe-storefront.jpeg",
  /**
   * INKOTEA neon-green kiosk at dusk surrounded by a real Indian street
   * crowd. High-energy hero shot for the Kiosk card on the franchise page.
   */
  franchiseKioskNight: "/brand/franchise-kiosk-night.jpeg",

  /**
   * Cinematic wide-aspect (≈ 2.5:1) shot of an INKOTEA kiosk with happy
   * customers gathered around — the menu board lit in green, the founder
   * sipping with a guest. Designed as a single full-bleed footer
   * background that captures the brand's social-café energy in one frame.
   */
  footerKioskScene: "/brand/footer-kiosk-scene.jpeg",
} as const;

export type BrandImageKey = keyof typeof BRAND_IMAGES;

/* -------------------------------------------------------------------- */
/*  Menu imagery                                                          */
/* -------------------------------------------------------------------- */

/**
 * Build a stable Unsplash CDN URL.
 *
 * Cropped 4:3 at 800×600 server-side (matches `MenuItemCard`'s aspect),
 * `auto=format` lets Unsplash serve WebP/AVIF when supported, `q=80`
 * keeps weight low while staying crisp on retina.
 */
function unsplash(photoId: string): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&h=600&q=80`;
}

/**
 * Per-menu-item Unsplash photograph.
 *
 * Each id is hand-picked from Unsplash's free library to visually match the
 * item (masala chai glass, frothy filter coffee, golden samosas, etc.).
 * If a new menu item is added before this map is updated, `pickMenuImage`
 * falls back to a per-category pool.
 *
 * To swap a shot, edit the photo id below and the change flows through
 * automatically — `pickMenuImage` reads this map on every call.
 */
const MENU_ITEM_IMAGES: Record<string, string> = {
  // Signature Tea
  "desi-dum": unsplash("1612846213933-916a1f56d859"),       // teapot pouring into glass
  masala: unsplash("1609670438772-9cf3afc5052b"),            // masala chai in glass
  elaichi: unsplash("1622824497447-b284a5493027"),           // green cardamom seeds in bowl
  kashmiri: unsplash("1630748662359-40a2105640c7"),          // amber tea in patterned cup
  ginger: unsplash("1633069683078-b180ba2afd89"),            // hands cradling chai on wood

  // Coffee & Health
  "filter-coffee": unsplash("1758387941825-a6ecaec9c14d"),   // brass South-Indian filter
  cappuccino: unsplash("1572442388796-11668a67e53d"),        // latte foam in white cup
  latte: unsplash("1517256064527-09c73fc73e38"),             // espresso + crema close-up
  "ragi-java": unsplash("1583836632332-53825ce55a03"),       // earthy mug on light table
  boost: unsplash("1586714932157-5853aed2e64b"),             // hands around hot malted mug

  // Social Beverages
  "oreo-shake": unsplash("1572490122747-3968b75cc699"),      // chocolate cookie frappe
  "kitkat-shake": unsplash("1553787499-6f9133860278"),       // cream-filled shake glass
  mojito: unsplash("1546171753-97d7676e4602"),               // lime mojito on wood board
  "iced-tea": unsplash("1556679343-c7306c1976bc"),           // iced tea in tall glass

  // Comfort Bites
  osmania: unsplash("1544787219-7f47ccb76574"),              // mug + biscuits
  "maggi-bowl": unsplash("1612929633738-8fe44f7ec841"),      // noodle bowl, dark plate
  samosa: unsplash("1601050690597-df0568f70950"),            // golden samosas on plate
  sandwich: unsplash("1528736235302-52922df5c122"),          // grilled cheese sandwich
  fries: unsplash("1630431341973-02e1b662ec35"),             // potato fries on white plate
  "chocolate-cake": unsplash("1517427294546-5aa121f68e8a"),  // chocolate cake slice + fork
};

/**
 * Per-category fallback pool — used by `pickMenuImage` when an unknown
 * item id is passed in (e.g. a newly-added item that isn't in
 * `MENU_ITEM_IMAGES` yet). Deterministically hashed so a given id always
 * resolves to the same image across renders.
 */
const MENU_CATEGORY_IMAGES: Record<string, readonly string[]> = {
  "signature-tea": [
    unsplash("1612846213933-916a1f56d859"),
    unsplash("1633069683078-b180ba2afd89"),
  ],
  coffee: [
    unsplash("1572442388796-11668a67e53d"),
    unsplash("1758387941825-a6ecaec9c14d"),
  ],
  "social-beverages": [
    unsplash("1556679343-c7306c1976bc"),
    unsplash("1572490122747-3968b75cc699"),
  ],
  "comfort-bites": [
    unsplash("1601050690597-df0568f70950"),
    unsplash("1528736235302-52922df5c122"),
  ],
};

/**
 * Pick the cover image for a menu item.
 *
 * Resolution order:
 *   1. Hand-picked per-item photo in `MENU_ITEM_IMAGES`.
 *   2. Deterministic pick from the per-category pool (hashed by id).
 *   3. A generic chai shot if the category itself is unknown.
 *
 * The hash makes the result stable across renders, so the same menu item
 * always shows the same image (no flicker, no SSR/CSR mismatch).
 */
export function pickMenuImage(category: string, id: string): string {
  const direct = MENU_ITEM_IMAGES[id];
  if (direct) return direct;

  const pool = MENU_CATEGORY_IMAGES[category];
  if (!pool || pool.length === 0) {
    return unsplash("1612846213933-916a1f56d859");
  }

  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return pool[hash % pool.length];
}
