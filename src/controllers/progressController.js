const { getAllProgress, getProgressById } = require("../models/progressModel");

const { isValidId } = require("../utils/validation");

const {
  getAllProgress,
  getProgressById,
  workoutBelongsToUser,
  createProgress,
} = require("../models/progressModel");

const getProgressController = async (req, res) => {
  try {
    const progress = await getAllProgress(req.user.id);

    res.status(200).json(progress);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const getProgressByIdController = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "El ID debe ser numérico",
      });
    }

    const progress = await getProgressById(req.params.id, req.user.id);

    if (!progress) {
      return res.status(404).json({
        message: "Registro de progreso no encontrado",
      });
    }

    res.status(200).json(progress);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const createProgressController = async (req, res) => {
  try {
    const { workout_id, progress_value, notes } = req.body;

    if (progress_value === undefined && !notes) {
      return res.status(400).json({
        message: "Debe proporcionar progress_value o notes",
      });
    }

    if (
      progress_value !== undefined &&
      (typeof progress_value !== "number" || progress_value < 0)
    ) {
      return res.status(400).json({
        message: "progress_value debe ser un número mayor o igual a 0",
      });
    }

    if (workout_id !== undefined) {
      if (!isValidId(String(workout_id))) {
        return res.status(400).json({
          message: "workout_id debe ser numérico",
        });
      }

      const belongsToUser = await workoutBelongsToUser(workout_id, req.user.id);

      if (!belongsToUser) {
        return res.status(404).json({
          message: "Entrenamiento no encontrado",
        });
      }
    }

    const progressId = await createProgress(
      req.user.id,
      workout_id,
      progress_value,
      notes,
    );

    res.status(201).json({
      message: "Registro de progreso creado correctamente",
      id: progressId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const updateProgress = (req, res) => {
  res.status(501).json({
    message: "Actualización de progreso pendiente",
  });
};

const partialUpdateProgress = (req, res) => {
  res.status(501).json({
    message: "Actualización parcial pendiente",
  });
};

const deleteProgress = (req, res) => {
  res.status(501).json({
    message: "Eliminación de progreso pendiente",
  });
};

const getProgressReport = (req, res) => {
  res.status(501).json({
    message: "Informe de progreso pendiente",
  });
};

module.exports = {
  getProgress: getProgressController,
  getProgressById: getProgressByIdController,
  createProgress: createProgressController,
  updateProgress,
  partialUpdateProgress,
  deleteProgress,
  getProgressReport,
};
