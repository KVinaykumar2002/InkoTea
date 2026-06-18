import fs from "node:fs";
import path from "node:path";
import type { Request, Response } from "express";
import { openUpload } from "./gridfs.js";
import { LEGACY_UPLOAD_DIR, UPLOAD_DIR } from "./uploadsDir.js";

function safeFilename(raw: string): string | null {
  const filename = path.basename(raw);
  if (!filename || filename === "." || filename.includes("..")) {
    return null;
  }
  return filename;
}

/** Serve an uploaded image from local disk (dev) or MongoDB GridFS (production). */
export async function serveUpload(req: Request, res: Response): Promise<void> {
  const filename = safeFilename(String(req.params.filename ?? ""));
  if (!filename) {
    res.status(400).json({ error: "Invalid filename" });
    return;
  }

  for (const dir of [UPLOAD_DIR, LEGACY_UPLOAD_DIR]) {
    const filePath = path.join(dir, filename);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
      return;
    }
  }

  try {
    const stored = await openUpload(filename);
    if (!stored) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    res.setHeader("Content-Type", stored.contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    stored.stream.on("error", () => {
      if (!res.headersSent) {
        res.status(404).json({ error: "File not found" });
      }
    });
    stored.stream.pipe(res);
  } catch {
    res.status(500).json({ error: "Failed to load file" });
  }
}
