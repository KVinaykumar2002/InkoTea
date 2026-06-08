"use client";

import { MenuHero } from "@/features/menu/MenuHero";
import { CategoryNav } from "@/features/menu/CategoryNav";
import { MenuCategorySection } from "@/features/menu/MenuCategorySection";
import { FranchiseCTASection } from "@/features/home/FranchiseCTASection";
import { ContentState } from "@/components/common/ContentState";
import { useMenu } from "@/hooks/useApiContent";

export function ProductsContent() {
  const { data, loading, error } = useMenu();

  return (
    <>
      <MenuHero />
      <ContentState loading={loading} error={error} empty={!data?.categories?.length}>
        {() => (
          <>
            <CategoryNav categories={data!.categories} />
            {data!.categories.map((category, idx) => (
              <MenuCategorySection
                key={category.key}
                category={category}
                items={data!.items.filter((m) => m.category === category.key)}
                bgcolor={idx % 2 === 0 ? "background.default" : "background.paper"}
              />
            ))}
          </>
        )}
      </ContentState>
      <FranchiseCTASection />
    </>
  );
}
