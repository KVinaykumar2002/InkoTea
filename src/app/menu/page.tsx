import { buildPageMetadata } from "@/lib/seo";
import { MenuHero } from "@/features/menu/MenuHero";
import { CategoryNav } from "@/features/menu/CategoryNav";
import { MenuCategorySection } from "@/features/menu/MenuCategorySection";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menu";
import { FranchiseCTASection } from "@/features/home/FranchiseCTASection";

export const metadata = buildPageMetadata({
  title: "Menu",
  description:
    "INKOTEA's signature teas, premium coffee, social beverages and comfort bites — crafted for everyday moments.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <>
      <MenuHero />
      <CategoryNav />
      {MENU_CATEGORIES.map((category, idx) => (
        <MenuCategorySection
          key={category.key}
          category={category}
          items={MENU_ITEMS.filter((m) => m.category === category.key)}
          bgcolor={idx % 2 === 0 ? "background.default" : "background.paper"}
        />
      ))}
      <FranchiseCTASection />
    </>
  );
}
