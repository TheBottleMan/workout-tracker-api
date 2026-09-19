const express = require("express");

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

router.post("/", createExercise);

router.put("/:id", updateExercise);

router.patch("/:id", updateExercisePartial);

router.delete("/:id", deleteExercise);

module.exports = router;
