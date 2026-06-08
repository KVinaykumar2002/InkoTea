import { Router } from "express";
import { getCollection } from "../db/index.js";
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

router.get("/", async (_req, res) => {
  const rows = await getCollection<OutletRow>("outlets")
    .find({})
    .sort({ city: 1, name: 1 })
    .toArray();
  const cities = [...new Set(rows.map((r) => r.city))].sort();
  res.json({ outlets: rows.map(mapOutlet), cities });
});

router.post("/", requireAuth, async (req, res) => {
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

  const outlet: OutletRow = {
    id: String(body.id),
    name: String(body.name),
    city: String(body.city),
    area: String(body.area),
    address: String(body.address),
    type: String(body.type),
    image: String(body.image),
    maps_query: String(body.mapsQuery),
    opening_year: Number(body.openingYear),
  };

  await getCollection<OutletRow>("outlets").insertOne(outlet);
  res.status(201).json({ outlet: mapOutlet(outlet) });
});

router.put("/:id", requireAuth, async (req, res) => {
  const body = req.body as Record<string, unknown>;
  const result = await getCollection<OutletRow>("outlets").updateOne(
    { id: req.params.id },
    {
      $set: {
        name: String(body.name),
        city: String(body.city),
        area: String(body.area),
        address: String(body.address),
        type: String(body.type),
        image: String(body.image),
        maps_query: String(body.mapsQuery),
        opening_year: Number(body.openingYear),
      },
    },
  );

  if (result.matchedCount === 0) {
    res.status(404).json({ error: "Outlet not found" });
    return;
  }

  const row = await getCollection<OutletRow>("outlets").findOne({
    id: req.params.id,
  });
  res.json({ outlet: mapOutlet(row!) });
});

router.delete("/:id", requireAuth, async (req, res) => {
  const result = await getCollection<OutletRow>("outlets").deleteOne({
    id: req.params.id,
  });
  if (result.deletedCount === 0) {
    res.status(404).json({ error: "Outlet not found" });
    return;
  }
  res.status(204).send();
});

export default router;
