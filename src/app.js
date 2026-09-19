const express = require("express");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const progressRoutes = require("./routes/progressRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.set("X-API-Key", "WorkoutTracker");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Workout Tracker API funcionando",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/progress", progressRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada",
  });
});

module.exports = app;
