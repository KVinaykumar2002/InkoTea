import type { Outlet } from "@/types";
import { BRAND_IMAGES } from "@/lib/brandImages";

export const OUTLET_CITIES = [
  "Hyderabad",
  "Warangal",
  "Karimnagar",
  "Nizamabad",
  "Vijayawada",
  "Visakhapatnam",
  "Guntur",
] as const;

/**
 * Per-format pools of brand-owned outlet imagery. We don't yet have
 * real per-outlet photography, so each kiosk and café falls back to a
 * deterministic brand shot from its format pool — picked by hashing
 * the outlet id so the same outlet always renders with the same image
 * across sessions / devices.
 */
const KIOSK_POOL = [
  BRAND_IMAGES.kioskNightCrowd,
  BRAND_IMAGES.kioskDaylight,
  BRAND_IMAGES.kioskFoodcourt,
  BRAND_IMAGES.kioskModernYellow,
  BRAND_IMAGES.kioskStandaloneNight,
  BRAND_IMAGES.kioskCustomerBanner,
] as const;

const CAFE_POOL = [
  BRAND_IMAGES.cafeStorefrontNight,
  BRAND_IMAGES.cafeHeroSitSipSmile,
  BRAND_IMAGES.cafeOutdoorSeating,
  BRAND_IMAGES.cafeInteriorBusy,
  BRAND_IMAGES.cafeFriendsChat,
  BRAND_IMAGES.cafeCoupleCoffee,
] as const;

function hash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0;
  }
  return h;
}

function brandImageFor(type: "kiosk" | "cafe", id: string): string {
  const pool = type === "kiosk" ? KIOSK_POOL : CAFE_POOL;
  return pool[hash(id) % pool.length];
}

const outletsRaw: Omit<Outlet, "image">[] = [
  {
    id: "hyd-hitech",
    name: "INKOTEA Hitech City",
    city: "Hyderabad",
    area: "Hitech City",
    address: "Plot 42, Cyber Towers Rd, Madhapur, Hyderabad 500081",
    type: "cafe",
    mapsQuery: "Hitech City Hyderabad",
    openingYear: 2023,
  },
  {
    id: "hyd-kondapur",
    name: "INKOTEA Kondapur",
    city: "Hyderabad",
    area: "Kondapur",
    address: "Beside HDFC Bank, Kothaguda Junction, Kondapur, Hyderabad",
    type: "kiosk",
    mapsQuery: "Kondapur Hyderabad",
    openingYear: 2022,
  },
  {
    id: "hyd-gachibowli",
    name: "INKOTEA Gachibowli",
    city: "Hyderabad",
    area: "Gachibowli",
    address: "DLF Cyber City, Gachibowli, Hyderabad 500032",
    type: "cafe",
    mapsQuery: "Gachibowli Hyderabad",
    openingYear: 2024,
  },
  {
    id: "hyd-banjara",
    name: "INKOTEA Banjara Hills",
    city: "Hyderabad",
    area: "Banjara Hills",
    address: "Road No. 12, Banjara Hills, Hyderabad 500034",
    type: "cafe",
    mapsQuery: "Banjara Hills Hyderabad",
    openingYear: 2023,
  },
  {
    id: "hyd-ameerpet",
    name: "INKOTEA Ameerpet",
    city: "Hyderabad",
    area: "Ameerpet",
    address: "Opp Maitrivanam, Ameerpet, Hyderabad 500038",
    type: "kiosk",
    mapsQuery: "Ameerpet Hyderabad",
    openingYear: 2022,
  },
  {
    id: "hyd-secunderabad",
    name: "INKOTEA Secunderabad",
    city: "Hyderabad",
    area: "Secunderabad",
    address: "MG Road, near Clock Tower, Secunderabad 500003",
    type: "kiosk",
    mapsQuery: "Secunderabad",
    openingYear: 2021,
  },
  {
    id: "wgl-hanamkonda",
    name: "INKOTEA Hanamkonda",
    city: "Warangal",
    area: "Hanamkonda",
    address: "Subedari, Hanamkonda, Warangal 506001",
    type: "kiosk",
    mapsQuery: "Hanamkonda Warangal",
    openingYear: 2023,
  },
  {
    id: "wgl-kuc",
    name: "INKOTEA Kazipet",
    city: "Warangal",
    area: "Kazipet",
    address: "KU Campus Road, Kazipet, Warangal",
    type: "kiosk",
    mapsQuery: "Kazipet Warangal",
    openingYear: 2024,
  },
  {
    id: "krm-tower",
    name: "INKOTEA Tower Circle",
    city: "Karimnagar",
    area: "Tower Circle",
    address: "Tower Circle Main Rd, Karimnagar 505001",
    type: "kiosk",
    mapsQuery: "Tower Circle Karimnagar",
    openingYear: 2024,
  },
  {
    id: "nzb-bus",
    name: "INKOTEA Nizamabad Bus Stand",
    city: "Nizamabad",
    area: "Bus Stand",
    address: "Bus Stand Main Rd, Nizamabad 503001",
    type: "kiosk",
    mapsQuery: "Nizamabad bus stand",
    openingYear: 2024,
  },
  {
    id: "vij-bezwada",
    name: "INKOTEA Bezwada",
    city: "Vijayawada",
    area: "Bezwada",
    address: "MG Road, Bezwada, Vijayawada 520001",
    type: "cafe",
    mapsQuery: "Bezwada Vijayawada",
    openingYear: 2025,
  },
  {
    id: "vij-bhavanipuram",
    name: "INKOTEA Bhavanipuram",
    city: "Vijayawada",
    area: "Bhavanipuram",
    address: "Bhavanipuram Main Rd, Vijayawada 520012",
    type: "kiosk",
    mapsQuery: "Bhavanipuram Vijayawada",
    openingYear: 2024,
  },
  {
    id: "vsp-mvp",
    name: "INKOTEA MVP Colony",
    city: "Visakhapatnam",
    area: "MVP Colony",
    address: "Sector 2, MVP Colony, Visakhapatnam 530017",
    type: "cafe",
    mapsQuery: "MVP Colony Visakhapatnam",
    openingYear: 2025,
  },
  {
    id: "vsp-rkbeach",
    name: "INKOTEA RK Beach",
    city: "Visakhapatnam",
    area: "RK Beach",
    address: "Beach Road, RK Beach, Visakhapatnam 530002",
    type: "cafe",
    mapsQuery: "RK Beach Visakhapatnam",
    openingYear: 2025,
  },
  {
    id: "gnt-arundelpet",
    name: "INKOTEA Arundelpet",
    city: "Guntur",
    area: "Arundelpet",
    address: "5/1 Arundelpet, Guntur 522002",
    type: "kiosk",
    mapsQuery: "Arundelpet Guntur",
    openingYear: 2024,
  },
];

export const OUTLETS: Outlet[] = outletsRaw.map((outlet) => ({
  ...outlet,
  image: brandImageFor(outlet.type, outlet.id),
}));
