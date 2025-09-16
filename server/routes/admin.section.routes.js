// FILE: server/routes/admin.section.routes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/admin.section.controller");

router.get("/audit", ctrl.audit);
router.post("/normalize", ctrl.normalize);

module.exports = router;
