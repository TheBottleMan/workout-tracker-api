const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    partialUpdateUser,
    deleteUser
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", authMiddleware, updateUser);
router.patch("/:id", authMiddleware, partialUpdateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;