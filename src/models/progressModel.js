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

const workoutBelongsToUser = async (workoutId, userId) => {
  const [rows] = await pool.query(
    `
        SELECT id
        FROM workouts
        WHERE id = ?
          AND user_id = ?
        `,
    [workoutId, userId],
  );

  return rows.length > 0;
};

const createProgress = async (userId, workoutId, progressValue, notes) => {
  const [result] = await pool.query(
    `
        INSERT INTO progress
        (user_id, workout_id, progress_value, notes)
        VALUES (?, ?, ?, ?)
        `,
    [userId, workoutId || null, progressValue ?? null, notes || null],
  );

  return result.insertId;
};

const updateProgress = async (id, userId, data) => {
  const fields = [];
  const values = [];

  if (data.workout_id !== undefined) {
    fields.push("workout_id = ?");
    values.push(data.workout_id);
  }

  if (data.progress_value !== undefined) {
    fields.push("progress_value = ?");
    values.push(data.progress_value);
  }

  if (data.notes !== undefined) {
    fields.push("notes = ?");
    values.push(data.notes);
  }

  if (fields.length === 0) {
    return false;
  }

  values.push(id, userId);

  const [result] = await pool.query(
    `
        UPDATE progress
        SET ${fields.join(", ")}
        WHERE id = ?
          AND user_id = ?
        `,
    values,
  );

  return result.affectedRows > 0;
};

const deleteProgress = async (id, userId) => {
    const [result] = await pool.query(
        `
        DELETE FROM progress
        WHERE id = ?
          AND user_id = ?
        `,
        [id, userId]
    );

    return result.affectedRows > 0;
};

module.exports = {
  getAllProgress,
  getProgressById,
  workoutBelongsToUser,
  createProgress,
  updateProgress,
  deleteProgress
};
