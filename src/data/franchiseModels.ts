import type {
  FranchiseModel,
  InvestmentBucket,
  ResponsibilitySplit,
} from "@/types";

/** Franchise pages show investment as an entry point, not a fixed total. */
export function formatStartingFromInvestment(amount: string): string {
  const trimmed = amount.trim();
  if (/^starting from\b/i.test(trimmed)) return trimmed;
  if (/^from\b/i.test(trimmed)) {
    return `Starting from ${trimmed.replace(/^from\s+/i, "")}`;
  }
  return `Starting from ${trimmed}`;
}

export const FRANCHISE_MODELS: FranchiseModel[] = [
  {
    key: "kiosk",
    name: "INKOTEA Kiosk",
    tagline: "Compact. Efficient. Built for high-footfall locations.",
    description:
      "A smart, scalable tea-café kiosk designed for modern entrepreneurs. Fast service, strong branding and optimised operations in as little as 150 sq ft — proven across 40+ outlets and built for first-time F&B investors.",
    investment: "₹2.5L",
    investmentRange: [250000, 250000],
    spaceSqFt: "150 sq ft",
    setupTime: "7 – 10 days",
    staff: "Minimum 2",
    format: "Quick-service kiosk",
    roiSpeed: "Investment recovery in 8 – 10 months",
    target: "IT Parks, Colleges, Gated Communities, Food Courts",
    dailySales: "₹5,000 – ₹15,000+",
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
    whoFor: [
      "First-time entrepreneurs entering F&B",
      "Working professionals seeking a side business",
      "Families managing gated-community kiosks",
      "Women entrepreneurs & homemakers",
      "Existing vendors upgrading to a branded setup",
    ],
    accentColor: "primary",
  },
  {
    key: "cafe",
    name: "INKOTEA Social Café",
    tagline: "Sit. Sip. Smile. Premium social tea & coffee experience.",
    description:
      "A premium yet accessible neighbourhood mini-café offering signature teas & coffee, social beverages, milkshakes and quick comfort bites in a warm, inviting ambience. Designed to blend India's traditional chai culture with modern café experiences.",
    investment: "₹6.5L",
    investmentRange: [650000, 650000],
    spaceSqFt: "300 – 500 sq ft",
    setupTime: "15 – 25 days",
    staff: "3 – 5",
    format: "Dine-in social café",
    roiSpeed: "Medium (12 – 18 months)",
    target: "Food Streets, Residential Catchments, IT Parks, Highways",
    dailySales: "₹18,000 – ₹30,000+",
    monthlyRevenue: "₹5.5L – ₹7.5L",
    monthlyProfit: "₹1L – ₹1.5L",
    highlights: [
      "Affordable premium experience with strong margins",
      "Signature teas, coffee, milkshakes & comfort bites",
      "Indoor or outdoor seating layouts",
      "Community-driven social café positioning",
      "Turnkey setup support — equipment, branding, training",
    ],
    idealLocations: [
      "Food streets",
      "Residential catchments",
      "IT parks",
      "Commercial streets",
      "Highway stopovers (outdoor seating)",
    ],
    whoFor: [
      "Entrepreneurs with existing or semi-ready café spaces",
      "First-time franchise investors (Turnkey package)",
      "Tier-1 & Tier-2 city expansion partners",
      "Long-term scalable growth seekers",
    ],
    accentColor: "success",
  },
];

/**
 * Kiosk Model investment buckets — sourced from the Kiosk brochure
 * (page 4 — "Investment Breakdown"). Total investment is ₹2.5L,
 * structured into three clear buckets that an entrepreneur can plan against.
 */
export const KIOSK_INVESTMENT_BUCKETS: InvestmentBucket[] = [
  {
    key: "equipment",
    label: "Equipment",
    detail: "Mixy, oven, refrigerator, freezer, stoves and kettles",
    icon: "Kitchen",
  },
  {
    key: "raw-materials",
    label: "Raw Materials",
    detail: "1-month starter kit — teas, coffee, syrups and cups",
    icon: "Inventory2",
  },
  {
    key: "branding",
    label: "Branding",
    detail: "3D LED board, lollipop lights and menu boards",
    icon: "Lightbulb",
  },
];

/**
 * "What You Get vs What You Provide" tables — present in both brochures.
 * Stored per model so the page can render the right pair next to each
 * format card (kiosk and café responsibilities differ slightly).
 */
