import dotenv from "dotenv";

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. Set it in backend/.env (MongoDB Atlas cluster URL).`,
    );
  }
  return value;
}

export const config = {
  port: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET || "inkotea-dev-secret",
  adminEmail: process.env.ADMIN_EMAIL || "admin@inkotea.com",
  adminPassword: process.env.ADMIN_PASSWORD || "admin123",
  corsOrigin: process.env.CORS_ORIGIN || "https://inko-tea-six.vercel.app",
  mongodbUri: requireEnv("MONGODB_URI"),
  mongodbDbName: process.env.MONGODB_DB_NAME || "inkotea",
};
