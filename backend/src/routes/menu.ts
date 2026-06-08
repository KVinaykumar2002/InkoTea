import { Router } from "express";
import { getCollection } from "../db/index.js";
import { requireAuth } from "../middleware/auth.js";
import type { MenuCategoryRow, MenuItemRow } from "../types.js";

const router = Router();

function mapCategory(row: MenuCategoryRow) {
  return {
    key: row.key,
    label: row.label,
    shortLabel: row.short_label,
    description: row.description,
    priceRange: row.price_range,
  };
}

function mapItem(row: MenuItemRow) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
    priceRange: row.price_range,
    image: row.image,
    isBestSeller: Boolean(row.is_best_seller),
  };
}

router.get("/", async (_req, res) => {
  const categories = await getCollection<MenuCategoryRow>("menu_categories")
    .find({})
    .sort({ key: 1 })
    .toArray();
  const items = await getCollection<MenuItemRow>("menu_items")
    .find({})
    .sort({ category: 1, name: 1 })
    .toArray();

  res.json({
    categories: categories.map(mapCategory),
    items: items.map(mapItem),
  });
});

router.put("/categories/:key", requireAuth, async (req, res) => {
  const { label, shortLabel, description, priceRange } = req.body as Record<
    string,
    string
  >;
  const result = await getCollection<MenuCategoryRow>(
    "menu_categories",
  ).updateOne(
    { key: req.params.key },
    {
      $set: {
        label,
        short_label: shortLabel,
        description,
        price_range: priceRange,
      },
    },
  );

  if (result.matchedCount === 0) {
    res.status(404).json({ error: "Category not found" });
    return;
  }
  res.json({ ok: true });
});

router.post("/items", requireAuth, async (req, res) => {
  const { id, name, category, description, priceRange, image, isBestSeller } =
    req.body as Record<string, unknown>;

  if (!id || !name || !category) {
    res.status(400).json({ error: "id, name, and category are required" });
    return;
  }

  const item: MenuItemRow = {
    id: String(id),
    name: String(name),
    category: String(category),
    description: String(description || ""),
    price_range: String(priceRange || ""),
    image: String(image || ""),
    is_best_seller: isBestSeller ? 1 : 0,
  };

  await getCollection<MenuItemRow>("menu_items").insertOne(item);
  res.status(201).json({ item: mapItem(item) });
});

router.put("/items/:id", requireAuth, async (req, res) => {
  const { name, category, description, priceRange, image, isBestSeller } =
    req.body as Record<string, unknown>;

  const result = await getCollection<MenuItemRow>("menu_items").updateOne(
    { id: req.params.id },
    {
      $set: {
        name: String(name),
        category: String(category),
        description: String(description),
        price_range: String(priceRange),
        image: String(image),
        is_best_seller: isBestSeller ? 1 : 0,
      },
    },
  );

  if (result.matchedCount === 0) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  const row = await getCollection<MenuItemRow>("menu_items").findOne({
    id: req.params.id,
  });
  res.json({ item: mapItem(row!) });
});

router.delete("/items/:id", requireAuth, async (req, res) => {
  const result = await getCollection<MenuItemRow>("menu_items").deleteOne({
    id: req.params.id,
  });
  if (result.deletedCount === 0) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.status(204).send();
});

export default router;
