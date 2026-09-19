const express = require("express");
const exerciseRoutes = require("./routes/exerciseRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Workout Tracker API funcionando"
    });
});

app.use("/api/exercises", exerciseRoutes);

module.exports = app;