export type PageSlug = "hero" | "contact" | "franchise";

export interface HeroMetric {
  value: string;
  label: string;
  counter?: number;
  icon: "outlets" | "investment" | "sales";
}

export interface HeroSlide {
  image: string;
  position: string;
  alt: string;
}

export interface HeroPageContent {
  chip: string;
  titleLine1: string;
  titleLine2: string;
  subhead: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  metrics: HeroMetric[];
  slides: HeroSlide[];
}

export interface ContactChannel {
  label: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
  variant: "primary" | "success";
}

export interface ContactPageContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage: string;
  mapsUrl: string;
  mapsEmbedSrc: string;
  channels: ContactChannel[];
}

export interface FranchisePageContent {
  chip: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  backgroundImage: string;
  usps: string[];
}

export const DEFAULT_HERO_CONTENT: HeroPageContent = {
  chip: "The Feeling of One More",
  titleLine1: "India's Chai Culture.",
  titleLine2: "Reimagined for Today.",
  subhead:
    "From a ₹2.5L kiosk to a full Social Cafe — INKOTEA blends India's traditional chai culture with a modern cafe experience. 40+ outlets and growing across Telangana & AP.",
  primaryCtaLabel: "Explore Franchise",
  primaryCtaHref: "/franchise",
  secondaryCtaLabel: "Find Nearest Outlet",
  secondaryCtaHref: "/outlets",
  metrics: [
    { icon: "outlets", value: "40+", label: "Outlets", counter: 40 },
    { icon: "investment", value: "Low", label: "Investment" },
    { icon: "sales", value: "High", label: "Daily Sales" },
  ],
  slides: [
    {
      image: "/brand/hero-chai-scene.jpeg",
      position: "70% center",
      alt: "Masala chai with INKOTEA wooden signage",
    },
    {
      image: "/brand/kiosk-night-crowd.jpeg",
      position: "center 40%",
      alt: "INKOTEA kiosk at night with customers",
    },
    {
      image: "/brand/cafe-hero-sitsipsmile.jpeg",
      position: "center 35%",
      alt: "INKOTEA Social Cafe storefront",
    },
    {
      image: "/brand/chai-pour-neon.jpeg",
      position: "center center",
      alt: "Chai pour at an INKOTEA outlet",
    },
  ],
};

export const DEFAULT_CONTACT_CONTENT: ContactPageContent = {
  eyebrow: "Get in touch",
  title: "Let's build your INKOTEA chapter together.",
  subtitle:
    "Whether you want to open a franchise or just say hi — we read every message.",
  heroImage: "/brand/footer-kiosk-scene.jpeg",
  mapsUrl: "https://maps.app.goo.gl/33sznnwAdJXPDfxU8",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=17.4414196,78.4976585&z=15&output=embed",
  channels: [
    {
      label: "Franchise",
      title: "Talk to franchise team",
      text: "Investment, location, rollout — get the full kit and a personal walkthrough.",
      ctaLabel: "Email franchise team",
      ctaHref: "mailto:franchise@inkotea.com",
      variant: "primary",
    },
    {
      label: "Quick Chat",
      title: "WhatsApp",
      text: "Talk to us instantly on +91 8919 566855 or +91 84640 20418 — Mon–Sat, 10am to 7pm IST.",
      ctaLabel: "Open WhatsApp",
      ctaHref: "https://wa.me/918464020418",
      variant: "success",
    },
  ],
};

export const DEFAULT_FRANCHISE_CONTENT: FranchisePageContent = {
  chip: "Franchise Opportunity",
  title: "Start Your Own Tea or Cafe Business",
  titleAccent: "with INKOTEA",
  subtitle:
    "Two scalable formats. One proven brand. Pick the model that fits your investment, your city, and your ambition.",
  backgroundImage: "/brand/franchise-kiosk-night.jpeg",
  usps: [
    "Kiosk starting from ₹2.5 Lakhs",
    "Social Cafe starting from ₹6.5 Lakhs",
    "Two scalable formats",
    "Proven 40+ outlets",
    "End-to-end franchise support",
  ],
};

export const PAGE_DEFAULTS = {
  hero: DEFAULT_HERO_CONTENT,
  contact: DEFAULT_CONTACT_CONTENT,
  franchise: DEFAULT_FRANCHISE_CONTENT,
} as const;

export function getPageDefault(slug: PageSlug) {
  return PAGE_DEFAULTS[slug];
}
