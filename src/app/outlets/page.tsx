import { buildPageMetadata } from "@/lib/seo";
import { OutletsHero } from "@/features/outlets/OutletsHero";
import { OutletsExplorer } from "@/features/outlets/OutletsExplorer";
import { OutletsMap } from "@/features/outlets/OutletsMap";
import { OpenYourCityCTA } from "@/features/outlets/OpenYourCityCTA";

export const metadata = buildPageMetadata({
  title: "Outlets",
  description:
    "Browse INKOTEA outlets across Hyderabad, Warangal, Vijayawada, Visakhapatnam and beyond. Find the nearest tea kiosk or social café to you.",
  path: "/outlets",
});

export default function OutletsPage() {
  return (
    <>
      <OutletsHero />
      <OutletsExplorer />
      <OutletsMap />
      <OpenYourCityCTA />
    </>
  );
}
