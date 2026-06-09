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

/** Editable Quick Chat card on the contact page. */
export interface QuickChatContent {
  title: string;
  phonePrimary: string;
  phoneSecondary: string;
  hours: string;
  ctaLabel: string;
  whatsappLink: string;
}

export interface ContactPageContent {
  quickChat: QuickChatContent;
}

export function formatQuickChatDescription(quickChat: QuickChatContent): string {
  return `Talk to us instantly on ${quickChat.phonePrimary} or ${quickChat.phoneSecondary} — ${quickChat.hours}.`;
}

/** Supports legacy contact documents that stored hero/maps/channels. */
export function normalizeContactContent(raw: unknown): ContactPageContent {
  if (
    raw &&
    typeof raw === "object" &&
    "quickChat" in raw &&
    (raw as ContactPageContent).quickChat
  ) {
    return {
      quickChat: {
        ...DEFAULT_QUICK_CHAT,
        ...(raw as ContactPageContent).quickChat,
      },
    };
  }

  const legacy = raw as {
    channels?: Array<{
      label?: string;
      title?: string;
      text?: string;
      ctaLabel?: string;
      ctaHref?: string;
    }>;
  };

  const channel =
    legacy.channels?.find((c) => c.label === "Quick Chat") ??
    legacy.channels?.find((c) => c.ctaHref?.includes("wa.me"));

  if (channel) {
    const match = channel.text?.match(/on (.+?) or (.+?) — (.+?)\./);
    return {
      quickChat: {
        title: channel.title || DEFAULT_QUICK_CHAT.title,
        phonePrimary: match?.[1] || DEFAULT_QUICK_CHAT.phonePrimary,
        phoneSecondary: match?.[2] || DEFAULT_QUICK_CHAT.phoneSecondary,
        hours: match?.[3] || DEFAULT_QUICK_CHAT.hours,
        ctaLabel: channel.ctaLabel || DEFAULT_QUICK_CHAT.ctaLabel,
        whatsappLink: channel.ctaHref || DEFAULT_QUICK_CHAT.whatsappLink,
      },
    };
  }

  return DEFAULT_CONTACT_CONTENT;
}

export const DEFAULT_QUICK_CHAT: QuickChatContent = {
  title: "WhatsApp",
  phonePrimary: "+91 8919 566855",
  phoneSecondary: "+91 84640 20418",
  hours: "Mon–Sat, 10am to 7pm IST",
  ctaLabel: "Open WhatsApp",
  whatsappLink: "https://wa.me/918464020418",
};

export type FranchiseModelKey = "kiosk" | "cafe";

/** One franchise model card in the Choose Your Model section. */
export interface FranchiseModelCardContent {
  key: FranchiseModelKey;
  name: string;
  tagline: string;
  description: string;
  format: string;
  investment: string;
  spaceSqFt: string;
  setupTime: string;
  staff: string;
  roiSpeed: string;
  target: string;
  headerImage: string;
  highlights: string[];
  idealLocations: string[];
}

export interface ChooseYourModelContent {
  eyebrow: string;
  title: string;
  description: string;
  models: FranchiseModelCardContent[];
}

export interface FranchisePageContent {
  chooseYourModel: ChooseYourModelContent;
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
  quickChat: DEFAULT_QUICK_CHAT,
};

const DEFAULT_KIOSK_MODEL: FranchiseModelCardContent = {
  key: "kiosk",
  name: "INKOTEA Kiosk",
  tagline: "Compact. Efficient. Built for high-footfall locations.",
  description:
    "A smart, scalable tea-cafe kiosk designed for modern entrepreneurs. Fast service, strong branding and optimised operations in as little as 150 sq ft — proven across 40+ outlets and built for first-time F&B investors.",
  format: "Quick-service kiosk",
  investment: "₹2.5L",
  spaceSqFt: "150 sq ft",
  setupTime: "7 – 10 days",
  staff: "Minimum 2",
  roiSpeed: "Investment recovery in 8 – 10 months",
  target: "IT Parks, Colleges, Gated Communities, Food Courts",
  headerImage: "/brand/franchise-kiosk-night.jpeg",
  highlights: [
    "Compact 150 sq ft footprint with strong branding",
    "Premium yet affordable — regional snacks meet modern beverages",
    "Standardized recipes & operational SOPs",
    "Investment recovery target: 8 – 10 months",
    "No prior F&B experience required",
  ],
  idealLocations: [
    "IT parks & office corridors",
    "Colleges & universities",
    "Gated communities",
    "Commercial areas & food courts",
    "Bus stops & transit hubs",
  ],
};

const DEFAULT_CAFE_MODEL: FranchiseModelCardContent = {
  key: "cafe",
  name: "INKOTEA Social Cafe",
  tagline: "Sit. Sip. Smile. Premium social tea & coffee experience.",
  description:
    "A premium yet accessible neighbourhood mini-cafe offering signature teas & coffee, social beverages, milkshakes and quick comfort bites in a warm, inviting ambience. Designed to blend India's traditional chai culture with modern cafe experiences.",
  format: "Dine-in social cafe",
  investment: "₹6.5L",
  spaceSqFt: "300 – 500 sq ft",
  setupTime: "15 – 25 days",
  staff: "3 – 5",
  roiSpeed: "Medium (12 – 18 months)",
  target: "Food Streets, Residential Catchments, IT Parks, Highways",
  headerImage: "/brand/franchise-cafe-storefront.jpeg",
  highlights: [
    "Affordable premium experience with strong margins",
    "Signature teas, coffee, milkshakes & comfort bites",
    "Indoor or outdoor seating layouts",
    "Community-driven social cafe positioning",
    "Turnkey setup support — equipment, branding, training",
  ],
  idealLocations: [
    "Food streets",
    "Residential catchments",
    "IT parks",
    "Commercial streets",
    "Highway stopovers (outdoor seating)",
  ],
};

export const DEFAULT_CHOOSE_YOUR_MODEL: ChooseYourModelContent = {
  eyebrow: "Choose Your Model",
  title: "One strong cafe brand. Two simple investment options.",
  description:
    "Both formats are profitable — they simply reward different operator profiles, locations and ambitions.",
  models: [DEFAULT_KIOSK_MODEL, DEFAULT_CAFE_MODEL],
};

export const DEFAULT_FRANCHISE_CONTENT: FranchisePageContent = {
  chooseYourModel: DEFAULT_CHOOSE_YOUR_MODEL,
};

/** Supports legacy franchise documents that stored hero copy. */
export function normalizeFranchiseContent(raw: unknown): FranchisePageContent {
  if (
    raw &&
    typeof raw === "object" &&
    "chooseYourModel" in raw &&
    (raw as FranchisePageContent).chooseYourModel
  ) {
    const section = (raw as FranchisePageContent).chooseYourModel;
    return {
      chooseYourModel: {
        ...DEFAULT_CHOOSE_YOUR_MODEL,
        ...section,
        models: DEFAULT_CHOOSE_YOUR_MODEL.models.map((defaults) => {
          const saved = section.models?.find((m) => m.key === defaults.key);
          return saved ? { ...defaults, ...saved } : defaults;
        }),
      },
    };
  }

  return DEFAULT_FRANCHISE_CONTENT;
}

export const PAGE_DEFAULTS = {
  hero: DEFAULT_HERO_CONTENT,
  contact: DEFAULT_CONTACT_CONTENT,
  franchise: DEFAULT_FRANCHISE_CONTENT,
} as const;

export function getPageDefault(slug: PageSlug) {
  return PAGE_DEFAULTS[slug];
}
