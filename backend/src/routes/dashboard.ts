import { Router } from "express";
import { getCollection } from "../db/index.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/stats", requireAuth, async (_req, res) => {
  const leads = getCollection("leads");

  const [leadStats, totalLeads, recentLeads, outlets, menuItems, blogPosts, faqs, testimonials] =
    await Promise.all([
      leads
        .aggregate<{ _id: string; count: number }>([
          { $group: { _id: "$status", count: { $sum: 1 } } },
        ])
        .toArray(),
      leads.countDocuments(),
      leads
        .find(
          {},
          {
            projection: {
              id: 1,
              name: 1,
              phone: 1,
              city: 1,
              source: 1,
              status: 1,
              created_at: 1,
            },
          },
        )
        .sort({ created_at: -1 })
        .limit(5)
        .toArray(),
      getCollection("outlets").countDocuments(),
      getCollection("menu_items").countDocuments(),
      getCollection("blog_posts").countDocuments(),
      getCollection("faqs").countDocuments(),
      getCollection("testimonials").countDocuments(),
    ]);

  res.json({
    leads: {
      total: totalLeads,
      byStatus: Object.fromEntries(
        leadStats.map((s) => [s._id, s.count]),
      ),
      recent: recentLeads,
    },
    content: {
      outlets,
      menuItems,
      blogPosts,
      faqs,
      testimonials,
    },
  });
});

export default router;
