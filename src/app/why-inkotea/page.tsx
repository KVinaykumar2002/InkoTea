import { buildPageMetadata } from "@/lib/seo";
import { WhyHero } from "@/features/why/WhyHero";
import { MarketGapSection } from "@/features/why/MarketGapSection";
import { USPGrid } from "@/features/why/USPGrid";
import { CompetitorTable } from "@/features/why/CompetitorTable";
import { FranchiseCTASection } from "@/features/home/FranchiseCTASection";

export const metadata = buildPageMetadata({
  title: "Why INKOTEA",
  description:
    "Why INKOTEA is the middle revolution in India's tea retail — how we compare to Tea Time, Chaayos and Madras Filter Coffee.",
  path: "/why-inkotea",
});

export default function WhyInkoteaPage() {
  return (
    <>
      <WhyHero />
      <MarketGapSection />
      <USPGrid />
      <CompetitorTable />
      <FranchiseCTASection />
    </>
  );
}
