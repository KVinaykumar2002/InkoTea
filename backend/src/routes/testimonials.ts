import { Router } from "express";
import { getCollection } from "../db/index.js";
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
    videoUrl: row.video_url || "",
  };
}

router.get("/", async (_req, res) => {
  const rows = await getCollection<TestimonialRow>("testimonials")
    .find({})
    .sort({ id: 1 })
    .toArray();
  res.json({ testimonials: rows.map(mapTestimonial) });
});

router.post("/", requireAuth, async (req, res) => {
  const body = req.body as Record<string, unknown>;
  if (!body.id || !body.name || !body.quote) {
    res.status(400).json({ error: "id, name, and quote are required" });
    return;
  }

  const testimonial: TestimonialRow = {
    id: String(body.id),
    name: String(body.name),
    initials: String(body.initials || ""),
    city: String(body.city || ""),
    quote: String(body.quote),
    image: String(body.image || ""),
    image_alt: String(body.imageAlt || ""),
    rating: Number(body.rating) || 5,
    is_video: body.isVideo ? 1 : 0,
    video_url: String(body.videoUrl || ""),
  };

  await getCollection<TestimonialRow>("testimonials").insertOne(testimonial);
  res.status(201).json({ testimonial: mapTestimonial(testimonial) });
});

router.put("/:id", requireAuth, async (req, res) => {
  const body = req.body as Record<string, unknown>;
  const result = await getCollection<TestimonialRow>("testimonials").updateOne(
    { id: req.params.id },
    {
      $set: {
        name: String(body.name),
        initials: String(body.initials),
        city: String(body.city),
        quote: String(body.quote),
        image: String(body.image),
        image_alt: String(body.imageAlt),
        rating: Number(body.rating) || 5,
        is_video: body.isVideo ? 1 : 0,
        video_url: String(body.videoUrl || ""),
      },
    },
  );

  if (result.matchedCount === 0) {
    res.status(404).json({ error: "Testimonial not found" });
    return;
  }

  const row = await getCollection<TestimonialRow>("testimonials").findOne({
    id: req.params.id,
  });
  res.json({ testimonial: mapTestimonial(row!) });
});

router.delete("/:id", requireAuth, async (req, res) => {
  const result = await getCollection<TestimonialRow>("testimonials").deleteOne({
    id: req.params.id,
  });
  if (result.deletedCount === 0) {
    res.status(404).json({ error: "Testimonial not found" });
    return;
  }
  res.status(204).send();
});

export default router;
