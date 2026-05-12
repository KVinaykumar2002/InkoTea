import type { FranchiseModel, InvestmentPackage } from "@/types";

export const FRANCHISE_MODELS: FranchiseModel[] = [
  {
    key: "kiosk",
    name: "INKOTEA Kiosk",
    tagline: "Low Investment. High Volume. Fast Growth.",
    description:
      "A compact, branded tea kiosk built for high-footfall locations — IT corridors, colleges, transit hubs and busy streets. Designed for first-time entrepreneurs entering the F&B space with minimal complexity.",
    investment: "₹2.5L – ₹3L",
    investmentRange: [250000, 300000],
    spaceSqFt: "100 – 150 sq ft",
    setupTime: "7 – 10 days",
    staff: "1 – 2",
    format: "Quick-service takeaway",
    roiSpeed: "Fast (8 – 10 months)",
    target: "High-footfall transit & office zones",
    highlights: [
      "Proven model with 40+ outlets",
      "Daily cash-flow business",
      "Minimal manpower required",
      "Standardized recipes & SOPs",
      "High repeat-customer category",
    ],
    idealLocations: [
      "IT parks & office zones",
      "Colleges & universities",
      "Bus stops & metro stations",
      "Commercial streets",
      "Hospitals & institutional areas",
    ],
    whoFor: [
      "First-time F&B entrepreneurs",
      "Working professionals seeking side business",
      "Families managing community kiosks",
      "Existing vendors upgrading to a branded setup",
    ],
    accentColor: "primary",
  },
  {
    key: "cafe",
    name: "INKOTEA Social Café",
    tagline: "Experience-driven. Higher Value. Brand-Building.",
    description:
      "A modern, accessible mini-café concept where customers gather over signature teas, premium coffee and comfort bites. Built for high streets, residential catchments and emerging urban neighbourhoods.",
    investment: "₹6.5L – ₹9L",
    investmentRange: [650000, 900000],
    spaceSqFt: "300 – 500 sq ft",
    setupTime: "15 – 25 days",
    staff: "3 – 5",
    format: "Dine-in social space",
    roiSpeed: "Medium (12 – 18 months)",
    target: "High streets & residential catchments",
    highlights: [
      "Higher ticket size per customer",
      "Lifestyle café positioning",
      "Multiple revenue streams",
      "Strong brand recall & loyalty",
      "Diversified menu (tea + coffee + bites)",
    ],
    idealLocations: [
      "High streets",
      "Residential catchments",
      "Near colleges & coworking",
      "Commercial hubs",
      "Highway stopovers (with outdoor seating)",
    ],
    whoFor: [
      "Entrepreneurs targeting premium positioning",
      "Investors building a brand asset",
      "Franchise partners in urban areas",
      "Long-term scalable growth seekers",
    ],
    accentColor: "success",
  },
];

export const INVESTMENT_PACKAGES: InvestmentPackage[] = [
  {
    key: "standard",
    name: "Standard Café Setup",
    subtitle: "For existing or semi-ready shops",
    total: "₹6,50,000",
    breakdown: [
      { label: "Franchise Brand Fee", value: "₹3,00,000" },
      { label: "Equipment & Kitchen Setup", value: "₹3,50,000" },
    ],
    notIncluded: [
      "Shop rent / lease",
      "Interior design & execution",
      "Civil & electrical works",
      "Furniture & seating",
      "Container structure (open spaces)",
    ],
    bestFor:
      "Entrepreneurs with existing café spaces or renovation-based setups looking for a lower investment entry.",
  },
  {
    key: "turnkey",
    name: "Turnkey Café Setup",
    subtitle: "For bare shops / first-time entrepreneurs",
    total: "₹9,00,000",
    breakdown: [
      { label: "Franchise Fee + Equipment", value: "₹6,50,000" },
      { label: "Interior + Civil + Electrical + CCTV", value: "₹2,50,000" },
    ],
    notIncluded: [
      "Shop rent / lease",
      "Furniture & loose seating",
      "Container structure (highway / open plots)",
    ],
    bestFor:
      "Bare shop locations, first-time franchise investors, and Tier-1 & Tier-2 city expansion.",
    highlight: true,
  },
];

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

export const UNIT_ECONOMICS = [
  {
    label: "Avg Daily Sales",
    value: "₹18K – ₹30K+",
    description: "Strong revenue potential based on location & operations",
  },
  {
    label: "Estimated Monthly Profit",
    value: "₹1L – ₹1.5L",
    description: "Healthy margins subject to location & market performance",
  },
  {
    label: "Break-even",
    value: "8 – 18 months",
    description: "Faster recovery for kiosks; medium horizon for cafés",
  },
];

export const FRANCHISE_USPS = [
  "Entry starting under ₹3 Lakhs",
  "Multi-format scalable model",
  "High repeat customer category",
  "Daily cash-flow business",
  "Proven 40+ outlets",
];
