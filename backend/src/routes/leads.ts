import { Router } from "express";
import { v4 as uuid } from "uuid";
import { getDb } from "../db/index.js";
import { requireAuth } from "../middleware/auth.js";
import type { LeadRow, LeadStatus } from "../types.js";

const router = Router();

function mapLead(row: LeadRow) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    city: row.city,
    email: row.email ?? undefined,
    investmentRange: row.investment_range ?? undefined,
    model: row.model ?? undefined,
    message: row.message ?? undefined,
    source: row.source,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

router.post("/", (req, res) => {
  const { name, phone, city, email, investmentRange, model, message, source } =
    req.body as Record<string, string | undefined>;

  if (!name?.trim() || !phone?.trim() || !city?.trim() || !source?.trim()) {
    res.status(400).json({ error: "name, phone, city, and source are required" });
    return;
  }

  const id = `LEAD-${uuid().slice(0, 8).toUpperCase()}`;
  const db = getDb();

  db.prepare(
    `INSERT INTO leads (id, name, phone, city, email, investment_range, model, message, source)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    id,
    name.trim(),
    phone.trim(),
    city.trim(),
    email?.trim() || null,
    investmentRange?.trim() || null,
    model?.trim() || null,
    message?.trim() || null,
    source.trim(),
  );

  res.status(201).json({
    ok: true,
    id,
    message:
      "Thanks for reaching out. Our franchise team will contact you within 24 hours.",
  });
});

router.get("/", requireAuth, (req, res) => {
  const { status, source, search } = req.query;
  const db = getDb();
  const conditions: string[] = [];
  const params: string[] = [];

  if (typeof status === "string" && status) {
    conditions.push("status = ?");
    params.push(status);
  }
  if (typeof source === "string" && source) {
    conditions.push("source = ?");
    params.push(source);
  }
  if (typeof search === "string" && search) {
    conditions.push(
      "(name LIKE ? OR phone LIKE ? OR city LIKE ? OR email LIKE ?)",
    );
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const rows = db
    .prepare(`SELECT * FROM leads ${where} ORDER BY created_at DESC`)
    .all(...params) as LeadRow[];

  res.json({ leads: rows.map(mapLead) });
});

router.get("/:id", requireAuth, (req, res) => {
  const row = getDb()
    .prepare("SELECT * FROM leads WHERE id = ?")
    .get(req.params.id) as LeadRow | undefined;

  if (!row) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  res.json({ lead: mapLead(row) });
});

router.patch("/:id", requireAuth, (req, res) => {
  const { status } = req.body as { status?: LeadStatus };
  const valid: LeadStatus[] = ["new", "contacted", "qualified", "closed"];

  if (!status || !valid.includes(status)) {
    res.status(400).json({ error: "Valid status is required" });
    return;
  }

  const db = getDb();
  const result = db
    .prepare(
      "UPDATE leads SET status = ?, updated_at = datetime('now') WHERE id = ?",
    )
    .run(status, req.params.id);

  if (result.changes === 0) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  const row = db
    .prepare("SELECT * FROM leads WHERE id = ?")
    .get(req.params.id) as LeadRow;
  res.json({ lead: mapLead(row) });
});

router.delete("/:id", requireAuth, (req, res) => {
  const result = getDb()
    .prepare("DELETE FROM leads WHERE id = ?")
    .run(req.params.id);

  if (result.changes === 0) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  res.status(204).send();
});

export default router;
