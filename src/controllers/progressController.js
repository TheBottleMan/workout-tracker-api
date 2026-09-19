const { getAllProgress, getProgressById } = require("../models/progressModel");

const { isValidId } = require("../utils/validation");

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

const createProgress = (req, res) => {
  res.status(501).json({
    message: "Creación de progreso pendiente",
  });
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
  createProgress,
  updateProgress,
  partialUpdateProgress,
  deleteProgress,
  getProgressReport,
};