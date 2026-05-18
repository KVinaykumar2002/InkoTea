import { buildPageMetadata } from "@/lib/seo";
import { HeroSection } from "@/features/home/HeroSection";
import { StatsStrip } from "@/features/home/StatsStrip";
import { PositioningSection } from "@/features/home/PositioningSection";
import { ModelsPreview } from "@/features/home/ModelsPreview";
import { NearestOutletSection } from "@/features/home/NearestOutletSection";
import { ExperienceSection } from "@/features/home/ExperienceSection";
import { PressLogosStrip } from "@/features/home/PressLogosStrip";
import { FranchiseCTASection } from "@/features/home/FranchiseCTASection";
import { FloatingFranchiseEnquiry } from "@/components/layout/FloatingFranchiseEnquiry";

export const metadata = buildPageMetadata({
  title: "INKOTEA — The Feeling of One More",
  description:
    "India's chai culture, reimagined for today. Explore franchise opportunities and find your nearest INKOTEA outlet — kiosks from ₹2.5L, social cafés from ₹6.5L.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <PositioningSection />
      <ModelsPreview />
      <NearestOutletSection />
      <ExperienceSection />
      <PressLogosStrip />
      <FranchiseCTASection />
      <FloatingFranchiseEnquiry />
    </>
  );
}
