import type { Metadata } from "next";
import { BRAND } from "./brand";

interface PageSeoInput {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

/**
 * Build a Metadata object with sensible OG/Twitter defaults.
 * Use inside a route segment's `generateMetadata` or `metadata` export.
 */
export const buildPageMetadata = ({
  title,
  description,
  path = "/",
  image,
}: PageSeoInput): Metadata => {
  const fullTitle = title.includes(BRAND.name)
    ? title
    : `${title} | ${BRAND.name}`;
  const desc = description ?? BRAND.shortDescription;
  const url = `${BRAND.siteUrl}${path}`;
  const ogImage =
    image ??
    "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1600&q=70";

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(BRAND.siteUrl),
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: BRAND.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: BRAND.name }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
  };
};
