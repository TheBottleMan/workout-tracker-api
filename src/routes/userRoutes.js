const express = require("express");

const router = express.Router();

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
router.put("/:id", updateUser);
router.patch("/:id", partialUpdateUser);
router.delete("/:id", deleteUser);

module.exports = router;