const express = require("express");
const router = express.Router({ mergeParams: true }); // para acceder a :flowId
const verifyToken = require("../middlewares/auth.middleware");
const {
  createStep,
  getStepsByFlow,
} = require("../controllers/step.controller");

router.post("/", verifyToken, createStep);
router.get("/", verifyToken, getStepsByFlow);

module.exports = router;
