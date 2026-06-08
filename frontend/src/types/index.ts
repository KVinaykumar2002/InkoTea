export type FranchiseModelKey = "kiosk" | "cafe";

export interface FranchiseModel {
  key: FranchiseModelKey;
  name: string;
  tagline: string;
  description: string;
  investment: string;
  investmentRange: [number, number];
  spaceSqFt: string;
  setupTime: string;
  staff: string;
  format: string;
  roiSpeed: string;
  target: string;
  /** Daily gross-sales range pulled from the brand brochures. */
  dailySales?: string;
  /** Monthly revenue range (Cafe format only — per Social Cafe brochure). */
  monthlyRevenue?: string;
  /** Monthly profit range (illustrative, location-dependent). */
  monthlyProfit?: string;
  highlights: string[];
  idealLocations: string[];
  whoFor: string[];
  accentColor: "primary" | "success";
}

/**
 * 3-bucket investment breakdown used by the Kiosk model in the brochure
 * (Equipment / Raw Materials / Branding). Kept generic so it can be reused
 * for any future format that needs a similar bucketed view.
 */
export interface InvestmentBucket {
  key: string;
  label: string;
  detail: string;
  icon: string;
}

/**
 * Two-column "INKOTEA provides vs You provide" table from both brochures.
 * Used on the franchise page to set partner expectations up front.
 */
export interface ResponsibilitySplit {
  modelKey: FranchiseModelKey | "all";
  inkoteaProvides: string[];
  youProvide: string[];
}

export interface Outlet {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  type: FranchiseModelKey;
  image: string;
  mapsQuery: string;
  openingYear: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  priceRange: string;
  image: string;
  isBestSeller?: boolean;
}

export type MenuCategory =
  | "signature-tea"
  | "coffee"
  | "social-beverages"
  | "comfort-bites";

export interface MenuCategoryMeta {
  key: MenuCategory;
  label: string;
  shortLabel: string;
  description: string;
  priceRange: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  cover: string;
  body: string;
}

export type BlogCategory =
  | "tea-trends"
  | "franchise"
  | "cafe-culture"
  | "entrepreneurship"
  | "brand";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  audience: "franchise" | "customer";
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  city: string;
  quote: string;
  image: string;
  imageAlt: string;
  rating: number;
  isVideo?: boolean;
}

export interface LeadPayload {
  name: string;
  phone: string;
  city: string;
  email?: string;
  investmentRange?: string;
  model?: FranchiseModelKey | "both";
  message?: string;
  source: "footer" | "franchise" | "contact" | "investor" | "popup";
}

export interface LeadResponse {
  ok: boolean;
  id: string;
  message: string;
}
