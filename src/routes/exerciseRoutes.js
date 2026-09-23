const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  updateExercisePartial,
  deleteExercise,
} = require("../controllers/exerciseController");

const router = express.Router();

router.get("/", getExercises);
router.get("/:id", getExerciseById);

router.post("/", authMiddleware, createExercise);
router.put("/:id", authMiddleware, updateExercise);
router.patch("/:id", authMiddleware, updateExercisePartial);
router.delete("/:id", authMiddleware, deleteExercise);

module.exports = router;
