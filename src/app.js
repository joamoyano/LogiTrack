const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a LogiTrack API" });
});

const userRoutes = require("./routes/user.routes");
app.use("/api/user", userRoutes);

const flowRoutes = require("./routes/flow.routes");
app.use("/api/flows", flowRoutes);

const executionRoutes = require("./routes/execution.routes");
app.use("/api/executions", executionRoutes);

module.exports = app;
