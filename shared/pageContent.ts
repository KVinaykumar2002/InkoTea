export type PageSlug = "hero" | "contact" | "franchise" | "social";

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
  chip: string;
  titleLine1: string;
  titleLine2: string;
  subhead: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export interface HeroPageContent {
  metrics: HeroMetric[];
  slides: HeroSlide[];
}

/** Page-level hero copy before per-slide fields were introduced. */
interface LegacyHeroPageContent {
  chip?: string;
  titleLine1?: string;
  titleLine2?: string;
  subhead?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  slides?: Array<Partial<HeroSlide>>;
  metrics?: HeroMetric[];
}

const DEFAULT_HERO_SLIDE_COPY = {
  chip: "The Feeling of One More",
  titleLine1: "India's Chai Culture.",
  titleLine2: "Reimagined for Today.",
  subhead:
    "From a ₹2.5L kiosk to a full Social Cafe — INKOTEA blends India's traditional chai culture with a modern cafe experience. 40+ outlets and growing across Telangana & AP.",
  primaryCtaLabel: "Explore Franchise",
  primaryCtaHref: "/franchise",
  secondaryCtaLabel: "Find Nearest Outlet",
  secondaryCtaHref: "/outlets",
};

type HeroSlideCopy = Pick<
  HeroSlide,
  | "chip"
  | "titleLine1"
  | "titleLine2"
  | "subhead"
  | "primaryCtaLabel"
  | "primaryCtaHref"
  | "secondaryCtaLabel"
  | "secondaryCtaHref"
>;

function heroSlideCopyFrom(
  partial: Partial<HeroSlide> | undefined,
  fallback: HeroSlideCopy = DEFAULT_HERO_SLIDE_COPY,
): HeroSlideCopy {
  return {
    chip: partial?.chip ?? fallback.chip,
    titleLine1: partial?.titleLine1 ?? fallback.titleLine1,
    titleLine2: partial?.titleLine2 ?? fallback.titleLine2,
    subhead: partial?.subhead ?? fallback.subhead,
    primaryCtaLabel: partial?.primaryCtaLabel ?? fallback.primaryCtaLabel,
    primaryCtaHref: partial?.primaryCtaHref ?? fallback.primaryCtaHref,
    secondaryCtaLabel: partial?.secondaryCtaLabel ?? fallback.secondaryCtaLabel,
    secondaryCtaHref: partial?.secondaryCtaHref ?? fallback.secondaryCtaHref,
  };
}

