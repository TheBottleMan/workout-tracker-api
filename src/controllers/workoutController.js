const getWorkouts = (req, res) => {
    res.status(501).json({
        message: "Listado de entrenamientos pendiente"
    });
};

const getWorkoutById = (req, res) => {
    res.status(501).json({
        message: "Consulta de entrenamiento pendiente"
    });
};

const createWorkout = (req, res) => {
    res.status(501).json({
        message: "Creación de entrenamiento pendiente"
    });
};

const updateWorkout = (req, res) => {
    res.status(501).json({
        message: "Actualización de entrenamiento pendiente"
    });
};

const partialUpdateWorkout = (req, res) => {
    res.status(501).json({
        message: "Actualización parcial pendiente"
    });
};

const deleteWorkout = (req, res) => {
    res.status(501).json({
        message: "Eliminación pendiente"
    });
};

module.exports = {
    getWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    partialUpdateWorkout,
    deleteWorkout
};