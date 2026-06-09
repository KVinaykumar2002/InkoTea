import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Persist uploads under backend/uploads (reliable when only backend is deployed). */
export const UPLOAD_DIR = path.join(__dirname, "../../uploads");

/** Legacy path used before uploads moved into backend/. */
export const LEGACY_UPLOAD_DIR = path.join(
  __dirname,
  "../../../frontend/public/uploads",
);

export function ensureUploadDirs(): void {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  fs.mkdirSync(LEGACY_UPLOAD_DIR, { recursive: true });
}
