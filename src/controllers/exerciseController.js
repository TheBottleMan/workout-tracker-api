const {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  partialUpdateExercise,
  deleteExercise,
} = require("../models/exerciseModel");

const { isValidId, isValidExercise } = require("../utils/validation");

const getExercises = async (req, res) => {
  try {
    const { category, muscle_group } = req.query;

    const exercises = await getAllExercises({ category, muscle_group });
    res.status(200).json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los ejercicios" });
  }
};

const getExerciseByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res
        .status(400)
        .json({ message: "El ID debe ser un número positivo" });
    }

    const exercise = await getExerciseById(id);
    if (!exercise) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }

    res.status(200).json(exercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el ejercicio" });
  }
};

const createExerciseController = async (req, res) => {
  try {
    const { name, description, category, muscle_group } = req.body;

    if (!isValidExercise(name, description, category, muscle_group)) {
      return res.status(400).json({
        message: "Todos los campos del ejercicio son obligatorios",
      });
    }

    const id = await createExercise({
      name,
      description,
      category,
      muscle_group,
    });

    res.status(201).json({
      message: "Ejercicio creado correctamente",
      id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el ejercicio" });
  }
};

const updateExerciseController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res
        .status(400)
        .json({ message: "El ID debe ser un número positivo" });
    }

    const { name, description, category, muscle_group } = req.body;

    if (!isValidExercise(name, description, category, muscle_group)) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios para PUT",
      });
    }

    const existing = await getExerciseById(id);
    if (!existing) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }

    await updateExercise(id, { name, description, category, muscle_group });

    res.status(200).json({ message: "Ejercicio actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el ejercicio" });
  }
};

const updateExercisePartialController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res
        .status(400)
        .json({ message: "El ID debe ser un número positivo" });
    }

    const data = {};

    if (req.body.name !== undefined) {
      if (req.body.name.trim() === "") {
        return res
          .status(400)
          .json({ message: "El nombre no puede estar vacío" });
      }
      data.name = req.body.name;
    }

    if (req.body.description !== undefined) {
      if (req.body.description.trim() === "") {
        return res
          .status(400)
          .json({ message: "La descripción no puede estar vacía" });
      }
      data.description = req.body.description;
    }

    if (req.body.category !== undefined) {
      if (req.body.category.trim() === "") {
        return res
          .status(400)
          .json({ message: "La categoría no puede estar vacía" });
      }
      data.category = req.body.category;
    }

    if (req.body.muscle_group !== undefined) {
      if (req.body.muscle_group.trim() === "") {
        return res
          .status(400)
          .json({ message: "El grupo muscular no puede estar vacío" });
      }
      data.muscle_group = req.body.muscle_group;
    }

    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ message: "No se enviaron datos para actualizar" });
    }

    const existing = await getExerciseById(id);
    if (!existing) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }

    await partialUpdateExercise(id, data);

    res.status(200).json({ message: "Ejercicio actualizado parcialmente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar parcialmente el ejercicio" });
  }
};

const deleteExerciseController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res
        .status(400)
        .json({ message: "El ID debe ser un número positivo" });
    }

    const deleted = await deleteExercise(id);
    if (!deleted) {
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el ejercicio" });
  }
};

module.exports = {
  getExercises,
  getExerciseById: getExerciseByIdController,
  createExercise: createExerciseController,
  updateExercise: updateExerciseController,
  updateExercisePartial: updateExercisePartialController,
  deleteExercise: deleteExerciseController,
};
