const pool = require("../config/db");

const getAllWorkouts = async (userId, limit, status) => {
  let sql = `
        SELECT
            w.id,
            w.name,
            w.description,
            w.comments,
            w.scheduled_at,
            w.status,
            w.created_at
        FROM workouts w
        WHERE w.user_id = ?
    `;

  const values = [userId];

  if (status) {
    sql += " AND w.status = ?";
    values.push(status);
  }

  sql += " ORDER BY w.scheduled_at ASC";

  if (limit !== null) {
    sql += " LIMIT ?";
    values.push(limit);
  }

  const [rows] = await pool.query(sql, values);

  return rows;
};

const getWorkoutById = async (id, userId) => {
  const [rows] = await pool.query(
    `
        SELECT
            w.id,
            w.name,
            w.description,
            w.comments,
            w.scheduled_at,
            w.status,
            w.created_at
        FROM workouts w
        WHERE w.id = ?
          AND w.user_id = ?
        `,
    [id, userId],
  );

  return rows[0];
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
};
