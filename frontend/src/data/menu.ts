import type { MenuCategoryMeta, MenuItem } from "@/types";
import { pickMenuImage } from "@/lib/brandImages";

export const MENU_CATEGORIES: MenuCategoryMeta[] = [
  {
    key: "signature-tea",
    label: "Signature Tea",
    shortLabel: "Tea",
    description:
      "Hand-pounded ginger, cardamom and slow-brewed leaves — every cup tuned for that one more sip.",
    priceRange: "₹20 – ₹50",
  },
  {
    key: "coffee",
    label: "Coffee & Health",
    shortLabel: "Coffee",
    description:
      "Signature brews and wellness drinks — from filter coffee to ragi java and Boost.",
    priceRange: "₹40 – ₹180",
  },
  {
    key: "social-beverages",
    label: "Social Beverages",
    shortLabel: "Social",
    description:
      "Milkshakes, mojitos and seasonal coolers built for sharing tables and long chats.",
    priceRange: "₹80 – ₹140",
  },
  {
    key: "comfort-bites",
    label: "Comfort Bites",
    shortLabel: "Bites",
    description:
      "Osmania biscuits, Maggi bowls, savoury snacks and light meals — chai's best companions.",
    priceRange: "₹60 – ₹220",
  },
];

// We don't yet have per-item product photography from the brochure team, so
// each menu item resolves to a hand-picked Unsplash photo via
// `pickMenuImage` (see `MENU_ITEM_IMAGES` in `@/lib/brandImages`). Adding a
// new item here is free — if it's not in the per-item map it falls back to
// the category pool deterministically. When real product shots arrive,
// drop them under `/public/brand` and override the entry in the map.
const items: Omit<MenuItem, "image">[] = [
  {
    id: "desi-dum",
    name: "Desi Dum Chai",
    category: "signature-tea",
    description:
      "Slow-cooked over flame with milk reduction, hand-pounded ginger and a pinch of cardamom.",
    priceRange: "₹25 – ₹40",
    isBestSeller: true,
  },
  {
    id: "masala",
    name: "Masala Chai",
    category: "signature-tea",
    description:
      "Six-spice blend brewed to perfection — clove, cinnamon, fennel, pepper, cardamom & ginger.",
    priceRange: "₹20 – ₹35",
    isBestSeller: true,
  },
  {
    id: "elaichi",
    name: "Elaichi Chai",
    category: "signature-tea",
    description: "Crushed green cardamom infused into rich Assam tea milk.",
    priceRange: "₹25 – ₹35",
  },
  {
    id: "kashmiri",
    name: "Kashmiri Kahwa",
    category: "signature-tea",
    description:
      "Saffron, almond slivers and green tea — a warming Himalayan classic.",
    priceRange: "₹40 – ₹50",
  },
  {
    id: "ginger",
    name: "Ginger Kadak Chai",
    category: "signature-tea",
    description:
      "Maa-ke-haath ki ghar wali kadak — strong, gingery and unforgettable.",
    priceRange: "₹25 – ₹35",
  },
  {
    id: "filter-coffee",
    name: "South Indian Filter Coffee",
    category: "coffee",
    description:
      "Decoction percolated overnight, frothed with hot milk in a stainless tumbler.",
    priceRange: "₹40 – ₹60",
    isBestSeller: true,
  },
  {
    id: "cappuccino",
    name: "Signature Cappuccino",
    category: "coffee",
    description:
      "Double espresso with velvet steamed milk and a dusting of cocoa.",
    priceRange: "₹100 – ₹140",
  },
  {
    id: "latte",
    name: "Cardamom Latte",
    category: "coffee",
    description: "Espresso with cardamom-infused milk — INKOTEA's signature twist.",
    priceRange: "₹120 – ₹160",
  },
  {
    id: "ragi-java",
    name: "Ragi Java",
    category: "coffee",
    description: "Traditional millet-based wellness drink, slow-cooked & nourishing.",
    priceRange: "₹50 – ₹70",
  },
  {
    id: "boost",
    name: "Boost / Horlicks Hot",
    category: "coffee",
    description: "Childhood comfort in a cup — frothy, malty and warm.",
    priceRange: "₹40 – ₹60",
  },
  {
    id: "oreo-shake",
    name: "Oreo Milkshake",
    category: "social-beverages",
    description: "Crushed Oreo cookies blended with thick vanilla cream.",
    priceRange: "₹100 – ₹140",
    isBestSeller: true,
  },
  {
    id: "kitkat-shake",
    name: "KitKat Crush",
    category: "social-beverages",
    description: "Layered chocolate shake with KitKat chunks and whipped cream.",
    priceRange: "₹120 – ₹140",
  },
  {
    id: "mojito",
    name: "Virgin Mint Mojito",
    category: "social-beverages",
    description: "Muddled mint, lime, brown sugar and chilled soda.",
    priceRange: "₹80 – ₹100",
  },
  {
    id: "iced-tea",
    name: "Peach Iced Tea",
    category: "social-beverages",
    description: "Brewed black tea over ice with peach essence and a hint of lemon.",
    priceRange: "₹80 – ₹100",
  },
  {
    id: "osmania",
    name: "Osmania Biscuit",
    category: "comfort-bites",
    description: "Hyderabad's iconic crumbly tea biscuit — sweet, salty, melt-in-mouth.",
    priceRange: "₹15 – ₹30",
    isBestSeller: true,
  },
  {
    id: "maggi-bowl",
    name: "Cheesy Masala Maggi",
    category: "comfort-bites",
    description: "2-minute classic with cheese, onions, capsicum and INKOTEA tadka.",
    priceRange: "₹80 – ₹120",
  },
  {
    id: "samosa",
    name: "Crispy Samosa Plate",
    category: "comfort-bites",
    description: "Hand-folded, deep-fried, served hot with mint-tamarind chutney.",
    priceRange: "₹40 – ₹60",
  },
  {
    id: "sandwich",
    name: "Grilled Veg Sandwich",
    category: "comfort-bites",
    description: "Multigrain bread, fresh veggies, mint chutney, melted cheese.",
    priceRange: "₹120 – ₹180",
  },
  {
    id: "fries",
    name: "Peri-Peri Fries",
    category: "comfort-bites",
    description: "Crispy shoestring fries tossed in tangy peri-peri spice mix.",
    priceRange: "₹100 – ₹160",
  },
  {
    id: "chocolate-cake",
    name: "Chocolate Truffle Slice",
    category: "comfort-bites",
    description: "Dense chocolate sponge layered with dark ganache truffle.",
    priceRange: "₹140 – ₹220",
  },
];

export const MENU_ITEMS: MenuItem[] = items.map((item) => ({
  ...item,
  image: pickMenuImage(item.category, item.id),
}));
