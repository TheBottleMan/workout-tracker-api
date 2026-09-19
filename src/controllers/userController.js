const getUsers = (req, res) => {
    res.status(501).json({
        message: "Listado de usuarios pendiente de implementación"
    });
};

const getUserById = (req, res) => {
    res.status(501).json({
        message: "Consulta de usuario pendiente de implementación"
    });
};

const createUser = (req, res) => {
    res.status(501).json({
        message: "Creación de usuario pendiente de implementación"
    });
};

const updateUser = (req, res) => {
    res.status(501).json({
        message: "Actualización de usuario pendiente de implementación"
    });
};

const partialUpdateUser = (req, res) => {
    res.status(501).json({
        message: "Actualización parcial pendiente de implementación"
    });
};

const deleteUser = (req, res) => {
    res.status(501).json({
        message: "Eliminación de usuario pendiente de implementación"
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    partialUpdateUser,
    deleteUser
};