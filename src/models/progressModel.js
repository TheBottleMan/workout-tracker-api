const pool = require("../config/db");

const getAllProgress = async (userId) => {
  const [rows] = await pool.query(
    `
        SELECT
            p.id,
            p.workout_id,
            w.name AS workout_name,
            p.progress_value,
            p.notes,
            p.recorded_at
        FROM progress p
        LEFT JOIN workouts w
            ON w.id = p.workout_id
        WHERE p.user_id = ?
        ORDER BY p.recorded_at DESC
        `,
    [userId],
  );

  return rows;
};

const getProgressById = async (id, userId) => {
  const [rows] = await pool.query(
    `
        SELECT
            p.id,
            p.workout_id,
            w.name AS workout_name,
            p.progress_value,
            p.notes,
            p.recorded_at
        FROM progress p
        LEFT JOIN workouts w
            ON w.id = p.workout_id
        WHERE p.id = ?
          AND p.user_id = ?
        `,
    [id, userId],
  );

  return rows[0];
};

module.exports = {
  getAllProgress,
  getProgressById,
};
