import { Router } from "express";
import multer, { MulterError } from "multer";
import path from "node:path";
import { storeUpload } from "../lib/gridfs.js";
import { ensureUploadDirs } from "../lib/uploadsDir.js";
import { requireAuth } from "../middleware/auth.js";

ensureUploadDirs();

const MAX_UPLOAD_BYTES = 64 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_BYTES },
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image or video files are allowed"));
    }
  },
});

const router = Router();

router.post("/", requireAuth, (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      if (err instanceof MulterError && err.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({ error: "File must be 64 MB or smaller" });
        return;
      }
      res.status(400).json({
        error: err instanceof Error ? err.message : "Upload failed",
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    const ext = path.extname(req.file.originalname).toLowerCase() || ".jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;

    try {
      await storeUpload(req.file.buffer, filename, req.file.mimetype);
      res.status(201).json({ url: `/uploads/${filename}` });
    } catch (storeErr) {
      console.error("GridFS upload failed:", storeErr);
      res.status(500).json({ error: "Failed to store image" });
    }
  });
});

export default router;
