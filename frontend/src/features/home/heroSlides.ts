import { BRAND_IMAGES } from "@/lib/brandImages";

export interface HeroSlide {
  image: string;
  /** CSS background-position for cover crop */
  position: string;
  alt: string;
}

/** Rotating hero backgrounds — left-weighted compositions for headline overlay. */
export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    image: BRAND_IMAGES.heroChaiScene,
    position: "70% center",
    alt: "Masala chai with INKOTEA wooden signage",
  },
  {
    image: BRAND_IMAGES.kioskNightCrowd,
    position: "center 40%",
    alt: "INKOTEA kiosk at night with customers",
  },
  {
    image: BRAND_IMAGES.cafeHeroSitSipSmile,
    position: "center 35%",
    alt: "INKOTEA Social Cafe storefront",
  },
  {
    image: BRAND_IMAGES.chaiPourNeon,
    position: "center center",
    alt: "Chai pour at an INKOTEA outlet",
  },
] as const;

export const HERO_CAROUSEL_INTERVAL_MS = 5500;
