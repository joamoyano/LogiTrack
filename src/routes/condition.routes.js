const express = require("express");
const router = express.Router({ mergeParams: true });

const verifyToken = require("../middlewares/auth.middleware");
const {
  createCondition,
  getConditions,
} = require("../controllers/condition.controller");

router.post("/", verifyToken, createCondition);
router.get("/", verifyToken, getConditions); // 👈 esta es la ruta que debe responder

module.exports = router;
