const db = require("../config/db");

const { isValidId, isValidExercise } = require("../utils/validation");

const getExercises = async (req, res) => {
  try {
    const { category, muscle_group } = req.query;

    let query = "SELECT * FROM exercises";
    const values = [];
    const conditions = [];

    if (category) {
      conditions.push("category = ?");
      values.push(category);
    }

    if (muscle_group) {
      conditions.push("muscle_group = ?");
      values.push(muscle_group);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    const [rows] = await db.query(query, values);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener los ejercicios",
    });
  }
};

const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "El ID debe ser un número positivo",
      });
    }

    const [rows] = await db.query("SELECT * FROM exercises WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Ejercicio no encontrado",
      });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener el ejercicio",
    });
  }
};

const createExercise = async (req, res) => {
  try {
    const { name, description, category, muscle_group } = req.body;

    if (!isValidExercise(name, description, category, muscle_group)) {
      return res.status(400).json({
        message: "Todos los campos del ejercicio son obligatorios",
      });
    }

    const [result] = await db.query(
      `INSERT INTO exercises
            (name, description, category, muscle_group)
            VALUES (?, ?, ?, ?)`,
      [name, description, category, muscle_group],
    );

    res.status(201).json({
      message: "Ejercicio creado correctamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear el ejercicio",
    });
  }
};

const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "El ID debe ser un número positivo",
      });
    }

    const { name, description, category, muscle_group } = req.body;

    if (!isValidExercise(name, description, category, muscle_group)) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios para PUT",
      });
    }

    const [existingExercise] = await db.query(
      "SELECT * FROM exercises WHERE id = ?",
      [id],
    );

    if (existingExercise.length === 0) {
      return res.status(404).json({
        message: "Ejercicio no encontrado",
      });
    }

    await db.query(
      `UPDATE exercises
            SET name = ?,
                description = ?,
                category = ?,
                muscle_group = ?
            WHERE id = ?`,
      [name, description, category, muscle_group, id],
    );

    res.status(200).json({
      message: "Ejercicio actualizado correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al actualizar el ejercicio",
    });
  }
};

const updateExercisePartial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "El ID debe ser un número positivo",
      });
    }

    const fields = [];
    const values = [];

    if (req.body.name !== undefined) {
      if (req.body.name.trim() === "") {
        return res.status(400).json({
          message: "El nombre no puede estar vacío",
        });
      }

      fields.push("name = ?");
      values.push(req.body.name);
    }

    if (req.body.description !== undefined) {
      if (req.body.description.trim() === "") {
        return res.status(400).json({
          message: "La descripción no puede estar vacía",
        });
      }

      fields.push("description = ?");
      values.push(req.body.description);
    }

    if (req.body.category !== undefined) {
      if (req.body.category.trim() === "") {
        return res.status(400).json({
          message: "La categoría no puede estar vacía",
        });
      }

      fields.push("category = ?");
      values.push(req.body.category);
    }

    if (req.body.muscle_group !== undefined) {
      if (req.body.muscle_group.trim() === "") {
        return res.status(400).json({
          message: "El grupo muscular no puede estar vacío",
        });
      }

      fields.push("muscle_group = ?");
      values.push(req.body.muscle_group);
    }

    if (fields.length === 0) {
      return res.status(400).json({
        message: "No se enviaron datos para actualizar",
      });
    }

    const [existingExercise] = await db.query(
      "SELECT * FROM exercises WHERE id = ?",
      [id],
    );

    if (existingExercise.length === 0) {
      return res.status(404).json({
        message: "Ejercicio no encontrado",
      });
    }

    values.push(id);

    await db.query(
      `UPDATE exercises
            SET ${fields.join(", ")}
            WHERE id = ?`,
      values,
    );

    res.status(200).json({
      message: "Ejercicio actualizado parcialmente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al actualizar parcialmente el ejercicio",
    });
  }
};

const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "El ID debe ser un número positivo",
      });
    }

    const [result] = await db.query("DELETE FROM exercises WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Ejercicio no encontrado",
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al eliminar el ejercicio",
    });
  }
};

module.exports = {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  updateExercisePartial,
  deleteExercise,
};
