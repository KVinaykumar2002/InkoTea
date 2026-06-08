import { Router } from "express";
import { getDb } from "../db/index.js";
import { requireAuth } from "../middleware/auth.js";
import type { TestimonialRow } from "../types.js";

const router = Router();

function mapTestimonial(row: TestimonialRow) {
  return {
    id: row.id,
    name: row.name,
    initials: row.initials,
    city: row.city,
    quote: row.quote,
    image: row.image,
    imageAlt: row.image_alt,
    rating: row.rating,
    isVideo: Boolean(row.is_video),
  };
}

router.get("/", (_req, res) => {
  const rows = getDb()
    .prepare("SELECT * FROM testimonials ORDER BY id")
    .all() as TestimonialRow[];
  res.json({ testimonials: rows.map(mapTestimonial) });
});

router.post("/", requireAuth, (req, res) => {
  const body = req.body as Record<string, unknown>;
  if (!body.id || !body.name || !body.quote) {
    res.status(400).json({ error: "id, name, and quote are required" });
    return;
  }

  getDb()
    .prepare(
      `INSERT INTO testimonials (id, name, initials, city, quote, image, image_alt, rating, is_video)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      body.id,
      body.name,
      body.initials || "",
      body.city || "",
      body.quote,
      body.image || "",
      body.imageAlt || "",
      Number(body.rating) || 5,
      body.isVideo ? 1 : 0,
    );

  const row = getDb()
    .prepare("SELECT * FROM testimonials WHERE id = ?")
    .get(body.id) as TestimonialRow;
  res.status(201).json({ testimonial: mapTestimonial(row) });
});

router.put("/:id", requireAuth, (req, res) => {
  const body = req.body as Record<string, unknown>;
  const result = getDb()
    .prepare(
      `UPDATE testimonials SET name=?, initials=?, city=?, quote=?, image=?, image_alt=?, rating=?, is_video=? WHERE id=?`,
    )
    .run(
      body.name,
      body.initials,
      body.city,
      body.quote,
      body.image,
      body.imageAlt,
      Number(body.rating) || 5,
      body.isVideo ? 1 : 0,
      req.params.id,
    );

  if (result.changes === 0) {
    res.status(404).json({ error: "Testimonial not found" });
    return;
  }

  const row = getDb()
    .prepare("SELECT * FROM testimonials WHERE id = ?")
    .get(req.params.id) as TestimonialRow;
  res.json({ testimonial: mapTestimonial(row) });
});

router.delete("/:id", requireAuth, (req, res) => {
  const result = getDb()
    .prepare("DELETE FROM testimonials WHERE id = ?")
    .run(req.params.id);
  if (result.changes === 0) {
    res.status(404).json({ error: "Testimonial not found" });
    return;
  }
  res.status(204).send();
});

export default router;
