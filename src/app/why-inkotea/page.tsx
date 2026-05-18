import { buildPageMetadata } from "@/lib/seo";
import { WhyHero } from "@/features/why/WhyHero";
import { MarketGapSection } from "@/features/why/MarketGapSection";
import { USPGrid } from "@/features/why/USPGrid";
import { FranchiseCTASection } from "@/features/home/FranchiseCTASection";

export const metadata = buildPageMetadata({
  title: "Why INKOTEA",
  description:
    "Why INKOTEA is the middle revolution in India's tea retail — affordable premium chai with branded experience in formats that scale.",
  path: "/why-inkotea",
});

export default function WhyInkoteaPage() {
  return (
    <>
      <WhyHero />
      <MarketGapSection />
      <USPGrid />
      <FranchiseCTASection />
    </>
  );
}
