// server/routes/board.routes.js
const router = require("express").Router();
const ctrl = require("../controllers/board.controller");
router.post("/", ctrl.createBoard);
module.exports = router;

// server/routes/case.routes.js
const router = require("express").Router();
const ctrl = require("../controllers/case.controller");
router.post("/", ctrl.createCase);
module.exports = router;
