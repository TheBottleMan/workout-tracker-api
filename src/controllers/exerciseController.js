const db = require("../config/db");

const getExercises = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM exercises"
        );

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los ejercicios"
        });
    }
};

const getExerciseById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query(
            "SELECT * FROM exercises WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                error: "Ejercicio no encontrado"
            });
        }

        res.status(200).json(rows[0]);

    } catch (error) {
        res.status(500).json({
            error: "Error al obtener el ejercicio"
        });
    }
};

module.exports = {
    getExercises,
    getExerciseById
};