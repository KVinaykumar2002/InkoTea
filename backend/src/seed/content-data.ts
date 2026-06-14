import type { BlogPostRow, FaqRow, LeadRow, MenuCategoryRow, MenuItemRow, OutletRow, TestimonialRow } from "../types.js";

const KIOSK_IMAGES = [
  "/brand/kiosk-night-crowd.jpeg",
  "/brand/kiosk-daylight.jpeg",
  "/brand/kiosk-foodcourt.jpeg",
  "/brand/kiosk-modern-yellow.jpeg",
  "/brand/kiosk-standalone-night.jpeg",
  "/brand/kiosk-customer-banner.jpeg",
] as const;

const CAFE_IMAGES = [
  "/brand/cafe-storefront-night.jpeg",
  "/brand/cafe-hero-sitsipsmile.jpeg",
  "/brand/cafe-outdoor-seating.jpeg",
  "/brand/cafe-interior-busy.jpeg",
  "/brand/cafe-friends-chat.jpeg",
  "/brand/cafe-couple-coffee.jpeg",
] as const;

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0;
  }
  return h;
}

function outletImage(type: "kiosk" | "cafe", id: string): string {
  const pool = type === "kiosk" ? KIOSK_IMAGES : CAFE_IMAGES;
  return pool[hashId(id) % pool.length];
}

