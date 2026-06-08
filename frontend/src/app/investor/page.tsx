import { buildPageMetadata } from "@/lib/seo";
import { InvestorHero } from "@/features/investor/InvestorHero";
import { MarketOpportunity } from "@/features/investor/MarketOpportunity";
import { BusinessModelDeck } from "@/features/investor/BusinessModelDeck";
import { RevenueStreams } from "@/features/investor/RevenueStreams";
import { RoadmapTimeline } from "@/features/investor/RoadmapTimeline";
import { FranchiseCTASection } from "@/features/home/FranchiseCTASection";

export const metadata = buildPageMetadata({
  title: "Investor Relations",
  description:
    "INKOTEA's market opportunity, business model, revenue streams and expansion roadmap — built for India's beverage retail boom.",
  path: "/investor",
});

export default function InvestorPage() {
  return (
    <>
      <InvestorHero />
      <MarketOpportunity />
      <BusinessModelDeck />
      <RevenueStreams />
      <RoadmapTimeline />
      <FranchiseCTASection />
    </>
  );
}
