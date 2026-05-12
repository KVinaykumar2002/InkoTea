import type { MenuCategoryMeta, MenuItem } from "@/types";

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

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`;

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "desi-dum",
    name: "Desi Dum Chai",
    category: "signature-tea",
    description:
      "Slow-cooked over flame with milk reduction, hand-pounded ginger and a pinch of cardamom.",
    priceRange: "₹25 – ₹40",
    image: img("1576092768241-dec231879fc3"),
    isBestSeller: true,
  },
  {
    id: "masala",
    name: "Masala Chai",
    category: "signature-tea",
    description:
      "Six-spice blend brewed to perfection — clove, cinnamon, fennel, pepper, cardamom & ginger.",
    priceRange: "₹20 – ₹35",
    image: img("1571934811356-5cc061b6821f"),
    isBestSeller: true,
  },
  {
    id: "elaichi",
    name: "Elaichi Chai",
    category: "signature-tea",
    description: "Crushed green cardamom infused into rich Assam tea milk.",
    priceRange: "₹25 – ₹35",
    // Three orange chai cups on a black table — Aman Gupta on Unsplash
    image: img("1646294567230-b56cb0cd1f5b"),
  },
  {
    id: "kashmiri",
    name: "Kashmiri Kahwa",
    category: "signature-tea",
    description:
      "Saffron, almond slivers and green tea — a warming Himalayan classic.",
    priceRange: "₹40 – ₹50",
    // Clear glass cup of chai with sugar cubes — Nishaan ahmed on Unsplash
    image: img("1609670438772-9cf3afc5052b"),
  },
  {
    id: "ginger",
    name: "Ginger Kadak Chai",
    category: "signature-tea",
    description:
      "Maa-ke-haath ki ghar wali kadak — strong, gingery and unforgettable.",
    priceRange: "₹25 – ₹35",
    // Tea cup with lemon and ginger root — Kelly Sikkema on Unsplash
    image: img("1682530016992-d8a2f30b6dd6"),
  },
  {
    id: "filter-coffee",
    name: "South Indian Filter Coffee",
    category: "coffee",
    description:
      "Decoction percolated overnight, frothed with hot milk in a stainless tumbler.",
    priceRange: "₹40 – ₹60",
    image: img("1509042239860-f550ce710b93"),
    isBestSeller: true,
  },
  {
    id: "cappuccino",
    name: "Signature Cappuccino",
    category: "coffee",
    description:
      "Double espresso with velvet steamed milk and a dusting of cocoa.",
    priceRange: "₹100 – ₹140",
    image: img("1485808191679-5f86510681a2"),
  },
  {
    id: "latte",
    name: "Cardamom Latte",
    category: "coffee",
    description: "Espresso with cardamom-infused milk — INKOTEA's signature twist.",
    priceRange: "₹120 – ₹160",
    image: img("1461023058943-07fcbe16d735"),
  },
  {
    id: "ragi-java",
    name: "Ragi Java",
    category: "coffee",
    description: "Traditional millet-based wellness drink, slow-cooked & nourishing.",
    priceRange: "₹50 – ₹70",
    image: img("1517959105821-eaf2591984ca"),
  },
  {
    id: "boost",
    name: "Boost / Horlicks Hot",
    category: "coffee",
    description: "Childhood comfort in a cup — frothy, malty and warm.",
    priceRange: "₹40 – ₹60",
    image: img("1572490122747-3968b75cc699"),
  },
  {
    id: "oreo-shake",
    name: "Oreo Milkshake",
    category: "social-beverages",
    description: "Crushed Oreo cookies blended with thick vanilla cream.",
    priceRange: "₹100 – ₹140",
    image: img("1572490122747-3968b75cc699"),
    isBestSeller: true,
  },
  {
    id: "kitkat-shake",
    name: "KitKat Crush",
    category: "social-beverages",
    description: "Layered chocolate shake with KitKat chunks and whipped cream.",
    priceRange: "₹120 – ₹140",
    image: img("1481391319762-47dff72954d9"),
  },
  {
    id: "mojito",
    name: "Virgin Mint Mojito",
    category: "social-beverages",
    description: "Muddled mint, lime, brown sugar and chilled soda.",
    priceRange: "₹80 – ₹100",
    image: img("1437418747212-8d9709afab22"),
  },
  {
    id: "iced-tea",
    name: "Peach Iced Tea",
    category: "social-beverages",
    description: "Brewed black tea over ice with peach essence and a hint of lemon.",
    priceRange: "₹80 – ₹100",
    image: img("1556679343-c7306c1976bc"),
  },
  {
    id: "osmania",
    name: "Osmania Biscuit",
    category: "comfort-bites",
    description: "Hyderabad's iconic crumbly tea biscuit — sweet, salty, melt-in-mouth.",
    priceRange: "₹15 – ₹30",
    image: img("1568051243851-f9b136146e97"),
    isBestSeller: true,
  },
  {
    id: "maggi-bowl",
    name: "Cheesy Masala Maggi",
    category: "comfort-bites",
    description: "2-minute classic with cheese, onions, capsicum and INKOTEA tadka.",
    priceRange: "₹80 – ₹120",
    image: img("1612929633738-8fe44f7ec841"),
  },
  {
    id: "samosa",
    name: "Crispy Samosa Plate",
    category: "comfort-bites",
    description: "Hand-folded, deep-fried, served hot with mint-tamarind chutney.",
    priceRange: "₹40 – ₹60",
    image: img("1601050690597-df0568f70950"),
  },
  {
    id: "sandwich",
    name: "Grilled Veg Sandwich",
    category: "comfort-bites",
    description: "Multigrain bread, fresh veggies, mint chutney, melted cheese.",
    priceRange: "₹120 – ₹180",
    image: img("1539252554453-80ab65ce3586"),
  },
  {
    id: "fries",
    name: "Peri-Peri Fries",
    category: "comfort-bites",
    description: "Crispy shoestring fries tossed in tangy peri-peri spice mix.",
    priceRange: "₹100 – ₹160",
    image: img("1573080496219-bb080dd4f877"),
  },
  {
    id: "chocolate-cake",
    name: "Chocolate Truffle Slice",
    category: "comfort-bites",
    description: "Dense chocolate sponge layered with dark ganache truffle.",
    priceRange: "₹140 – ₹220",
    image: img("1578985545062-69928b1d9587"),
  },
];
