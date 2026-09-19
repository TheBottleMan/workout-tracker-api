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

const getWorkoutExercises = async (workoutId) => {
  const [rows] = await pool.query(
    `
        SELECT
            we.exercise_id,
            e.name,
            e.description,
            e.category,
            e.muscle_group,
            we.repetitions,
            we.sets,
            we.weight
        FROM workout_exercises we
        INNER JOIN exercises e
            ON e.id = we.exercise_id
        WHERE we.workout_id = ?
        `,
    [workoutId],
  );

  return rows;
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

    for (const exercise of exercises) {
      const exists = await exerciseExists(exercise.exercise_id);

      if (!exists) {
        return res.status(400).json({
          message: `El ejercicio ${exercise.exercise_id} no existe`,
        });
      }
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

const updateWorkout = async (id, userId, data) => {
  const fields = [];
  const values = [];

  if (data.name !== undefined) {
    fields.push("name = ?");
    values.push(data.name);
  }

  if (data.description !== undefined) {
    fields.push("description = ?");
    values.push(data.description);
  }

  if (data.comments !== undefined) {
    fields.push("comments = ?");
    values.push(data.comments);
  }

  if (data.scheduled_at !== undefined) {
    fields.push("scheduled_at = ?");
    values.push(data.scheduled_at);
  }

  if (data.status !== undefined) {
    fields.push("status = ?");
    values.push(data.status);
  }

  if (fields.length === 0) {
    return false;
  }

  values.push(id, userId);

  const [result] = await pool.query(
    `
        UPDATE workouts
        SET ${fields.join(", ")}
        WHERE id = ?
          AND user_id = ?
        `,
    values,
  );

  return result.affectedRows > 0;
};

const deleteWorkout = async (id, userId) => {
  const [result] = await pool.query(
    `
        DELETE FROM workouts
        WHERE id = ?
          AND user_id = ?
        `,
    [id, userId],
  );

  return result.affectedRows > 0;
};

const exerciseExists = async (exerciseId) => {
  const [rows] = await pool.query("SELECT id FROM exercises WHERE id = ?", [
    exerciseId,
  ]);

  return rows.length > 0;
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  getWorkoutExercises,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  exerciseExists,
};
