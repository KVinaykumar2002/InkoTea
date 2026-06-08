import { Router } from "express";
import { getCollection } from "../db/index.js";
import { requireAuth } from "../middleware/auth.js";
import type { FaqRow } from "../types.js";

const router = Router();

function mapFaq(row: FaqRow) {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    audience: row.audience,
  };
}

router.get("/", async (_req, res) => {
  const rows = await getCollection<FaqRow>("faqs")
    .find({})
    .sort({ id: 1 })
    .toArray();
  res.json({ faqs: rows.map(mapFaq) });
});

router.post("/", requireAuth, async (req, res) => {
  const { id, question, answer, audience } = req.body as Record<string, string>;
  if (!id || !question || !answer || !audience) {
    res.status(400).json({ error: "id, question, answer, and audience are required" });
    return;
  }

  const faq: FaqRow = { id, question, answer, audience };
  await getCollection<FaqRow>("faqs").insertOne(faq);
  res.status(201).json({ faq: mapFaq(faq) });
});

router.put("/:id", requireAuth, async (req, res) => {
  const { question, answer, audience } = req.body as Record<string, string>;
  const result = await getCollection<FaqRow>("faqs").updateOne(
    { id: req.params.id },
    { $set: { question, answer, audience } },
  );

  if (result.matchedCount === 0) {
    res.status(404).json({ error: "FAQ not found" });
    return;
  }

  const row = await getCollection<FaqRow>("faqs").findOne({
    id: req.params.id,
  });
  res.json({ faq: mapFaq(row!) });
});

router.delete("/:id", requireAuth, async (req, res) => {
  const result = await getCollection<FaqRow>("faqs").deleteOne({
    id: req.params.id,
  });
  if (result.deletedCount === 0) {
    res.status(404).json({ error: "FAQ not found" });
    return;
  }
  res.status(204).send();
});

export default router;
