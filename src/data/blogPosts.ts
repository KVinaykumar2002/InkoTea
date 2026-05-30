import type { BlogPost } from "@/types";
import { BRAND_IMAGES } from "@/lib/brandImages";

export const BLOG_CATEGORIES = [
  { key: "all", label: "All Posts" },
  { key: "tea-trends", label: "Tea Trends" },
  { key: "franchise", label: "Franchise" },
  { key: "cafe-culture", label: "Cafe Culture" },
  { key: "entrepreneurship", label: "Entrepreneurship" },
  { key: "brand", label: "Brand Updates" },
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-india-is-falling-back-in-love-with-chai",
    title: "Why India Is Falling Back In Love With Chai",
    excerpt:
      "From street corners to luxury cafes, Indian chai is having a renaissance — and the data backs it up.",
    category: "tea-trends",
    author: "INKOTEA Editorial",
    publishedAt: "2026-04-22",
    readingMinutes: 5,
    cover: BRAND_IMAGES.chaiPourNeon,
    body: `India consumes more than **1.1 million tonnes** of tea annually — but the way we drink it is changing. The chai stall isn't dying; it's getting upgraded.

## The hybrid consumer
Today's chai drinker wants the warmth of a roadside *kulhad* with the hygiene and consistency of a branded cafe. That's exactly the gap brands like INKOTEA are built to close.

## Three forces driving the shift
1. **Urban migration** — first-generation city dwellers crave familiar tastes in unfamiliar cities.
2. **Cafe culture maturation** — Gen Z is comfortable spending ₹100+ on a beverage if the experience feels authentic.
3. **Health-positioning** — masala chai is now seen as a wellness ritual, not just a drink.

> "Chai isn't a category. It's a mood." — INKOTEA founder Srinivas P. Mahendra

The next decade of Indian F&B belongs to brands that respect both the *feeling* of chai and the discipline of modern retail.`,
  },
  {
    slug: "kiosk-vs-cafe-which-franchise-model-fits-you",
    title: "Kiosk vs Cafe: Which Franchise Model Fits You?",
    excerpt:
      "A practical decision framework for choosing between a high-volume kiosk and an experience-led cafe.",
    category: "franchise",
    author: "Franchise Desk",
    publishedAt: "2026-04-10",
    readingMinutes: 7,
    cover: BRAND_IMAGES.kioskModernYellow,
    body: `Both INKOTEA franchise formats are profitable. But they reward very different operator profiles.

## Choose **Kiosk** if you have:
- Less than ₹4L to invest
- A high-footfall location (transit, IT, college)
- Hands-on operator energy
- Patience for daily volume play

## Choose **Cafe** if you have:
- ₹6.5L+ to invest comfortably
- A high-street or residential catchment
- Interest in building a brand asset
- Tolerance for a 12–18 month break-even

The smartest INKOTEA partners often start with a kiosk, prove the unit economics in their city, then graduate to a cafe in the same catchment.`,
  },
  {
    slug: "the-economics-of-a-3-lakh-tea-business",
    title: "The Economics of a ₹3 Lakh Tea Business",
    excerpt:
      "We break down the actual P&L of an INKOTEA kiosk — revenue, costs, margins, and the path to break-even.",
    category: "entrepreneurship",
    author: "INKOTEA Editorial",
    publishedAt: "2026-03-28",
    readingMinutes: 8,
    cover: BRAND_IMAGES.kioskCustomerBanner,
    body: `Most aspiring entrepreneurs overestimate revenue and underestimate costs. Here's the honest math behind a tea kiosk.

## Daily revenue (illustrative)
| Category | Cups/Day | Avg Price | Revenue |
|---|---|---|---|
| Signature Tea | 200 | ₹25 | ₹5,000 |
| Coffee | 60 | ₹50 | ₹3,000 |
| Coolers & Shakes | 30 | ₹100 | ₹3,000 |
| Snacks | 40 | ₹50 | ₹2,000 |
| **Total** | | | **₹13,000** |

## Monthly P&L outline
- Gross revenue: ~₹3.9L
- COGS (35%): ~₹1.36L
- Rent + utilities: ~₹40K
- Staff (2): ~₹35K
- Net profit: **₹1L – ₹1.5L**

Numbers vary by location. Some INKOTEA kiosks recover their investment in **8 months**.`,
  },
  {
    slug: "designing-a-cafe-people-actually-stay-in",
    title: "Designing a Cafe People Actually Stay In",
    excerpt:
      "Five interior principles we apply across every INKOTEA Social Cafe — and why they drive ticket size.",
    category: "cafe-culture",
    author: "Design Studio",
    publishedAt: "2026-03-15",
    readingMinutes: 6,
    cover: BRAND_IMAGES.cafeInteriorBusy,
    body: `Dwell time is the single biggest lever in cafe economics. The longer customers stay, the more they spend.

1. **Warm lighting** — never above 3000K
2. **Mixed seating** — solo nooks + group tables
3. **Charging access** — power at every table
4. **Acoustic comfort** — soft surfaces, music at 60dB
5. **Visible craft** — open prep area builds trust

Get these right and your average ticket goes from ₹120 to ₹220 without changing the menu.`,
  },
  {
    slug: "from-one-kiosk-to-forty-outlets",
    title: "From One Kiosk to Forty Outlets: Our Story",
    excerpt:
      "A founder's-eye view of building INKOTEA from a single Hyderabad kiosk to a multi-city retail brand.",
    category: "brand",
    author: "Srinivas P. Mahendra",
    publishedAt: "2026-02-20",
    readingMinutes: 9,
    cover: BRAND_IMAGES.kioskNightCrowd,
    body: `When we opened our first kiosk in 2021, we had one rule: every cup must taste the same, every single day.

## The first year
We made every chai ourselves. We fired three suppliers. We re-wrote the recipe seven times.

## The franchise inflection
At outlet #6, we realized we weren't running a tea business — we were running a **systems** business. That's when INKOTEA became a franchise brand.

## What's next
40 outlets is just the start. The Social Cafe format is our bridge to becoming a national lifestyle brand.`,
  },
  {
    slug: "what-investors-look-for-in-an-fnb-franchise",
    title: "What Investors Look For In An F&B Franchise",
    excerpt:
      "A frank guide to the metrics, market positioning, and operator quality that determine franchise success.",
    category: "entrepreneurship",
    author: "Franchise Desk",
    publishedAt: "2026-02-05",
    readingMinutes: 6,
    cover: BRAND_IMAGES.cafeFriendsChat,
    body: `Investing in an F&B franchise is part diligence, part instinct. Here's what serious operators look for.

## The five non-negotiables
- **Unit economics that work without subsidies**
- **A repeatable training & SOP system**
- **Supply chain control**
- **Brand recall in target catchments**
- **An operator playbook for the first 90 days**

INKOTEA scores on all five — which is why our partner-renewal rate is above 90%.`,
  },
];
