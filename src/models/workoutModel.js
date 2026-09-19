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

const createWorkout = async (userId, workoutData) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { name, description, comments, scheduled_at, exercises } =
      workoutData;

    const [workoutResult] = await connection.query(
      `
            INSERT INTO workouts
            (user_id, name, description, comments, scheduled_at)
            VALUES (?, ?, ?, ?, ?)
            `,
      [
        userId,
        name,
        description || null,
        comments || null,
        scheduled_at || null,
      ],
    );

    const workoutId = workoutResult.insertId;

    for (const exercise of exercises) {
      await connection.query(
        `
                INSERT INTO workout_exercises
                (workout_id, exercise_id, repetitions, sets, weight)
                VALUES (?, ?, ?, ?, ?)
                `,
        [
          workoutId,
          exercise.exercise_id,
          exercise.repetitions,
          exercise.sets,
          exercise.weight || 0,
        ],
      );
    }

    await connection.commit();

    return workoutId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
};
