import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Carlito } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { BRAND } from "@/lib/brand";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
});

const calibri = Carlito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-calibri",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.shortDescription,
  metadataBase: new URL(BRAND.siteUrl),
  applicationName: BRAND.name,
  keywords: [
    "tea franchise",
    "chai cafe",
    "kiosk franchise",
    "low investment business",
    "INKOTEA",
    "tea business India",
    "social cafe franchise",
    "Hyderabad franchise",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${calibri.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