export const RESPONSIBILITY_SPLITS: ResponsibilitySplit[] = [
  {
    modelKey: "kiosk",
    inkoteaProvides: [
      "Setup guidance & initial training",
      "Standardized recipes & menu planning",
      "Branding & marketing direction",
      "Raw material supply support",
      "Franchise operations guidance",
    ],
    youProvide: [
      "Shop interiors & counter setup",
      "Electrical, gas & water connections",
      "Furniture & seating",
      "Daily consumables (milk, lemon, ginger)",
      "Staff hiring (minimum 2 employees)",
      "Food license & local permissions",
    ],
  },
  {
    modelKey: "cafe",
    inkoteaProvides: [
      "Franchise brand licence & playbook",
      "Equipment & kitchen setup",
      "Interior, civil, electrical & CCTV (Turnkey)",
      "Standardized recipes, menu & SOPs",
      "Staff training and operational guidance",
      "Marketing direction and launch support",
    ],
    youProvide: [
      "Shop rent / lease",
      "Furniture & loose seating",
      "Container structure (if highway / open plot)",
      "Daily consumables (milk, lemon, ginger)",
      "Staff hiring & wages",
      "Food license & local permissions",
    ],
  },
];

/**
 * "Why INKOTEA Format Works Today" — the 4 reasons highlighted on
 * page 8 of the Social Café brochure. Used on the franchise page
 * as a confidence-builder above the apply form.
 */
export const WHY_FORMAT_WORKS = [
  {
    icon: "Verified",
    title: "Proven Track Record",
    description:
      "40+ kiosk outlets across Telangana serving thousands of customers daily with strong brand recognition.",
  },
  {
    icon: "Handshake",
    title: "Franchise Support",
    description:
      "Comprehensive packages with equipment, branding and operational guidance for a smooth business setup.",
  },
  {
    icon: "Place",
    title: "Flexible Locations",
    description:
      "Suitable for main roads, residential areas, commercial streets and highway stopovers with flexible seating.",
  },
  {
    icon: "Diversity3",
    title: "Social Experience",
    description:
      "Modern social café spaces that combine traditional Indian beverage culture with contemporary café experiences.",
  },
] as const;

export const SUPPORT_PILLARS = [
  {
    icon: "LocationOn",
    title: "Location Selection",
    description:
      "Site evaluation and footfall analysis to lock in a high-performing outlet location.",
  },
  {
    icon: "Storefront",
    title: "Store Setup & Branding",
    description:
      "End-to-end setup support — kiosk design, signage, lighting and full brand identity rollout.",
  },
  {
    icon: "School",
    title: "Staff Training & SOPs",
    description:
      "Recipe standardization, hygiene protocols and operational SOPs delivered hands-on.",
  },
  {
    icon: "Campaign",
    title: "Launch & Marketing",
    description:
      "Pre-launch buzz, opening-day activation and local marketing playbooks for first 90 days.",
  },
  {
    icon: "SupportAgent",
    title: "Ongoing Operations",
    description:
      "Continuous supply chain, audit and growth support from a dedicated franchise success team.",
  },
];

/**
 * Unit-economics KPIs surfaced on the franchise page.
 * Numbers reflect the Social Café format from the brochure (Kiosk
 * range is shown separately on its own card to avoid blending the two).
 */
export const UNIT_ECONOMICS = [
  {
    label: "Avg Daily Sales (Café)",
    value: "₹18K – ₹30K+",
    description: "Strong revenue potential based on location and operations.",
  },
  {
    label: "Estimated Monthly Revenue",
    value: "₹5.5L – ₹7.5L",
    description: "Consistent cash flow with scalable café operations.",
  },
  {
    label: "Estimated Monthly Profit",
    value: "₹1L – ₹1.5L",
    description: "Healthy margins subject to location and market performance.",
  },
];

/**
 * Headline USPs surfaced on the Franchise hero. Aligned to the
 * brochure narrative: low entry, two formats, proven base.
 */
export const FRANCHISE_USPS = [
  "Kiosk starting from ₹2.5 Lakhs",
  "Social Café starting from ₹6.5 Lakhs",
  "Two scalable formats",
  "Proven 40+ outlets",
  "End-to-end franchise support",
];
