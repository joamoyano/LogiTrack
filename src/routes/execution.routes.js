const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/auth.middleware");
const { startExecution } = require("../controllers/execution.controller");

router.post("/", verifyToken, startExecution);

module.exports = router;
