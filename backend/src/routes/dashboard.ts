import { Router } from "express";
import { getDb } from "../db/index.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/stats", requireAuth, (_req, res) => {
  const db = getDb();

  const leadStats = db
    .prepare(
      `SELECT status, COUNT(*) as count FROM leads GROUP BY status`,
    )
    .all() as { status: string; count: number }[];

  const totalLeads = db
    .prepare("SELECT COUNT(*) as count FROM leads")
    .get() as { count: number };

  const recentLeads = db
    .prepare(
      `SELECT id, name, phone, city, source, status, created_at FROM leads ORDER BY created_at DESC LIMIT 5`,
    )
    .all();

  const contentCounts = {
    outlets: (db.prepare("SELECT COUNT(*) as c FROM outlets").get() as { c: number }).c,
    menuItems: (db.prepare("SELECT COUNT(*) as c FROM menu_items").get() as { c: number }).c,
    blogPosts: (db.prepare("SELECT COUNT(*) as c FROM blog_posts").get() as { c: number }).c,
    faqs: (db.prepare("SELECT COUNT(*) as c FROM faqs").get() as { c: number }).c,
    testimonials: (db.prepare("SELECT COUNT(*) as c FROM testimonials").get() as { c: number }).c,
  };

  res.json({
    leads: {
      total: totalLeads.count,
      byStatus: Object.fromEntries(
        leadStats.map((s) => [s.status, s.count]),
      ),
      recent: recentLeads,
    },
    content: contentCounts,
  });
});

export default router;
