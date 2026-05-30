import { buildPageMetadata } from "@/lib/seo";
import { Section } from "@/components/common/Section";
import { PageHero } from "@/components/common/PageHero";
import { BlogList } from "@/features/blog/BlogList";

export const metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Insights on India's chai culture, franchise economics, cafe trends and entrepreneurship — from the INKOTEA team.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Stories & Insights"
        title="Notes from the chai counter."
        description="Industry trends, franchise playbooks, cafe design notes, and founder reflections from the INKOTEA team."
      />
      <Section bgcolor="background.default">
        <BlogList />
      </Section>
    </>
  );
}
