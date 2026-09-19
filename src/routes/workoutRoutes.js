const express = require("express");

const router = express.Router();

const {
    getWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    partialUpdateWorkout,
    deleteWorkout
} = require("../controllers/workoutController");

router.get("/", getWorkouts);
router.get("/:id", getWorkoutById);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.patch("/:id", partialUpdateWorkout);
router.delete("/:id", deleteWorkout);

module.exports = router;