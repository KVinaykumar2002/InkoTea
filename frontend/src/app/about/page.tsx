import { buildPageMetadata } from "@/lib/seo";
import { StorySection } from "@/features/about/StorySection";
import { BrandPromisePillars } from "@/features/about/BrandPromisePillars";
import { JourneyTimeline } from "@/features/about/JourneyTimeline";
import { DifferenceCards } from "@/features/about/DifferenceCards";
import { VisionMissionPhilosophy } from "@/features/about/VisionMissionPhilosophy";
import { FounderSection } from "@/features/about/FounderSection";
import { CoFounderSection } from "@/features/about/CoFounderSection";

export const metadata = buildPageMetadata({
  title: "About INKOTEA",
  description:
    "From a single Hyderabad kiosk to 40+ outlets across Telangana — the story of how INKOTEA is structuring India's chai retail.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <StorySection />
      <BrandPromisePillars />
      <JourneyTimeline />
      <DifferenceCards />
      <VisionMissionPhilosophy />
      <FounderSection />
      <CoFounderSection />
    </>
  );
}
