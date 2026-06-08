import { Router } from "express";
import { getDb } from "../db/index.js";
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

router.get("/", (_req, res) => {
  const rows = getDb()
    .prepare("SELECT * FROM blog_posts ORDER BY published_at DESC")
    .all() as BlogPostRow[];
  res.json({ posts: rows.map(mapPost) });
});

router.get("/:slug", (req, res) => {
  const row = getDb()
    .prepare("SELECT * FROM blog_posts WHERE slug = ?")
    .get(req.params.slug) as BlogPostRow | undefined;

  if (!row) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.json({ post: mapPost(row) });
});

router.post("/", requireAuth, (req, res) => {
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

  getDb()
    .prepare(
      `INSERT INTO blog_posts (slug, title, excerpt, category, author, published_at, reading_minutes, cover, body)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      body.slug,
      body.title,
      body.excerpt,
      body.category,
      body.author,
      body.publishedAt,
      Number(body.readingMinutes),
      body.cover,
      body.body,
    );

  const row = getDb()
    .prepare("SELECT * FROM blog_posts WHERE slug = ?")
    .get(body.slug) as BlogPostRow;
  res.status(201).json({ post: mapPost(row) });
});

router.put("/:slug", requireAuth, (req, res) => {
  const body = req.body as Record<string, unknown>;
  const result = getDb()
    .prepare(
      `UPDATE blog_posts SET title=?, excerpt=?, category=?, author=?, published_at=?, reading_minutes=?, cover=?, body=? WHERE slug=?`,
    )
    .run(
      body.title,
      body.excerpt,
      body.category,
      body.author,
      body.publishedAt,
      Number(body.readingMinutes),
      body.cover,
      body.body,
      req.params.slug,
    );

  if (result.changes === 0) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  const row = getDb()
    .prepare("SELECT * FROM blog_posts WHERE slug = ?")
    .get(req.params.slug) as BlogPostRow;
  res.json({ post: mapPost(row) });
});

router.delete("/:slug", requireAuth, (req, res) => {
  const result = getDb()
    .prepare("DELETE FROM blog_posts WHERE slug = ?")
    .run(req.params.slug);
  if (result.changes === 0) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  res.status(204).send();
});

export default router;
