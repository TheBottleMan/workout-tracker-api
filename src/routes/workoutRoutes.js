const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    partialUpdateWorkout,
    deleteWorkout
} = require("../controllers/workoutController");

router.get("/", authMiddleware, getWorkouts);
router.get("/:id", authMiddleware, getWorkoutById);
router.post("/", authMiddleware, createWorkout);
router.put("/:id", authMiddleware, updateWorkout);
router.patch("/:id", authMiddleware, partialUpdateWorkout);
router.delete("/:id", authMiddleware, deleteWorkout);
module.exports = router;