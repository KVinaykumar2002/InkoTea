import { Router } from "express";
import { getDb } from "../db/index.js";
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

router.get("/", (_req, res) => {
  const db = getDb();
  const categories = db
    .prepare("SELECT * FROM menu_categories ORDER BY key")
    .all() as MenuCategoryRow[];
  const items = db
    .prepare("SELECT * FROM menu_items ORDER BY category, name")
    .all() as MenuItemRow[];

  res.json({
    categories: categories.map(mapCategory),
    items: items.map(mapItem),
  });
});

router.put("/categories/:key", requireAuth, (req, res) => {
  const { label, shortLabel, description, priceRange } = req.body as Record<
    string,
    string
  >;
  const result = getDb()
    .prepare(
      `UPDATE menu_categories SET label=?, short_label=?, description=?, price_range=? WHERE key=?`,
    )
    .run(label, shortLabel, description, priceRange, req.params.key);

  if (result.changes === 0) {
    res.status(404).json({ error: "Category not found" });
    return;
  }
  res.json({ ok: true });
});

router.post("/items", requireAuth, (req, res) => {
  const { id, name, category, description, priceRange, image, isBestSeller } =
    req.body as Record<string, unknown>;

  if (!id || !name || !category) {
    res.status(400).json({ error: "id, name, and category are required" });
    return;
  }

  getDb()
    .prepare(
      `INSERT INTO menu_items (id, name, category, description, price_range, image, is_best_seller)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      id,
      name,
      category,
      description || "",
      priceRange || "",
      image || "",
      isBestSeller ? 1 : 0,
    );

  const row = getDb()
    .prepare("SELECT * FROM menu_items WHERE id = ?")
    .get(id) as MenuItemRow;
  res.status(201).json({ item: mapItem(row) });
});

router.put("/items/:id", requireAuth, (req, res) => {
  const { name, category, description, priceRange, image, isBestSeller } =
    req.body as Record<string, unknown>;

  const result = getDb()
    .prepare(
      `UPDATE menu_items SET name=?, category=?, description=?, price_range=?, image=?, is_best_seller=? WHERE id=?`,
    )
    .run(
      name,
      category,
      description,
      priceRange,
      image,
      isBestSeller ? 1 : 0,
      req.params.id,
    );

  if (result.changes === 0) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  const row = getDb()
    .prepare("SELECT * FROM menu_items WHERE id = ?")
    .get(req.params.id) as MenuItemRow;
  res.json({ item: mapItem(row) });
});

router.delete("/items/:id", requireAuth, (req, res) => {
  const result = getDb()
    .prepare("DELETE FROM menu_items WHERE id = ?")
    .run(req.params.id);
  if (result.changes === 0) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.status(204).send();
});

export default router;
