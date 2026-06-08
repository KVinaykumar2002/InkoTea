/**
 * Centralized brand constants used across the app.
 * Update here to propagate brand-wide changes.
 */
export const BRAND = {
  name: "INKOTEA",
  tagline: "The Feeling of One More",
  shortDescription:
    "India's most accessible beverage brand — bridging chai culture with modern cafe experiences.",
  founded: 2021,
  hq: "Hyderabad, Telangana",
  phone: "+91 8919 566855",
  phoneDigits: "918919566855",
  phoneSecondary: "+91 84640 20418",
  phoneSecondaryDigits: "918464020418",
  emails: {
    franchise: "franchise@inkotea.com",
    investor: "investor@inkotea.com",
    hello: "hello@inkotea.com",
  },
  founder: {
    name: "Srinivas P. Mahendra",
    role: "Founder & CEO",
  },
  coFounder: {
    name: "Naresh P. Mahendra",
    role: "Co-Founder",
  },
  metrics: {
    outlets: 40,
    franchisePartners: 32,
    cupsServedDaily: 10000,
    statesServed: 2,
  },
  socials: {
    instagram: "https://instagram.com/inkotea",
    facebook: "https://facebook.com/inkotea",
    youtube: "https://youtube.com/@inkotea",
    linkedin: "https://linkedin.com/company/inkotea",
  },
  whatsappLink: "https://wa.me/918464020418",
  siteUrl: "https://inkotea.com",
  mapsUrl: "https://maps.app.goo.gl/33sznnwAdJXPDfxU8",
  /** iframe embed for {@link mapsUrl} — InkoTea Enterprises Pvt Ltd, Hyderabad */
  mapsEmbedSrc:
    "https://www.google.com/maps?q=17.4414196,78.4976585&z=15&output=embed",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Franchise", href: "/franchise" },
  { label: "Why Us", href: "/why-inkotea" },
  { label: "Our Menu", href: "/products" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Outlets", href: "/outlets" },
  { label: "Investor", href: "/investor" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Top-level desktop nav: the 6 highest-intent destinations. The remaining
 * lower-traffic links live under the "More" dropdown ({@link NAV_MORE}) so
 * the bar stays breathable on 1280–1440px laptops.
 */
export const NAV_PRIMARY = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Franchise", href: "/franchise" },
  { label: "Our Menu", href: "/products" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Outlets", href: "/outlets" },
  { label: "Contact", href: "/contact" },
] as const;

export const NAV_MORE = [
  { label: "Why Us", href: "/why-inkotea" },
  { label: "Investor", href: "/investor" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
] as const;

export const FOOTER_QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Franchise", href: "/franchise" },
  { label: "Products", href: "/products" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Outlets", href: "/outlets" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const MODEL_LINKS = [
  { label: "Kiosk Model", href: "/franchise#kiosk" },
  { label: "Social Cafe Model", href: "/franchise#cafe" },
  { label: "", href: "" },
] as const;
