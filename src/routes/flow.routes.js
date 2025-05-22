const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/auth.middleware");
const { createFlow, getUserFlows } = require("../controllers/flow.controller");

const stepRoutes = require("./step.routes");
router.use("/:flowId/steps", stepRoutes);

router.post("/", verifyToken, createFlow);
router.get("/", verifyToken, getUserFlows);

module.exports = router;
