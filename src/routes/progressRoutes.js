const express = require("express");

const router = express.Router();

const {
    getProgress,
    getProgressById,
    createProgress,
    updateProgress,
    partialUpdateProgress,
    deleteProgress,
    getProgressReport
} = require("../controllers/progressController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/report", authMiddleware, getProgressReport);

router.get("/", authMiddleware, getProgress);
router.get("/:id", authMiddleware, getProgressById);
router.post("/", authMiddleware, createProgress);
router.put("/:id", authMiddleware, updateProgress);
router.patch("/:id", authMiddleware, partialUpdateProgress);
router.delete("/:id", authMiddleware, deleteProgress);

module.exports = router;