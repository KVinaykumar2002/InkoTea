import { Router } from "express";
import { getCollection } from "../db/index.js";
import { requireAuth } from "../middleware/auth.js";
import type { BlogPostRow } from "../types.js";

const router = Router();

function mapPost(row: BlogPostRow) {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    author: row.author,
    publishedAt: row.published_at,
    readingMinutes: row.reading_minutes,
    cover: row.cover,
    body: row.body,
  };
}

router.get("/", async (_req, res) => {
  const rows = await getCollection<BlogPostRow>("blog_posts")
    .find({})
    .sort({ published_at: -1 })
    .toArray();
  res.json({ posts: rows.map(mapPost) });
});

router.get("/:slug", async (req, res) => {
  const row = await getCollection<BlogPostRow>("blog_posts").findOne({
    slug: req.params.slug,
  });

  if (!row) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json({ post: mapPost(row) });
});

router.post("/", requireAuth, async (req, res) => {
  const body = req.body as Record<string, unknown>;
  const required = [
    "slug",
    "title",
    "excerpt",
    "category",
    "author",
    "publishedAt",
    "readingMinutes",
    "cover",
    "body",
  ];
  for (const key of required) {
    if (!body[key]) {
      res.status(400).json({ error: `${key} is required` });
      return;
    }
  }

  const post: BlogPostRow = {
    slug: String(body.slug),
    title: String(body.title),
    excerpt: String(body.excerpt),
    category: String(body.category),
    author: String(body.author),
    published_at: String(body.publishedAt),
    reading_minutes: Number(body.readingMinutes),
    cover: String(body.cover),
    body: String(body.body),
  };

  await getCollection<BlogPostRow>("blog_posts").insertOne(post);
  res.status(201).json({ post: mapPost(post) });
});

router.put("/:slug", requireAuth, async (req, res) => {
  const body = req.body as Record<string, unknown>;
  const result = await getCollection<BlogPostRow>("blog_posts").updateOne(
    { slug: req.params.slug },
    {
      $set: {
        title: String(body.title),
        excerpt: String(body.excerpt),
        category: String(body.category),
        author: String(body.author),
        published_at: String(body.publishedAt),
        reading_minutes: Number(body.readingMinutes),
        cover: String(body.cover),
        body: String(body.body),
      },
    },
  );

  if (result.matchedCount === 0) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  const row = await getCollection<BlogPostRow>("blog_posts").findOne({
    slug: req.params.slug,
  });
  res.json({ post: mapPost(row!) });
});

router.delete("/:slug", requireAuth, async (req, res) => {
  const result = await getCollection<BlogPostRow>("blog_posts").deleteOne({
    slug: req.params.slug,
  });
  if (result.deletedCount === 0) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.status(204).send();
});

export default router;
