const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth.middleware");
const { createFlow } = require("../controllers/flow.controller");

router.post("/", verifyToken, createFlow); // Ruta protegida

const stepRoutes = require("./step.routes");
router.use("/:flowId/steps", stepRoutes);

module.exports = router;
