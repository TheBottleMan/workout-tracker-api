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

const createWorkoutController = async (req, res) => {
  try {
    const { name, description, comments, scheduled_at, exercises } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "El nombre es obligatorio",
      });
    }

    if (!Array.isArray(exercises) || exercises.length === 0) {
      return res.status(400).json({
        message: "Debe incluir al menos un ejercicio",
      });
    }

    for (const exercise of exercises) {
      if (!exercise.exercise_id || !exercise.repetitions || !exercise.sets) {
        return res.status(400).json({
          message: "Cada ejercicio debe tener exercise_id, repetitions y sets",
        });
      }

      if (exercise.repetitions <= 0 || exercise.sets <= 0) {
        return res.status(400).json({
          message: "Las repeticiones y series deben ser mayores que 0",
        });
      }
    }

    const workoutId = await createWorkout(req.user.id, {
      name,
      description,
      comments,
      scheduled_at,
      exercises,
    });

    res.status(201).json({
      message: "Entrenamiento creado correctamente",
      id: workoutId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const updateWorkoutController = async (req, res) => {
  try {
    const { name, description, comments, scheduled_at } = req.body;

    if (
      !name ||
      description === undefined ||
      comments === undefined ||
      scheduled_at === undefined
    ) {
      return res.status(400).json({
        message: "PUT requiere name, description, comments y scheduled_at",
      });
    }

    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "El ID debe ser numérico",
      });
    }

    const exists = await getWorkoutById(req.params.id, req.user.id);

    if (!exists) {
      return res.status(404).json({
        message: "Entrenamiento no encontrado",
      });
    }

    await updateWorkout(req.params.id, req.user.id, {
      name,
      description,
      comments,
      scheduled_at,
    });

    res.status(200).json({
      message: "Entrenamiento actualizado correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const partialUpdateWorkoutController = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "El ID debe ser numérico",
      });
    }

    const exists = await getWorkoutById(req.params.id, req.user.id);

    if (!exists) {
      return res.status(404).json({
        message: "Entrenamiento no encontrado",
      });
    }

    const { name, description, comments, scheduled_at, status } = req.body;

    if (
      name === undefined &&
      description === undefined &&
      comments === undefined &&
      scheduled_at === undefined &&
      status === undefined
    ) {
      return res.status(400).json({
        message: "Debe enviar al menos un campo",
      });
    }

    if (status !== undefined && !["pending", "completed"].includes(status)) {
      return res.status(400).json({
        message: "Estado inválido",
      });
    }

    await updateWorkout(req.params.id, req.user.id, {
      name,
      description,
      comments,
      scheduled_at,
      status,
    });

    res.status(200).json({
      message: "Entrenamiento actualizado parcialmente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const deleteWorkoutController = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "El ID debe ser numérico",
      });
    }

    const exists = await getWorkoutById(req.params.id, req.user.id);

    if (!exists) {
      return res.status(404).json({
        message: "Entrenamiento no encontrado",
      });
    }

    await deleteWorkout(req.params.id, req.user.id);

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

module.exports = {
  getWorkouts,
  getWorkoutById: getWorkoutByIdController,
  createWorkout: createWorkoutController,
  updateWorkout: updateWorkoutController,
  partialUpdateWorkout: partialUpdateWorkoutController,
  deleteWorkout: deleteWorkoutController
};
