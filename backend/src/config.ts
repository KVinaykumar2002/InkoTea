import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  port: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET || "inkotea-dev-secret",
  adminEmail: process.env.ADMIN_EMAIL || "admin@inkotea.com",
  adminPassword: process.env.ADMIN_PASSWORD || "admin123",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  databasePath:
    process.env.DATABASE_PATH ||
    path.join(__dirname, "..", "data", "inkotea.db"),
};
