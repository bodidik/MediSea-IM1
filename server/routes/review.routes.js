// FILE: server/routes/review.routes.js
const express = require("express");
const router = express.Router();
const reviewCtrl = require("../controllers/review.controller");

router.get("/next", reviewCtrl.getNext);
router.post("/answer", reviewCtrl.answer);
router.get("/stats", reviewCtrl.stats); // ✅ yeni

module.exports = router;
