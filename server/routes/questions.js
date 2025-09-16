// FILE: server/routes/questions.js
import express from "express";
import * as ctrl from "../controllers/question.controller.js";
import { limitDailyQuestions } from "../middlewares/rate.guard.js";

const router = express.Router();

// Listeleme: V=2 / M=4 / P=∞ günlük sayım (dışarıya görünen “tam soru” akışı için)
router.get("/", limitDailyQuestions({ pathTag: "questions" }), ctrl.list);

// Tekil soru detayı isterseniz aynı guard'ı buraya da takabilirsiniz.
// router.get("/:id", limitDailyQuestions({ pathTag: "questions" }), ctrl.detail);

export default router;
