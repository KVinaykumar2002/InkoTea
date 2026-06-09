import cors from "cors";
import express from "express";
import { resolveCorsOrigins } from "../../shared/urls.js";
import { config } from "./config.js";
import { connectDb } from "./db/index.js";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blog.js";
import dashboardRoutes from "./routes/dashboard.js";
import faqRoutes from "./routes/faqs.js";
import leadRoutes from "./routes/leads.js";
import menuRoutes from "./routes/menu.js";
import outletRoutes from "./routes/outlets.js";
import testimonialRoutes from "./routes/testimonials.js";
import uploadRoutes from "./routes/uploads.js";

const app = express();

const allowedOrigins = resolveCorsOrigins(process.env.CORS_ORIGIN);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      const normalized = origin.replace(/\/+$/, "");
      if (allowedOrigins.includes(normalized)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "inkotea-backend" });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/outlets", outletRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/uploads", uploadRoutes);

async function start() {
  await connectDb();
  app.listen(config.port, "0.0.0.0", () => {
    console.log(`INKOTEA API running on port ${config.port}`);
    console.log(`CORS allowed origins: ${allowedOrigins.join(", ")}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
