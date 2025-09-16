// FILE: server/routes/video.routes.js
const router = require("express").Router();
const ctrl = require("../controllers/video.controller");
router.post("/", ctrl.createVideo);
module.exports = router;