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

const createUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Nombre, email y contraseña son obligatorios",
      });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "El email ya está registrado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const id = await createUser(name, email, hashedPassword);

    res.status(201).json({
      message: "Usuario creado correctamente",
      user: {
        id,
        name,
        email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
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

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  getAllUsers,
  getUserById,
  createUser,
  getUserByEmail,
} = require("../models/userModel");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son obligatorios",
      });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "PUT requiere name, email y password",
      });
    }

    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await updateUser(req.params.id, {
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "Usuario actualizado correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const partialUpdateUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (
            name === undefined &&
            email === undefined &&
            password === undefined
        ) {
            return res.status(400).json({
                message: "Debe enviar al menos un campo"
            });
        }

        const user = await getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        const data = {
            name,
            email
        };

        if (password !== undefined) {
            data.password = await bcrypt.hash(password, 10);
        }

        await updateUser(req.params.id, data);

        res.status(200).json({
            message: "Usuario actualizado parcialmente"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

module.exports = {
    getUsers,
    getUserById: getUserByIdController,
    createUser: createUserController,
    updateUser: updateUserController,
    partialUpdateUser: partialUpdateUserController,
    deleteUser,
    login
};