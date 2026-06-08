"use client";

import { MenuHero } from "@/features/menu/MenuHero";
import { CategoryNav } from "@/features/menu/CategoryNav";
import { MenuCategorySection } from "@/features/menu/MenuCategorySection";
import { FranchiseCTASection } from "@/features/home/FranchiseCTASection";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menu";
import { useMenu } from "@/hooks/useApiContent";

export function ProductsContent() {
  const { data } = useMenu({
    categories: MENU_CATEGORIES,
    items: MENU_ITEMS,
  });

  return (
    <>
      <MenuHero />
      <CategoryNav categories={data.categories} />
      {data.categories.map((category, idx) => (
        <MenuCategorySection
          key={category.key}
          category={category}
          items={data.items.filter((m) => m.category === category.key)}
          bgcolor={idx % 2 === 0 ? "background.default" : "background.paper"}
        />
      ))}
      <FranchiseCTASection />
    </>
  );
}
