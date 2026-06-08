import { Router } from "express";
import { getDb } from "../db/index.js";
import { requireAuth } from "../middleware/auth.js";
import type { OutletRow } from "../types.js";

const router = Router();

function mapOutlet(row: OutletRow) {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    area: row.area,
    address: row.address,
    type: row.type,
    image: row.image,
    mapsQuery: row.maps_query,
    openingYear: row.opening_year,
  };
}

router.get("/", (_req, res) => {
  const rows = getDb()
    .prepare("SELECT * FROM outlets ORDER BY city, name")
    .all() as OutletRow[];
  const cities = [...new Set(rows.map((r) => r.city))].sort();
  res.json({ outlets: rows.map(mapOutlet), cities });
});

router.post("/", requireAuth, (req, res) => {
  const body = req.body as Record<string, unknown>;
  const required = [
    "id",
    "name",
    "city",
    "area",
    "address",
    "type",
    "image",
    "mapsQuery",
    "openingYear",
  ];
  for (const key of required) {
    if (body[key] === undefined || body[key] === "") {
      res.status(400).json({ error: `${key} is required` });
      return;
    }
  }

  getDb()
    .prepare(
      `INSERT INTO outlets (id, name, city, area, address, type, image, maps_query, opening_year)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      body.id,
      body.name,
      body.city,
      body.area,
      body.address,
      body.type,
      body.image,
      body.mapsQuery,
      Number(body.openingYear),
    );

  const row = getDb()
    .prepare("SELECT * FROM outlets WHERE id = ?")
    .get(body.id) as OutletRow;
  res.status(201).json({ outlet: mapOutlet(row) });
});

router.put("/:id", requireAuth, (req, res) => {
  const body = req.body as Record<string, unknown>;
  const result = getDb()
    .prepare(
      `UPDATE outlets SET name=?, city=?, area=?, address=?, type=?, image=?, maps_query=?, opening_year=?
       WHERE id=?`,
    )
    .run(
      body.name,
      body.city,
      body.area,
      body.address,
      body.type,
      body.image,
      body.mapsQuery,
      Number(body.openingYear),
      req.params.id,
    );

  if (result.changes === 0) {
    res.status(404).json({ error: "Outlet not found" });
    return;
  }

  const row = getDb()
    .prepare("SELECT * FROM outlets WHERE id = ?")
    .get(req.params.id) as OutletRow;
  res.json({ outlet: mapOutlet(row) });
});

router.delete("/:id", requireAuth, (req, res) => {
  const result = getDb()
    .prepare("DELETE FROM outlets WHERE id = ?")
    .run(req.params.id);
  if (result.changes === 0) {
    res.status(404).json({ error: "Outlet not found" });
    return;
  }
  res.status(204).send();
});

export default router;
