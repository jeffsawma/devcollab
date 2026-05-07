const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "https://devcollab-frontend-346u.onrender.com",
    ],
    credentials: true,
  }),
);

app.use(express.json());

// Routes placeholder
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

module.exports = app;

// Express Core application logique (routes and middlewares etc.)
