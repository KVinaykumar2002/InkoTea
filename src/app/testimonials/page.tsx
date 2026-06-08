import { buildPageMetadata } from "@/lib/seo";
import { TestimonialsHero } from "@/features/testimonials/TestimonialsHero";
import { TestimonialsGrid } from "@/features/testimonials/TestimonialsGrid";

export const metadata = buildPageMetadata({
  title: "Testimonials",
  description:
    "Read what INKOTEA customers across Hyderabad, Vijayawada, Warangal and beyond say about our chai, coffee and cafe experience.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <TestimonialsHero />
      <TestimonialsGrid />
    </>
  );
}
