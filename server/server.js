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
import topicAdminRoutes from "./routes/topic.admin.routes.js"; // ⬅️ Admin bulk

dotenv.config();

const app = express();

/* --- Middleware --- */
const defaultOrigins =
  "http://localhost:3000,http://localhost:3001,http://localhost:3002";

app.use(
  cors({
    origin: (process.env.VIDEO_ALLOWED_ORIGINS || defaultOrigins)
      .split(",")
      .map((s) => s.trim()),
    credentials: true,
  })
);

// JSON body parser (CSV için router içinde express.text kullanıyoruz)
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

/* --- MongoDB --- */
const MONGO =
  process.env.MONGODB_URI || "mongodb://localhost:27017/medknowledge";

mongoose
  .connect(MONGO)
  .then(() => console.log("[BOOT] Mongo connected"))
  .catch((err) =>
    console.error("[BOOT] Mongo connection error:", err?.message || err)
  );

/* --- Basit rol taşıma (demo) --- */
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

// MedSea uyumluluk katmanı (counts, progress, quiz, review vb.)
app.use("/api", medseaCompatRoutes);

// Premium korumalı içerik
app.use("/api/protected", protectedRoutes);

// Topics (liste/detay/CRUD)
app.use("/api/topics", topicRoutes);

// Guidelines
app.use("/api/guidelines", guidelinesRoutes);

// Admin: topics bulk import & slug kontrol
app.use("/api/admin/topics", topicAdminRoutes);

/* --- Healthcheck --- */
// Basit sağlık ucu (CI/Docker healthcheck için)
app.get("/health", (_req, res) => {
  const dbState = mongoose.connection?.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting
  res.status(200).json({
    status: "ok",
    dbState,
    uptime: process.uptime(),
  });
});

// Kök rota (opsiyonel bilgi)
app.get("/", (_req, res) => res.send("Medknowledge API running..."));

/* --- Start --- */
const PORT = Number(process.env.PORT || 4000);
const HOST = process.env.HOST || "0.0.0.0"; // Docker için önemli
app.listen(PORT, HOST, () => {
  console.log(`[BOOT] Server running on http://${HOST}:${PORT}`);
});
