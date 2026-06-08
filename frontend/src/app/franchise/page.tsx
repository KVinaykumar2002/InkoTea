import { buildPageMetadata } from "@/lib/seo";
import { FranchiseHero } from "@/features/franchise/FranchiseHero";
import { ModelComparison } from "@/features/franchise/ModelComparison";
// import { KioskInvestmentBreakdown } from "@/features/franchise/KioskInvestmentBreakdown";
// import { UnitEconomics } from "@/features/franchise/UnitEconomics";
import { WhatYouGetProvide } from "@/features/franchise/WhatYouGetProvide";
import { SupportSystem } from "@/features/franchise/SupportSystem";
import { WhyFormatWorks } from "@/features/franchise/WhyFormatWorks";
export const metadata = buildPageMetadata({
  title: "Franchise Opportunity",
  description:
    "Start your own INKOTEA tea kiosk from ₹2.5L or a Social Cafe from ₹6.5L. Compare models, see investment breakdowns, unit economics and what's included vs not.",
  path: "/franchise",
});

export default function FranchisePage() {
  return (
    <>
      <FranchiseHero />
      <ModelComparison />
      {/* <KioskInvestmentBreakdown /> */}
      {/* <UnitEconomics /> */}
      <WhatYouGetProvide />
      <SupportSystem />
      <WhyFormatWorks />
      {/* <FranchiseForm /> */}
    </>
  );
}
