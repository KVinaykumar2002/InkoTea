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
  highlights: string[];
  idealLocations: string[];
  whoFor: string[];
  accentColor: "primary" | "success";
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

export interface Competitor {
  name: string;
  position: string;
  pricing: string;
  experience: string;
  scalability: string;
  isUs?: boolean;
}

export interface InvestmentPackage {
  key: "standard" | "turnkey";
  name: string;
  subtitle: string;
  total: string;
  breakdown: { label: string; value: string }[];
  notIncluded: string[];
  bestFor: string;
  highlight?: boolean;
}

export interface LeadPayload {
  name: string;
  phone: string;
  city: string;
  email?: string;
  investmentRange?: string;
  model?: FranchiseModelKey | "both";
  message?: string;
  source: "footer" | "franchise" | "contact" | "investor";
}

export interface LeadResponse {
  ok: boolean;
  id: string;
  message: string;
}
