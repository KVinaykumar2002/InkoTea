import { buildPageMetadata } from "@/lib/seo";
import { ProductsContent } from "@/features/menu/ProductsContent";

export const metadata = buildPageMetadata({
  title: "Products",
  description:
    "INKOTEA's signature teas, premium coffee, social beverages and comfort bites — crafted for everyday moments.",
  path: "/products",
});

export default function ProductsPage() {
  return <ProductsContent />;
}
