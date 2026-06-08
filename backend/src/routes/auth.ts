import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { getDb } from "../db/index.js";
import { requireAuth, type AuthRequest } from "../middleware/auth.js";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const db = getDb();
  const admin = db
    .prepare("SELECT id, email, name, password_hash FROM admins WHERE email = ?")
    .get(email) as
    | { id: string; email: string; name: string; password_hash: string }
    | undefined;

  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
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
