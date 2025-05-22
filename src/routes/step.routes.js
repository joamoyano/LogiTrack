const express = require("express");
const router = express.Router({ mergeParams: true });

const verifyToken = require("../middlewares/auth.middleware");
const {
  createStep,
  getStepsByFlow,
} = require("../controllers/step.controller");

const conditionRoutes = require("./condition.routes");
router.use("/:stepId/conditions", conditionRoutes);

router.post("/", verifyToken, createStep);
router.get("/", verifyToken, getStepsByFlow);

module.exports = router;