/** Supports legacy hero documents that stored copy at the page level. */
export function normalizeHeroContent(raw: unknown): HeroPageContent {
  if (!raw || typeof raw !== "object") {
    return DEFAULT_HERO_CONTENT;
  }

  const data = raw as LegacyHeroPageContent;
  const legacyCopy = heroSlideCopyFrom(data);
  const sourceSlides =
    data.slides?.length ? data.slides : DEFAULT_HERO_CONTENT.slides;

  const normalizedSlides = sourceSlides.map((slide, index) => {
    const defaults = DEFAULT_HERO_CONTENT.slides[index] ?? DEFAULT_HERO_CONTENT.slides[0];
    const hasPerSlideCopy =
      slide?.chip !== undefined ||
      slide?.titleLine1 !== undefined ||
      slide?.titleLine2 !== undefined ||
      slide?.subhead !== undefined;

    return {
      image: slide?.image ?? defaults.image,
      position: slide?.position ?? defaults.position,
      alt: slide?.alt ?? defaults.alt,
      ...heroSlideCopyFrom(
        hasPerSlideCopy ? slide : { ...legacyCopy, ...slide },
        defaults,
      ),
    };
  });

  return {
    metrics: data.metrics ?? DEFAULT_HERO_CONTENT.metrics,
    slides: normalizedSlides.length
      ? normalizedSlides
      : [createDefaultHeroSlide()],
  };
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
      ...DEFAULT_HERO_SLIDE_COPY,
    },
    {
      image: "/brand/kiosk-night-crowd.jpeg",
      position: "center 40%",
      alt: "INKOTEA kiosk at night with customers",
      chip: "Built for High Footfall",
      titleLine1: "Your Kiosk.",
      titleLine2: "Your Neighbourhood Chai Stop.",
      subhead:
        "A compact ₹2.5L format designed for IT parks, colleges and transit hubs — fast service, strong branding and proven operations in as little as 150 sq ft.",
      primaryCtaLabel: "Explore Kiosk Model",
      primaryCtaHref: "/franchise#kiosk",
      secondaryCtaLabel: "Find Nearest Outlet",
      secondaryCtaHref: "/outlets",
    },
    {
      image: "/brand/cafe-hero-sitsipsmile.jpeg",
      position: "center 35%",
      alt: "INKOTEA Social Cafe storefront",
      chip: "Sit. Sip. Smile.",
      titleLine1: "A Social Cafe",
      titleLine2: "For Every Neighbourhood.",
      subhead:
        "Premium teas, coffee, milkshakes and comfort bites in a warm dine-in ambience — the ₹6.5L format for food streets, residential catchments and community hangouts.",
      primaryCtaLabel: "Explore Cafe Model",
      primaryCtaHref: "/franchise#cafe",
      secondaryCtaLabel: "View Menu",
      secondaryCtaHref: "/menu",
    },
    {
      image: "/brand/chai-pour-neon.jpeg",
      position: "center center",
      alt: "Chai pour at an INKOTEA outlet",
      chip: "Crafted Fresh, Every Cup",
      titleLine1: "Signature Chai.",
      titleLine2: "Poured With Pride.",
      subhead:
        "From masala and elaichi to filter coffee and coolers — every INKOTEA cup blends India's traditional flavours with a modern cafe experience customers come back for.",
      primaryCtaLabel: "Explore Franchise",
      primaryCtaHref: "/franchise",
      secondaryCtaLabel: "Find Nearest Outlet",
      secondaryCtaHref: "/outlets",
    },
  ],
};

export const MIN_HERO_SLIDES = 1;
export const MAX_HERO_SLIDES = 8;

/** Blank slide template for the admin “Add slide” action. */
export function createDefaultHeroSlide(
  template?: Partial<HeroSlide>,
): HeroSlide {
  return {
    image: "",
    position: "center center",
    alt: "",
    ...DEFAULT_HERO_SLIDE_COPY,
    ...template,
  };
}

export const DEFAULT_CONTACT_CONTENT: ContactPageContent = {
  quickChat: DEFAULT_QUICK_CHAT,
};

export interface SocialPageContent {
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
}

export const DEFAULT_SOCIAL_CONTENT: SocialPageContent = {
  instagram: "https://instagram.com/inkotea",
  facebook: "https://facebook.com/inkotea",
  youtube: "https://youtube.com/@inkotea",
  linkedin: "https://linkedin.com/company/inkotea",
};

export function normalizeSocialContent(raw: unknown): SocialPageContent {
  if (!raw || typeof raw !== "object") {
    return DEFAULT_SOCIAL_CONTENT;
  }

  const data = raw as Partial<SocialPageContent>;
  return {
    instagram:
      data.instagram !== undefined
        ? data.instagram.trim()
        : DEFAULT_SOCIAL_CONTENT.instagram,
    facebook:
      data.facebook !== undefined
        ? data.facebook.trim()
        : DEFAULT_SOCIAL_CONTENT.facebook,
    youtube:
      data.youtube !== undefined
        ? data.youtube.trim()
        : DEFAULT_SOCIAL_CONTENT.youtube,
    linkedin:
      data.linkedin !== undefined
        ? data.linkedin.trim()
        : DEFAULT_SOCIAL_CONTENT.linkedin,
  };
}

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
  social: DEFAULT_SOCIAL_CONTENT,
} as const;

export function getPageDefault(slug: PageSlug) {
  return PAGE_DEFAULTS[slug];
}
