import { Router } from "express";
import {
  DEFAULT_CONTACT_CONTENT,
  DEFAULT_FRANCHISE_CONTENT,
  DEFAULT_HERO_CONTENT,
  DEFAULT_SOCIAL_CONTENT,
  normalizeContactContent,
  normalizeFranchiseContent,
  normalizeHeroContent,
  normalizeSocialContent,
  type ContactPageContent,
  type FranchisePageContent,
  type HeroPageContent,
  type PageSlug,
  type SocialPageContent,
} from "../../../shared/pageContent.js";
import { getCollection } from "../db/index.js";
import { requireAuth } from "../middleware/auth.js";

interface PageContentRow {
  slug: PageSlug;
  content: HeroPageContent | ContactPageContent | FranchisePageContent | SocialPageContent;
  updated_at: string;
}

const router = Router();

const DEFAULTS: Record<PageSlug, PageContentRow["content"]> = {
  hero: DEFAULT_HERO_CONTENT,
  contact: DEFAULT_CONTACT_CONTENT,
  franchise: DEFAULT_FRANCHISE_CONTENT,
  social: DEFAULT_SOCIAL_CONTENT,
};

function isPageSlug(value: string): value is PageSlug {
  return (
    value === "hero" ||
    value === "contact" ||
    value === "franchise" ||
    value === "social"
  );
}

async function getOrSeedPage(slug: PageSlug): Promise<PageContentRow> {
  const collection = getCollection<PageContentRow>("page_content");
  const existing = await collection.findOne({ slug });
  if (existing) return existing;

  const row: PageContentRow = {
    slug,
    content: DEFAULTS[slug],
    updated_at: new Date().toISOString(),
  };
  await collection.insertOne(row);
  return row;
}

router.get("/:slug", async (req, res) => {
  const slug = String(req.params.slug);
  if (!isPageSlug(slug)) {
    res.status(404).json({ error: "Page not found" });
    return;
  }

  const row = await getOrSeedPage(slug);
  const content =
    slug === "hero"
      ? normalizeHeroContent(row.content)
      : slug === "contact"
        ? normalizeContactContent(row.content)
        : slug === "franchise"
          ? normalizeFranchiseContent(row.content)
          : slug === "social"
            ? normalizeSocialContent(row.content)
            : row.content;
  res.json({ slug: row.slug, content, updatedAt: row.updated_at });
});

router.put("/:slug", requireAuth, async (req, res) => {
  const slug = String(req.params.slug);
  if (!isPageSlug(slug)) {
    res.status(404).json({ error: "Page not found" });
    return;
  }

  const body = req.body as { content?: PageContentRow["content"] };
  if (!body.content || typeof body.content !== "object") {
    res.status(400).json({ error: "content object is required" });
    return;
  }

  const updatedAt = new Date().toISOString();
  const collection = getCollection<PageContentRow>("page_content");
  await collection.updateOne(
    { slug },
    {
      $set: { content: body.content, updated_at: updatedAt },
      $setOnInsert: { slug },
    },
    { upsert: true },
  );

  res.json({ slug, content: body.content, updatedAt });
});

export default router;