function unsplash(photoId: string): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&h=600&q=80`;
}

const MENU_IMAGES: Record<string, string> = {
  "desi-dum": unsplash("1612846213933-916a1f56d859"),
  masala: unsplash("1609670438772-9cf3afc5052b"),
  elaichi: unsplash("1622824497447-b284a5493027"),
  kashmiri: unsplash("1630748662359-40a2105640c7"),
  ginger: unsplash("1633069683078-b180ba2afd89"),
  "filter-coffee": unsplash("1758387941825-a6ecaec9c14d"),
  cappuccino: unsplash("1572442388796-11668a67e53d"),
  latte: unsplash("1517256064527-09c73fc73e38"),
  "ragi-java": unsplash("1583836632332-53825ce55a03"),
  boost: unsplash("1586714932157-5853aed2e64b"),
  "oreo-shake": unsplash("1572490122747-3968b75cc699"),
  "kitkat-shake": unsplash("1553787499-6f9133860278"),
  mojito: unsplash("1546171753-97d7676e4602"),
  "iced-tea": unsplash("1556679343-c7306c1976bc"),
  osmania: unsplash("1544787219-7f47ccb76574"),
  "maggi-bowl": unsplash("1612929633738-8fe44f7ec841"),
  samosa: unsplash("1601050690597-df0568f70950"),
  sandwich: unsplash("1528736235302-52922df5c122"),
  fries: unsplash("1630431341973-02e1b662ec35"),
  "chocolate-cake": unsplash("1517427294546-5aa121f68e8a"),
};

export const SEED_MENU_CATEGORIES: MenuCategoryRow[] = [
  {
    key: "signature-tea",
    label: "Signature Tea",
    short_label: "Tea",
    description:
      "Hand-pounded ginger, cardamom and slow-brewed leaves — every cup tuned for that one more sip.",
    price_range: "₹20 – ₹50",
  },
  {
    key: "coffee",
    label: "Coffee & Health",
    short_label: "Coffee",
    description:
      "Signature brews and wellness drinks — from filter coffee to ragi java and Boost.",
    price_range: "₹40 – ₹180",
  },
  {
    key: "social-beverages",
    label: "Social Beverages",
    short_label: "Social",
    description:
      "Milkshakes, mojitos and seasonal coolers built for sharing tables and long chats.",
    price_range: "₹80 – ₹140",
  },
  {
    key: "comfort-bites",
    label: "Comfort Bites",
    short_label: "Bites",
    description:
      "Osmania biscuits, Maggi bowls, savoury snacks and light meals — chai's best companions.",
    price_range: "₹60 – ₹220",
  },
];

const menuItemsRaw: Omit<MenuItemRow, "image">[] = [
  { id: "desi-dum", name: "Desi Dum Chai", category: "signature-tea", description: "Slow-cooked over flame with milk reduction, hand-pounded ginger and a pinch of cardamom.", price_range: "₹25 – ₹40", is_best_seller: 1 },
  { id: "masala", name: "Masala Chai", category: "signature-tea", description: "Six-spice blend brewed to perfection — clove, cinnamon, fennel, pepper, cardamom & ginger.", price_range: "₹20 – ₹35", is_best_seller: 1 },
  { id: "elaichi", name: "Elaichi Chai", category: "signature-tea", description: "Crushed green cardamom infused into rich Assam tea milk.", price_range: "₹25 – ₹35", is_best_seller: 0 },
  { id: "kashmiri", name: "Kashmiri Kahwa", category: "signature-tea", description: "Saffron, almond slivers and green tea — a warming Himalayan classic.", price_range: "₹40 – ₹50", is_best_seller: 0 },
  { id: "ginger", name: "Ginger Kadak Chai", category: "signature-tea", description: "Maa-ke-haath ki ghar wali kadak — strong, gingery and unforgettable.", price_range: "₹25 – ₹35", is_best_seller: 0 },
  { id: "filter-coffee", name: "South Indian Filter Coffee", category: "coffee", description: "Decoction percolated overnight, frothed with hot milk in a stainless tumbler.", price_range: "₹40 – ₹60", is_best_seller: 1 },
  { id: "cappuccino", name: "Signature Cappuccino", category: "coffee", description: "Double espresso with velvet steamed milk and a dusting of cocoa.", price_range: "₹100 – ₹140", is_best_seller: 0 },
  { id: "latte", name: "Cardamom Latte", category: "coffee", description: "Espresso with cardamom-infused milk — INKOTEA's signature twist.", price_range: "₹120 – ₹160", is_best_seller: 0 },
  { id: "ragi-java", name: "Ragi Java", category: "coffee", description: "Traditional millet-based wellness drink, slow-cooked & nourishing.", price_range: "₹50 – ₹70", is_best_seller: 0 },
  { id: "boost", name: "Boost / Horlicks Hot", category: "coffee", description: "Childhood comfort in a cup — frothy, malty and warm.", price_range: "₹40 – ₹60", is_best_seller: 0 },
  { id: "oreo-shake", name: "Oreo Milkshake", category: "social-beverages", description: "Crushed Oreo cookies blended with thick vanilla cream.", price_range: "₹100 – ₹140", is_best_seller: 1 },
  { id: "kitkat-shake", name: "KitKat Crush", category: "social-beverages", description: "Layered chocolate shake with KitKat chunks and whipped cream.", price_range: "₹120 – ₹140", is_best_seller: 0 },
  { id: "mojito", name: "Virgin Mint Mojito", category: "social-beverages", description: "Muddled mint, lime, brown sugar and chilled soda.", price_range: "₹80 – ₹100", is_best_seller: 0 },
  { id: "iced-tea", name: "Peach Iced Tea", category: "social-beverages", description: "Brewed black tea over ice with peach essence and a hint of lemon.", price_range: "₹80 – ₹100", is_best_seller: 0 },
  { id: "osmania", name: "Osmania Biscuit", category: "comfort-bites", description: "Hyderabad's iconic crumbly tea biscuit — sweet, salty, melt-in-mouth.", price_range: "₹15 – ₹30", is_best_seller: 1 },
  { id: "maggi-bowl", name: "Cheesy Masala Maggi", category: "comfort-bites", description: "2-minute classic with cheese, onions, capsicum and INKOTEA tadka.", price_range: "₹80 – ₹120", is_best_seller: 0 },
  { id: "samosa", name: "Crispy Samosa Plate", category: "comfort-bites", description: "Hand-folded, deep-fried, served hot with mint-tamarind chutney.", price_range: "₹40 – ₹60", is_best_seller: 0 },
  { id: "sandwich", name: "Grilled Veg Sandwich", category: "comfort-bites", description: "Multigrain bread, fresh veggies, mint chutney, melted cheese.", price_range: "₹120 – ₹180", is_best_seller: 0 },
  { id: "fries", name: "Peri-Peri Fries", category: "comfort-bites", description: "Crispy shoestring fries tossed in tangy peri-peri spice mix.", price_range: "₹100 – ₹160", is_best_seller: 0 },
  { id: "chocolate-cake", name: "Chocolate Truffle Slice", category: "comfort-bites", description: "Dense chocolate sponge layered with dark ganache truffle.", price_range: "₹140 – ₹220", is_best_seller: 0 },
];

export const SEED_MENU_ITEMS: MenuItemRow[] = menuItemsRaw.map((item) => ({
  ...item,
  image: MENU_IMAGES[item.id] ?? unsplash("1612846213933-916a1f56d859"),
}));

const outletsRaw: Omit<OutletRow, "image">[] = [
  { id: "hyd-hitech", name: "INKOTEA Hitech City", city: "Hyderabad", area: "Hitech City", address: "Plot 42, Cyber Towers Rd, Madhapur, Hyderabad 500081", type: "cafe", maps_query: "Hitech City Hyderabad", opening_year: 2023 },
  { id: "hyd-kondapur", name: "INKOTEA Kondapur", city: "Hyderabad", area: "Kondapur", address: "Beside HDFC Bank, Kothaguda Junction, Kondapur, Hyderabad", type: "kiosk", maps_query: "Kondapur Hyderabad", opening_year: 2022 },
  { id: "hyd-gachibowli", name: "INKOTEA Gachibowli", city: "Hyderabad", area: "Gachibowli", address: "DLF Cyber City, Gachibowli, Hyderabad 500032", type: "cafe", maps_query: "Gachibowli Hyderabad", opening_year: 2024 },
  { id: "hyd-banjara", name: "INKOTEA Banjara Hills", city: "Hyderabad", area: "Banjara Hills", address: "Road No. 12, Banjara Hills, Hyderabad 500034", type: "cafe", maps_query: "Banjara Hills Hyderabad", opening_year: 2023 },
  { id: "hyd-ameerpet", name: "INKOTEA Ameerpet", city: "Hyderabad", area: "Ameerpet", address: "Opp Maitrivanam, Ameerpet, Hyderabad 500038", type: "kiosk", maps_query: "Ameerpet Hyderabad", opening_year: 2022 },
  { id: "hyd-secunderabad", name: "INKOTEA Secunderabad", city: "Hyderabad", area: "Secunderabad", address: "MG Road, near Clock Tower, Secunderabad 500003", type: "kiosk", maps_query: "Secunderabad", opening_year: 2021 },
  { id: "wgl-hanamkonda", name: "INKOTEA Hanamkonda", city: "Warangal", area: "Hanamkonda", address: "Subedari, Hanamkonda, Warangal 506001", type: "kiosk", maps_query: "Hanamkonda Warangal", opening_year: 2023 },
  { id: "wgl-kuc", name: "INKOTEA Kazipet", city: "Warangal", area: "Kazipet", address: "KU Campus Road, Kazipet, Warangal", type: "kiosk", maps_query: "Kazipet Warangal", opening_year: 2024 },
  { id: "krm-tower", name: "INKOTEA Tower Circle", city: "Karimnagar", area: "Tower Circle", address: "Tower Circle Main Rd, Karimnagar 505001", type: "kiosk", maps_query: "Tower Circle Karimnagar", opening_year: 2024 },
  { id: "nzb-bus", name: "INKOTEA Nizamabad Bus Stand", city: "Nizamabad", area: "Bus Stand", address: "Bus Stand Main Rd, Nizamabad 503001", type: "kiosk", maps_query: "Nizamabad bus stand", opening_year: 2024 },
  { id: "vij-bezwada", name: "INKOTEA Bezwada", city: "Vijayawada", area: "Bezwada", address: "MG Road, Bezwada, Vijayawada 520001", type: "cafe", maps_query: "Bezwada Vijayawada", opening_year: 2025 },
  { id: "vij-bhavanipuram", name: "INKOTEA Bhavanipuram", city: "Vijayawada", area: "Bhavanipuram", address: "Bhavanipuram Main Rd, Vijayawada 520012", type: "kiosk", maps_query: "Bhavanipuram Vijayawada", opening_year: 2024 },
  { id: "vsp-mvp", name: "INKOTEA MVP Colony", city: "Visakhapatnam", area: "MVP Colony", address: "Sector 2, MVP Colony, Visakhapatnam 530017", type: "cafe", maps_query: "MVP Colony Visakhapatnam", opening_year: 2025 },
  { id: "vsp-rkbeach", name: "INKOTEA RK Beach", city: "Visakhapatnam", area: "RK Beach", address: "Beach Road, RK Beach, Visakhapatnam 530002", type: "cafe", maps_query: "RK Beach Visakhapatnam", opening_year: 2025 },
  { id: "gnt-arundelpet", name: "INKOTEA Arundelpet", city: "Guntur", area: "Arundelpet", address: "5/1 Arundelpet, Guntur 522002", type: "kiosk", maps_query: "Arundelpet Guntur", opening_year: 2024 },
];

export const SEED_OUTLETS: OutletRow[] = outletsRaw.map((outlet) => ({
  ...outlet,
  image: outletImage(outlet.type as "kiosk" | "cafe", outlet.id),
}));

export const SEED_FAQS: FaqRow[] = [
  { id: "investment", question: "What is the investment required for an INKOTEA franchise?", answer: "The Kiosk Model starts from ₹2.5 Lakhs total investment, optimised for first-time entrepreneurs and small investors. The Social Cafe Model starts from ₹6.5 Lakhs depending on whether you choose the Standard package (existing/semi-ready shop) or the Turnkey package (bare shop, full setup including interior, civil, electrical & CCTV).", audience: "franchise" },
  { id: "space", question: "What space is required?", answer: "Kiosks need a minimum of 150 sq ft and work best in high-footfall locations like IT parks, colleges, gated communities, commercial areas and food courts. Social Cafes are recommended at 300 – 500 sq ft for a comfortable customer seating, efficient kitchen workflow and standard brand ambience.", audience: "franchise" },
  { id: "support", question: "What franchise support does INKOTEA provide?", answer: "End-to-end: setup guidance and initial training, standardized recipes and menu planning, branding & marketing direction, raw material supply support, and ongoing franchise operations guidance from a dedicated team.", audience: "franchise" },
  { id: "breakeven", question: "What is the typical break-even period?", answer: "Many kiosk locations target investment recovery in 8 – 10 months. Cafes typically see break-even between 12 – 18 months, varying by location, footfall and execution.", audience: "franchise" },
  { id: "experience", question: "Do I need prior F&B experience?", answer: "No. Training and operational guidance are provided. INKOTEA's standardized recipes and SOPs are designed specifically for first-time entrepreneurs — we've onboarded working professionals, homemakers, women entrepreneurs and existing vendors with no prior F&B background.", audience: "franchise" },
  { id: "location", question: "Will INKOTEA help me find a location?", answer: "Yes. Our team evaluates shortlisted sites based on footfall, competition, visibility and cost economics before sign-off. Quality of site is critical to success — we do not approve every location.", audience: "franchise" },
  { id: "staffing", question: "How many staff do I need?", answer: "A kiosk runs efficiently with a minimum of 2 employees. A Social Cafe typically operates with 3 – 5 staff depending on footfall and seating capacity.", audience: "franchise" },
  { id: "you-provide", question: "What do I (the franchisee) need to provide?", answer: "Shop interiors & counter setup, electrical/gas/water connections, furniture & seating, daily consumables (milk, lemon, ginger), staff hiring, and the food license & local permissions. INKOTEA covers the brand, training, recipes, branding and equipment supply.", audience: "franchise" },
  { id: "monthly-revenue", question: "What monthly revenue and profit can a Social Cafe expect?", answer: "Indicative ranges (subject to location and execution): daily sales ₹18,000 – ₹30,000+, monthly revenue ₹5.5L – ₹7.5L, and estimated monthly profit ₹1L – ₹1.5L. These are illustrative and not guaranteed.", audience: "franchise" },
  { id: "kiosk-revenue", question: "What daily sales can an INKOTEA Kiosk target?", answer: "Indicative daily gross sales of ₹5,000 – ₹15,000+ depending on footfall and operations. This is illustrative — actual results vary based on location and execution.", audience: "franchise" },
  { id: "ops", question: "How are daily operations managed?", answer: "Each outlet follows a standardized SOP covering opening checks, prep schedules, hygiene protocols, billing and closing. Inventory and supplies are managed via a central app and audit cadence.", audience: "franchise" },
  { id: "products", question: "What products do INKOTEA outlets offer?", answer: "Signature teas (Desi Dum, Masala, Elaichi, Kashmiri, Ginger), coffee & health drinks (Instant Coffee, Ragi Java, Boost, Horlicks), modern beverages (mojitos, flavored teas, milkshakes, seasonal specials) and quick comfort bites (Osmania biscuits, Oreo snacks, Maggi, light eatery items). Cafes carry an extended menu including grilled sandwiches and desserts.", audience: "customer" },
  { id: "format", question: "Are INKOTEA outlets dine-in or takeaway?", answer: "Both. Kiosks are quick-service takeaway formats. Social Cafes are designed as dine-in social spaces with seating, work-friendly tables, and outdoor options at select highway locations.", audience: "customer" },
  { id: "consistency", question: "Is the experience standardized across outlets?", answer: "Yes. Every INKOTEA outlet follows centrally defined recipes, hygiene protocols and brand guidelines. Customers can expect the same Desi Dum Chai whether they walk into Hitech City or RK Beach.", audience: "customer" },
  { id: "name-meaning", question: "What does \"Inko\" mean?", answer: "Inko means \"One More\" in Telugu. Our motto celebrates the joy of that perfect cup you can't resist — \"The Feeling of One More.\" Founded in 2021 in Hyderabad, INKOTEA has grown to 40+ outlets bringing comfort, affordability and quality in every serving.", audience: "customer" },
];

export const SEED_TESTIMONIALS: TestimonialRow[] = [
  { id: "priya-hyderabad", name: "Priya S.", initials: "PS", city: "Hyderabad", quote: "The masala chai here tastes like home — rich, warm and perfectly spiced. It's become my daily stop after work.", image: "/brand/hero-chai-scene.jpeg", image_alt: "Steaming masala chai at an INKOTEA outlet", rating: 5, is_video: 0, video_url: "" },
  { id: "rahul-vijayawada", name: "Rahul M.", initials: "RM", city: "Vijayawada", quote: "INKOTEA's social cafe feels premium without the premium price. Great vibes, fast service and the filter coffee is outstanding.", image: "/brand/cafe-couple-coffee.jpeg", image_alt: "Couple enjoying coffee inside an INKOTEA social cafe", rating: 5, is_video: 1, video_url: "" },
  { id: "ananya-warangal", name: "Ananya K.", initials: "AK", city: "Warangal", quote: "My friends and I meet here every weekend. The iced tea and samosas are unbeatable — always fresh, always consistent.", image: "/brand/cafe-friends-chat.jpeg", image_alt: "Friends chatting over beverages at INKOTEA", rating: 5, is_video: 0, video_url: "" },
  { id: "karthik-guntur", name: "Karthik R.", initials: "KR", city: "Guntur", quote: "I was sceptical about a branded chai kiosk, but one cup changed my mind. Bold flavour, fair pricing and a queue that moves fast.", image: "/brand/kiosk-night-crowd.jpeg", image_alt: "Busy INKOTEA kiosk with customers at night", rating: 5, is_video: 1, video_url: "" },
  { id: "meera-vizag", name: "Meera D.", initials: "MD", city: "Visakhapatnam", quote: "The cafe interior is so inviting — warm lighting, clean space and staff who actually remember your order. Love the elaichi chai.", image: "/brand/cafe-interior-busy.jpeg", image_alt: "INKOTEA cafe interior with customers and warm lighting", rating: 5, is_video: 0, video_url: "" },
  { id: "suresh-karimnagar", name: "Suresh N.", initials: "SN", city: "Karimnagar", quote: "Outdoor seating, great chai and snacks that don't break the bank. INKOTEA nailed the neighbourhood hangout spot.", image: "/brand/cafe-outdoor-seating.jpeg", image_alt: "INKOTEA cafe with outdoor cane-chair seating", rating: 5, is_video: 0, video_url: "" },
];

export const SEED_BLOG_POSTS: BlogPostRow[] = [
  { slug: "why-india-is-falling-back-in-love-with-chai", title: "Why India Is Falling Back In Love With Chai", excerpt: "From street corners to luxury cafes, Indian chai is having a renaissance — and the data backs it up.", category: "tea-trends", author: "INKOTEA Editorial", published_at: "2026-04-22", reading_minutes: 5, cover: "/brand/chai-pour-neon.jpeg", body: "India consumes more than **1.1 million tonnes** of tea annually — but the way we drink it is changing. The chai stall isn't dying; it's getting upgraded.\n\n## The hybrid consumer\nToday's chai drinker wants the warmth of a roadside *kulhad* with the hygiene and consistency of a branded cafe. That's exactly the gap brands like INKOTEA are built to close.\n\n## Three forces driving the shift\n1. **Urban migration** — first-generation city dwellers crave familiar tastes in unfamiliar cities.\n2. **Cafe culture maturation** — Gen Z is comfortable spending ₹100+ on a beverage if the experience feels authentic.\n3. **Health-positioning** — masala chai is now seen as a wellness ritual, not just a drink.\n\n> \"Chai isn't a category. It's a mood.\" — INKOTEA founder Srinivas P. Mahendra\n\nThe next decade of Indian F&B belongs to brands that respect both the *feeling* of chai and the discipline of modern retail." },
  { slug: "kiosk-vs-cafe-which-franchise-model-fits-you", title: "Kiosk vs Cafe: Which Franchise Model Fits You?", excerpt: "A practical decision framework for choosing between a high-volume kiosk and an experience-led cafe.", category: "franchise", author: "Franchise Desk", published_at: "2026-04-10", reading_minutes: 7, cover: "/brand/kiosk-modern-yellow.jpeg", body: "Both INKOTEA franchise formats are profitable. But they reward very different operator profiles.\n\n## Choose **Kiosk** if you have:\n- Less than ₹4L to invest\n- A high-footfall location (transit, IT, college)\n- Hands-on operator energy\n- Patience for daily volume play\n\n## Choose **Cafe** if you have:\n- ₹6.5L+ to invest comfortably\n- A high-street or residential catchment\n- Interest in building a brand asset\n- Tolerance for a 12–18 month break-even\n\nThe smartest INKOTEA partners often start with a kiosk, prove the unit economics in their city, then graduate to a cafe in the same catchment." },
  { slug: "the-economics-of-a-3-lakh-tea-business", title: "The Economics of a ₹3 Lakh Tea Business", excerpt: "We break down the actual P&L of an INKOTEA kiosk — revenue, costs, margins, and the path to break-even.", category: "entrepreneurship", author: "INKOTEA Editorial", published_at: "2026-03-28", reading_minutes: 8, cover: "/brand/kiosk-customer-banner.jpeg", body: "Most aspiring entrepreneurs overestimate revenue and underestimate costs. Here's the honest math behind a tea kiosk.\n\n## Daily revenue (illustrative)\n| Category | Cups/Day | Avg Price | Revenue |\n|---|---|---|---|\n| Signature Tea | 200 | ₹25 | ₹5,000 |\n| Coffee | 60 | ₹50 | ₹3,000 |\n| Coolers & Shakes | 30 | ₹100 | ₹3,000 |\n| Snacks | 40 | ₹50 | ₹2,000 |\n| **Total** | | | **₹13,000** |\n\n## Monthly P&L outline\n- Gross revenue: ~₹3.9L\n- COGS (35%): ~₹1.36L\n- Rent + utilities: ~₹40K\n- Staff (2): ~₹35K\n- Net profit: **₹1L – ₹1.5L**\n\nNumbers vary by location. Some INKOTEA kiosks recover their investment in **8 months**." },
  { slug: "designing-a-cafe-people-actually-stay-in", title: "Designing a Cafe People Actually Stay In", excerpt: "Five interior principles we apply across every INKOTEA Social Cafe — and why they drive ticket size.", category: "cafe-culture", author: "Design Studio", published_at: "2026-03-15", reading_minutes: 6, cover: "/brand/cafe-interior-busy.jpeg", body: "Dwell time is the single biggest lever in cafe economics. The longer customers stay, the more they spend.\n\n1. **Warm lighting** — never above 3000K\n2. **Mixed seating** — solo nooks + group tables\n3. **Charging access** — power at every table\n4. **Acoustic comfort** — soft surfaces, music at 60dB\n5. **Visible craft** — open prep area builds trust\n\nGet these right and your average ticket goes from ₹120 to ₹220 without changing the menu." },
  { slug: "from-one-kiosk-to-forty-outlets", title: "From One Kiosk to Forty Outlets: Our Story", excerpt: "A founder's-eye view of building INKOTEA from a single Hyderabad kiosk to a multi-city retail brand.", category: "brand", author: "Srinivas P. Mahendra", published_at: "2026-02-20", reading_minutes: 9, cover: "/brand/kiosk-night-crowd.jpeg", body: "When we opened our first kiosk in 2021, we had one rule: every cup must taste the same, every single day.\n\n## The first year\nWe made every chai ourselves. We fired three suppliers. We re-wrote the recipe seven times.\n\n## The franchise inflection\nAt outlet #6, we realized we weren't running a tea business — we were running a **systems** business. That's when INKOTEA became a franchise brand.\n\n## What's next\n40 outlets is just the start. The Social Cafe format is our bridge to becoming a national lifestyle brand." },
  { slug: "what-investors-look-for-in-an-fnb-franchise", title: "What Investors Look For In An F&B Franchise", excerpt: "A frank guide to the metrics, market positioning, and operator quality that determine franchise success.", category: "entrepreneurship", author: "Franchise Desk", published_at: "2026-02-05", reading_minutes: 6, cover: "/brand/cafe-friends-chat.jpeg", body: "Investing in an F&B franchise is part diligence, part instinct. Here's what serious operators look for.\n\n## The five non-negotiables\n- **Unit economics that work without subsidies**\n- **A repeatable training & SOP system**\n- **Supply chain control**\n- **Brand recall in target catchments**\n- **An operator playbook for the first 90 days**\n\nINKOTEA scores on all five — which is why our partner-renewal rate is above 90%." },
];

export const SEED_LEADS: LeadRow[] = [
  {
    id: "LEAD-A1B2C3D4",
    name: "Vikram Reddy",
    phone: "+91 98765 43210",
    city: "Hyderabad",
    email: "vikram.reddy@gmail.com",
    investment_range: "₹2.5L – ₹4L",
    model: "kiosk",
    message: "Interested in opening a kiosk near Gachibowli IT corridor. Have 180 sq ft shop ready.",
    source: "website-franchise",
    status: "new",
    created_at: "2026-06-01T09:15:00.000Z",
    updated_at: "2026-06-01T09:15:00.000Z",
  },
  {
    id: "LEAD-E5F6G7H8",
    name: "Lakshmi Devi",
    phone: "+91 91234 56789",
    city: "Warangal",
    email: "lakshmi.devi@outlook.com",
    investment_range: "₹6.5L – ₹10L",
    model: "cafe",
    message: "Looking to start a Social Cafe on Hanamkonda main road. First-time entrepreneur, need full guidance.",
    source: "website-franchise",
    status: "contacted",
    created_at: "2026-05-28T11:30:00.000Z",
    updated_at: "2026-05-29T14:00:00.000Z",
  },
  {
    id: "LEAD-I9J0K1L2",
    name: "Arjun Naidu",
    phone: "+91 99887 76655",
    city: "Vijayawada",
    email: null,
    investment_range: "₹2.5L – ₹4L",
    model: "kiosk",
    message: "College area near Benz Circle — high footfall location available.",
    source: "whatsapp",
    status: "qualified",
    created_at: "2026-05-25T08:45:00.000Z",
    updated_at: "2026-06-02T10:20:00.000Z",
  },
  {
    id: "LEAD-M3N4O5P6",
    name: "Sneha Patel",
    phone: "+91 87654 32109",
    city: "Visakhapatnam",
    email: "sneha.patel@yahoo.com",
    investment_range: "₹6.5L – ₹10L",
    model: "cafe",
    message: "Want to open near RK Beach. Can invest ₹8L. Please share cafe package details.",
    source: "website-contact",
    status: "new",
    created_at: "2026-06-03T16:00:00.000Z",
    updated_at: "2026-06-03T16:00:00.000Z",
  },
  {
    id: "LEAD-Q7R8S9T0",
    name: "Ramesh Kumar",
    phone: "+91 93456 78901",
    city: "Karimnagar",
    email: "ramesh.k@protonmail.com",
    investment_range: "₹2.5L – ₹4L",
    model: "kiosk",
    message: "Already running a small tea stall. Interested in converting to INKOTEA kiosk franchise.",
    source: "referral",
    status: "closed",
    created_at: "2026-05-15T07:00:00.000Z",
    updated_at: "2026-05-30T12:00:00.000Z",
  },
];

export interface SeedAdminAccount {
  email: string;
  name: string;
  /** Stored as-is in MongoDB. */
  password: string;
}

export const SEED_ADMIN_ACCOUNTS: SeedAdminAccount[] = [
  { email: "admin@inkotea.com", name: "INKOTEA Admin", password: "admin123" },
  { email: "franchise@inkotea.com", name: "Franchise Desk", password: "admin123" },
  { email: "operations@inkotea.com", name: "Operations Lead", password: "admin123" },
  { email: "marketing@inkotea.com", name: "Marketing Manager", password: "admin123" },
  { email: "support@inkotea.com", name: "Customer Support", password: "admin123" },
];
