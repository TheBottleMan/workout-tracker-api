const express = require("express");

const app = express();

const exerciseRoutes = require("./routes/exerciseRoutes");

app.use("/api/exercises", exerciseRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Workout Tracker API funcionando"
    });
});

module.exports = app;

