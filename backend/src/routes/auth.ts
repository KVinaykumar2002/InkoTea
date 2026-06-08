import { Router } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { getCollection } from "../db/index.js";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const admin = await getCollection<{
    id: string;
    email: string;
    name: string;
    password: string;
  }>("admins").findOne({ email });

  if (!admin || admin.password !== password) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = jwt.sign(
    { sub: admin.id, email: admin.email, name: admin.name },
    config.jwtSecret,
    { expiresIn: "7d" },
  );

  res.json({
    token,
    user: { id: admin.id, email: admin.email, name: admin.name },
  });
});

router.get("/me", requireAuth, (req: AuthRequest, res) => {
  res.json({
    user: {
      id: req.admin!.sub,
      email: req.admin!.email,
      name: req.admin!.name,
    },
  });
});

export default router;
