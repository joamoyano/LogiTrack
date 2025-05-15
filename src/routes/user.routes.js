const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth.middleware");
const { getMe } = require("../controllers/user.controller");

router.get("/me", verifyToken, getMe);

module.exports = router;
