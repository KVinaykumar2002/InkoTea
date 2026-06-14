export type LeadStatus = "new" | "contacted" | "qualified" | "closed";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
}

export interface LeadRow {
  id: string;
  name: string;
  phone: string;
  city: string;
  email: string | null;
  investment_range: string | null;
  model: string | null;
  message: string | null;
  source: string;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

export interface OutletRow {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  type: string;
  image: string;
  maps_query: string;
  opening_year: number;
}

export interface MenuCategoryRow {
  key: string;
  label: string;
  short_label: string;
  description: string;
  price_range: string;
}

export interface MenuItemRow {
  id: string;
  name: string;
  category: string;
  description: string;
  price_range: string;
  image: string;
  is_best_seller: number;
}

export interface BlogPostRow {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  published_at: string;
  reading_minutes: number;
  cover: string;
  body: string;
}

export interface FaqRow {
  id: string;
  question: string;
  answer: string;
  audience: string;
}

export interface TestimonialRow {
  id: string;
  name: string;
  initials: string;
  city: string;
  quote: string;
  image: string;
  image_alt: string;
  rating: number;
  is_video: number;
  video_url: string;
}
