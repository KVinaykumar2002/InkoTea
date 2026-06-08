import { BRAND_IMAGES } from "@/lib/brandImages";

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  city: string;
  quote: string;
  image: string;
  imageAlt: string;
  rating: number;
  /** Decorative play overlay — visual cue for video-style cards */
  isVideo?: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "priya-hyderabad",
    name: "Priya S.",
    initials: "PS",
    city: "Hyderabad",
    quote:
      "The masala chai here tastes like home — rich, warm and perfectly spiced. It's become my daily stop after work.",
    image: BRAND_IMAGES.heroChaiScene,
    imageAlt: "Steaming masala chai at an INKOTEA outlet",
    rating: 5,
  },
  {
    id: "rahul-vijayawada",
    name: "Rahul M.",
    initials: "RM",
    city: "Vijayawada",
    quote:
      "INKOTEA's social cafe feels premium without the premium price. Great vibes, fast service and the filter coffee is outstanding.",
    image: BRAND_IMAGES.cafeCoupleCoffee,
    imageAlt: "Couple enjoying coffee inside an INKOTEA social cafe",
    rating: 5,
    isVideo: true,
  },
  {
    id: "ananya-warangal",
    name: "Ananya K.",
    initials: "AK",
    city: "Warangal",
    quote:
      "My friends and I meet here every weekend. The iced tea and samosas are unbeatable — always fresh, always consistent.",
    image: BRAND_IMAGES.cafeFriendsChat,
    imageAlt: "Friends chatting over beverages at INKOTEA",
    rating: 5,
  },
  {
    id: "karthik-guntur",
    name: "Karthik R.",
    initials: "KR",
    city: "Guntur",
    quote:
      "I was sceptical about a branded chai kiosk, but one cup changed my mind. Bold flavour, fair pricing and a queue that moves fast.",
    image: BRAND_IMAGES.kioskNightCrowd,
    imageAlt: "Busy INKOTEA kiosk with customers at night",
    rating: 5,
    isVideo: true,
  },
  {
    id: "meera-vizag",
    name: "Meera D.",
    initials: "MD",
    city: "Visakhapatnam",
    quote:
      "The cafe interior is so inviting — warm lighting, clean space and staff who actually remember your order. Love the elaichi chai.",
    image: BRAND_IMAGES.cafeInteriorBusy,
    imageAlt: "INKOTEA cafe interior with customers and warm lighting",
    rating: 5,
  },
  {
    id: "suresh-karimnagar",
    name: "Suresh N.",
    initials: "SN",
    city: "Karimnagar",
    quote:
      "Outdoor seating, great chai and snacks that don't break the bank. INKOTEA nailed the neighbourhood hangout spot.",
    image: BRAND_IMAGES.cafeOutdoorSeating,
    imageAlt: "INKOTEA cafe with outdoor cane-chair seating",
    rating: 5,
  },
];
