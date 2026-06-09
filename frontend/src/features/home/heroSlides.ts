import { DEFAULT_HERO_CONTENT, type HeroSlide } from "@shared/pageContent";

export type { HeroSlide };

/** Rotating hero backgrounds — left-weighted compositions for headline overlay. */
export const HERO_SLIDES: readonly HeroSlide[] = DEFAULT_HERO_CONTENT.slides;

export const HERO_CAROUSEL_INTERVAL_MS = 5500;
