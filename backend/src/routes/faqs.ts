import { Router } from "express";
import { getDb } from "../db/index.js";
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

router.get("/", (_req, res) => {
  const rows = getDb()
    .prepare("SELECT * FROM faqs ORDER BY id")
    .all() as FaqRow[];
  res.json({ faqs: rows.map(mapFaq) });
});

router.post("/", requireAuth, (req, res) => {
  const { id, question, answer, audience } = req.body as Record<string, string>;
  if (!id || !question || !answer || !audience) {
    res.status(400).json({ error: "id, question, answer, and audience are required" });
    return;
  }

  getDb()
    .prepare(
      "INSERT INTO faqs (id, question, answer, audience) VALUES (?, ?, ?, ?)",
    )
    .run(id, question, answer, audience);

  const row = getDb()
    .prepare("SELECT * FROM faqs WHERE id = ?")
    .get(id) as FaqRow;
  res.status(201).json({ faq: mapFaq(row) });
});

router.put("/:id", requireAuth, (req, res) => {
  const { question, answer, audience } = req.body as Record<string, string>;
  const result = getDb()
    .prepare("UPDATE faqs SET question=?, answer=?, audience=? WHERE id=?")
    .run(question, answer, audience, req.params.id);

  if (result.changes === 0) {
    res.status(404).json({ error: "FAQ not found" });
    return;
  }

  const row = getDb()
    .prepare("SELECT * FROM faqs WHERE id = ?")
    .get(req.params.id) as FaqRow;
  res.json({ faq: mapFaq(row) });
});

router.delete("/:id", requireAuth, (req, res) => {
  const result = getDb()
    .prepare("DELETE FROM faqs WHERE id = ?")
    .run(req.params.id);
  if (result.changes === 0) {
    res.status(404).json({ error: "FAQ not found" });
    return;
  }
  res.status(204).send();
});

export default router;
