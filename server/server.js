// FILE: server/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import questionsRoutes from "./routes/questions.js";
import examsRoutes from "./routes/exams.js";
import medseaCompatRoutes from "./routes/medsea.compat.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import caseRoutes from "./routes/case.routes.js";
import sectionsContentRoutes from "./routes/sections.js";
import sectionsCountsRoutes from "./routes/sectionsCounts.js";
import topicRoutes from "./routes/topic.routes.js";
import guidelinesRoutes from "./routes/guidelines.routes.js";
import topicAdminRoutes from "./routes/topic.admin.routes.js"; // â¬…ï¸ Admin bulk

dotenv.config();

const app = express();

/* --- Middleware --- */
const defaultOrigins =
  "http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://localhost:3002";

app.use(
  cors({
    origin: (process.env.VIDEO_ALLOWED_ORIGINS || defaultOrigins)
      .split(",")
      .map((s) => s.trim()),
    credentials: true,
  })
);

// JSON body parser (CSV iÃ§in router iÃ§inde express.text kullanÄ±yoruz)
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

/* --- MongoDB (kalÄ±cÄ± & dayanÄ±klÄ± baÄŸlanma) --- */
const MONGO =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/medknowledge";
let DB_LAST_ERROR = null;
let DB_READY = false;

async function connectMongo() {
  try {
    await mongoose.connect(MONGO, {
      serverSelectionTimeoutMS: 5000, // hÄ±zlÄ± fail
      family: 4, // IPv4
    });
    DB_READY = true;
    DB_LAST_ERROR = null;
    console.log("[BOOT] Mongo connected");
  } catch (err) {
    DB_READY = false;
    DB_LAST_ERROR = err?.message || String(err);
    console.error("[BOOT] Mongo connection error:", DB_LAST_ERROR);
    // Not: Sunucuyu kapatmÄ±yoruz; API ayakta kalsÄ±n.
  }
}
connectMongo();

/* --- Basit rol taÅŸÄ±ma (demo) --- */
app.use((req, _res, next) => {
  const role = (req.query.role || "V").toString(); // V / M / P
  req.user = { role };
  next();
});

/* --- API Routes --- */
app.use("/api/section-content", sectionsContentRoutes);
app.use("/api/sections", sectionsCountsRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/exams", examsRoutes);
app.use("/api/cases", caseRoutes);

// MedSea uyumluluk katmanÄ± (counts, progress, quiz, review vb.)
app.use("/api", medseaCompatRoutes);

// Premium korumalÄ± iÃ§erik
app.use("/api/protected", protectedRoutes);

// Topics (liste/detay/CRUD)
app.use("/api/topics", topicRoutes);

// Guidelines
app.use("/api/guidelines", guidelinesRoutes);

// Admin: topics bulk import & slug kontrol
app.use("/api/admin/topics", topicAdminRoutes);

/* --- Healthcheck --- */
// Eski health (korunuyor)
app.get("/health", (_req, res) => {
  const dbState = mongoose.connection?.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
  res.status(200).json({
    status: "ok",
    dbState,
    dbReady: DB_READY,
    dbError: DB_LAST_ERROR,
    uptime: process.uptime(),
  });
});

// Frontend/monitoring ile hizalÄ± health (API altÄ±nda)
app.get("/api/health", (_req, res) => {
  const dbState = mongoose.connection?.readyState; // 0..3
  res.status(200).json({
    ok: true,
    service: "medknowledge-api",
    dbState,
    dbReady: DB_READY,
    dbError: DB_LAST_ERROR,
    time: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// KÃ¶k rota (opsiyonel bilgi)
app.get("/", (_req, res) => res.send("Medknowledge API running..."));

/* --- Start --- */
const PORT = Number(process.env.PORT || 4000);
const HOST = process.env.HOST || "0.0.0.0"; // Docker iÃ§in Ã¶nemli
app.get("/health", (_req, res) => {
  res.json({ ok: true, status: "up" });
});
app.listen(PORT, HOST, () => {
  console.log(`[BOOT] Server running on http://${HOST}:${PORT}`);
});
