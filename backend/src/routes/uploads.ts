import { Router } from "express";
import multer, { MulterError } from "multer";
import path from "node:path";
import { requireAuth } from "../middleware/auth.js";
import { UPLOAD_DIR, ensureUploadDirs } from "../lib/uploadsDir.js";

ensureUploadDirs();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    const safe = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    cb(null, safe);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

const router = Router();

router.post("/", requireAuth, (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      if (err instanceof MulterError && err.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({ error: "Image must be 5 MB or smaller" });
        return;
      }
      res.status(400).json({
        error: err instanceof Error ? err.message : "Upload failed",
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: "No image file provided" });
      return;
    }

    res.status(201).json({ url: `/uploads/${req.file.filename}` });
  });
});

export default router;
