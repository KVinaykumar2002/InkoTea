import { Router } from "express";
import { v4 as uuid } from "uuid";
import { getCollection } from "../db/index.js";
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

router.post("/", async (req, res) => {
  const { name, phone, city, email, investmentRange, model, message, source } =
    req.body as Record<string, string | undefined>;

  if (!name?.trim() || !phone?.trim() || !city?.trim() || !source?.trim()) {
    res.status(400).json({ error: "name, phone, city, and source are required" });
    return;
  }

  const id = `LEAD-${uuid().slice(0, 8).toUpperCase()}`;
  const now = new Date().toISOString();

  await getCollection<LeadRow>("leads").insertOne({
    id,
    name: name.trim(),
    phone: phone.trim(),
    city: city.trim(),
    email: email?.trim() || null,
    investment_range: investmentRange?.trim() || null,
    model: model?.trim() || null,
    message: message?.trim() || null,
    source: source.trim(),
    status: "new",
    created_at: now,
    updated_at: now,
  });

  res.status(201).json({
    ok: true,
    id,
    message:
      "Thanks for reaching out. Our franchise team will contact you within 24 hours.",
  });
});

router.get("/", requireAuth, async (req, res) => {
  const { status, source, search } = req.query;
  const filter: Record<string, unknown> = {};

  if (typeof status === "string" && status) {
    filter.status = status;
  }
  if (typeof source === "string" && source) {
    filter.source = source;
  }
  if (typeof search === "string" && search) {
    const regex = new RegExp(search, "i");
    filter.$or = [
      { name: regex },
      { phone: regex },
      { city: regex },
      { email: regex },
    ];
  }

  const rows = await getCollection<LeadRow>("leads")
    .find(filter)
    .sort({ created_at: -1 })
    .toArray();

  res.json({ leads: rows.map(mapLead) });
});

router.get("/:id", requireAuth, async (req, res) => {
  const row = await getCollection<LeadRow>("leads").findOne({
    id: req.params.id,
  });

  if (!row) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  res.json({ lead: mapLead(row) });
});

router.patch("/:id", requireAuth, async (req, res) => {
  const { status } = req.body as { status?: LeadStatus };
  const valid: LeadStatus[] = ["new", "contacted", "qualified", "closed"];

  if (!status || !valid.includes(status)) {
    res.status(400).json({ error: "Valid status is required" });
    return;
  }

  const result = await getCollection<LeadRow>("leads").updateOne(
    { id: req.params.id },
    { $set: { status, updated_at: new Date().toISOString() } },
  );

  if (result.matchedCount === 0) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  const row = await getCollection<LeadRow>("leads").findOne({
    id: req.params.id,
  });
  res.json({ lead: mapLead(row!) });
});

router.delete("/:id", requireAuth, async (req, res) => {
  const result = await getCollection<LeadRow>("leads").deleteOne({
    id: req.params.id,
  });

  if (result.deletedCount === 0) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  res.status(204).send();
});

export default router;
