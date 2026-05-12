import { buildPageMetadata } from "@/lib/seo";
import { FranchiseHero } from "@/features/franchise/FranchiseHero";
import { ModelComparison } from "@/features/franchise/ModelComparison";
import { InvestmentPackages } from "@/features/franchise/InvestmentPackages";
import { UnitEconomics } from "@/features/franchise/UnitEconomics";
import { SupportSystem } from "@/features/franchise/SupportSystem";
import { FranchiseForm } from "@/features/franchise/FranchiseForm";

export const metadata = buildPageMetadata({
  title: "Franchise Opportunity",
  description:
    "Start your own INKOTEA tea kiosk from ₹2.5L or a Social Café from ₹6.5L. Compare models, investment packages, unit economics and apply.",
  path: "/franchise",
});

export default function FranchisePage() {
  return (
    <>
      <FranchiseHero />
      <ModelComparison />
      <InvestmentPackages />
      <UnitEconomics />
      <SupportSystem />
      <FranchiseForm />
    </>
  );
}
