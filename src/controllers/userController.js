const { getAllUsers, getUserById } = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const createUser = (req, res) => {
  res.status(501).json({
    message: "Creación de usuario pendiente de implementación",
  });
};

const updateUser = (req, res) => {
  res.status(501).json({
    message: "Actualización de usuario pendiente de implementación",
  });
};

const partialUpdateUser = (req, res) => {
  res.status(501).json({
    message: "Actualización parcial pendiente de implementación",
  });
};

const deleteUser = (req, res) => {
  res.status(501).json({
    message: "Eliminación de usuario pendiente de implementación",
  });
};

module.exports = {
  getUsers,
  getUserById: getUserByIdController,
  createUser,
  updateUser,
  partialUpdateUser,
  deleteUser,
};
