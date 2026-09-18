const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Lista de ejercicios");
});

router.get("/:id", (req, res) => {
    res.send(`Ejercicio con ID ${req.params.id}`);
});

router.post("/", (req, res) => {
    res.send("Crear ejercicio");
});

router.put("/:id", (req, res) => {
    res.send(`Actualizar completamente el ejercicio ${req.params.id}`);
});

router.patch("/:id", (req, res) => {
    res.send(`Actualizar parcialmente el ejercicio ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
    res.send(`Eliminar ejercicio ${req.params.id}`);
});

module.exports = router;