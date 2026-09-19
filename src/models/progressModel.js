const pool = require("../config/db");

const getAllProgress = async (userId, limit, from, to) => {
  let sql = `
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
    `;

  const values = [userId];

  if (from) {
    sql += " AND DATE(p.recorded_at) >= ?";
    values.push(from);
  }

  if (to) {
    sql += " AND DATE(p.recorded_at) <= ?";
    values.push(to);
  }

  sql += " ORDER BY p.recorded_at DESC";

  if (limit !== null) {
    sql += " LIMIT ?";
    values.push(limit);
  }

  const [rows] = await pool.query(sql, values);

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

const getProgressReport = async (userId) => {
  const [summary] = await pool.query(
    `
        SELECT
            COUNT(DISTINCT w.id) AS total_workouts,
            SUM(
                CASE
                    WHEN w.status = 'completed'
                    THEN 1
                    ELSE 0
                END
            ) AS completed_workouts,
            COUNT(p.id) AS progress_records,
            MAX(p.progress_value) AS highest_progress
        FROM workouts w
        LEFT JOIN progress p
            ON p.workout_id = w.id
           AND p.user_id = ?
        WHERE w.user_id = ?
        `,
    [userId, userId],
  );

  const [pastWorkouts] = await pool.query(
    `
        SELECT
            w.id,
            w.name,
            w.scheduled_at,
            w.status,
            p.progress_value,
            p.notes,
            p.recorded_at
        FROM workouts w
        LEFT JOIN progress p
            ON p.workout_id = w.id
           AND p.user_id = ?
        WHERE w.user_id = ?
          AND w.scheduled_at IS NOT NULL
          AND w.scheduled_at < NOW()
        ORDER BY w.scheduled_at DESC
        `,
    [userId, userId],
  );

  return {
    summary: summary[0],
    past_workouts: pastWorkouts,
  };
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
    [id, userId],
  );

  return result.affectedRows > 0;
};

module.exports = {
  getAllProgress,
  getProgressById,
  workoutBelongsToUser,
  createProgress,
  updateProgress,
  deleteProgress,
  getProgressReport,
};
