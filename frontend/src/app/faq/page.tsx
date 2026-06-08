import { buildPageMetadata } from "@/lib/seo";
import { Section } from "@/components/common/Section";
import { PageHero } from "@/components/common/PageHero";
import { FAQAccordion } from "@/features/faq/FAQAccordion";
import { FranchiseCTASection } from "@/features/home/FranchiseCTASection";

export const metadata = buildPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to the most common questions about INKOTEA franchise opportunities, investment, support, and customer experience.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Help Center"
        title="Questions? We have answers."
        description="Everything you need to know about partnering with INKOTEA — from investment ranges to daily operations."
      />
      <Section bgcolor="background.default">
        <FAQAccordion />
      </Section>
      <FranchiseCTASection />
    </>
  );
}
