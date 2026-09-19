const getProgress = (req, res) => {
    res.status(501).json({
        message: "Listado de progreso pendiente"
    });
};

const getProgressById = (req, res) => {
    res.status(501).json({
        message: "Consulta de progreso pendiente"
    });
};

const createProgress = (req, res) => {
    res.status(501).json({
        message: "Creación de progreso pendiente"
    });
};

const updateProgress = (req, res) => {
    res.status(501).json({
        message: "Actualización de progreso pendiente"
    });
};

const partialUpdateProgress = (req, res) => {
    res.status(501).json({
        message: "Actualización parcial pendiente"
    });
};

const deleteProgress = (req, res) => {
    res.status(501).json({
        message: "Eliminación de progreso pendiente"
    });
};

const getProgressReport = (req, res) => {
    res.status(501).json({
        message: "Informe de progreso pendiente"
    });
};

module.exports = {
    getProgress,
    getProgressById,
    createProgress,
    updateProgress,
    partialUpdateProgress,
    deleteProgress,
    getProgressReport
};