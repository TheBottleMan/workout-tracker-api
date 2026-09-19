const { getAllWorkouts, getWorkoutById } = require("../models/workoutModel");

const { isValidId } = require("../utils/validation");

const getWorkouts = async (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : null;

    const status = req.query.status ? req.query.status.trim() : null;

    if (limit !== null && (!Number.isInteger(limit) || limit <= 0)) {
      return res.status(400).json({
        message: "limit debe ser un entero positivo",
      });
    }

    if (status !== null && !["pending", "completed"].includes(status)) {
      return res.status(400).json({
        message: "status debe ser pending o completed",
      });
    }

    const workouts = await getAllWorkouts(req.user.id, limit, status);

    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const getWorkoutByIdController = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "El ID debe ser numérico",
      });
    }

    const workout = await getWorkoutById(req.params.id, req.user.id);

    if (!workout) {
      return res.status(404).json({
        message: "Entrenamiento no encontrado",
      });
    }

    res.status(200).json(workout);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const createWorkout = (req, res) => {
  res.status(501).json({
    message: "Creación de entrenamiento pendiente",
  });
};

const updateWorkout = (req, res) => {
  res.status(501).json({
    message: "Actualización pendiente",
  });
};

const partialUpdateWorkout = (req, res) => {
  res.status(501).json({
    message: "Actualización parcial pendiente",
  });
};

const deleteWorkout = (req, res) => {
  res.status(501).json({
    message: "Eliminación pendiente",
  });
};

module.exports = {
  getWorkouts,
  getWorkoutById: getWorkoutByIdController,
  createWorkout,
  updateWorkout,
  partialUpdateWorkout,
  deleteWorkout,
};
