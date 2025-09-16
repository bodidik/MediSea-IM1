// FILE: server/routes/admin.import.routes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/admin.import.controller");

// Basit JSON body bekler (CSV de "data" alanı içinde string)
router.post("/videos", ctrl.importVideos);
router.post("/notes", ctrl.importNotes);

module.exports = router;
