const pool = require("../config/db");

const getAllExercises = async (filters = {}) => {
  const { category, muscle_group } = filters;

  let sql = "SELECT * FROM exercises";
  const values = [];
  const conditions = [];

  if (category) {
    conditions.push("category = ?");
    values.push(category);
  }

  if (muscle_group) {
    conditions.push("muscle_group = ?");
    values.push(muscle_group);
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  sql += " ORDER BY id ASC";

  const [rows] = await pool.query(sql, values);
  return rows;
};

const getExerciseById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM exercises WHERE id = ?", [id]);
  return rows[0];
};

const createExercise = async (data) => {
  const { name, description, category, muscle_group } = data;

  const [result] = await pool.query(
    `INSERT INTO exercises (name, description, category, muscle_group)
     VALUES (?, ?, ?, ?)`,
    [name, description, category, muscle_group],
  );

  return result.insertId;
};

const updateExercise = async (id, data) => {
  const { name, description, category, muscle_group } = data;

  const [result] = await pool.query(
    `UPDATE exercises
     SET name = ?, description = ?, category = ?, muscle_group = ?
     WHERE id = ?`,
    [name, description, category, muscle_group, id],
  );

  return result.affectedRows > 0;
};

const partialUpdateExercise = async (id, data) => {
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
  if (data.category !== undefined) {
    fields.push("category = ?");
    values.push(data.category);
  }
  if (data.muscle_group !== undefined) {
    fields.push("muscle_group = ?");
    values.push(data.muscle_group);
  }

  if (fields.length === 0) {
    return false;
  }

  values.push(id);

  const [result] = await pool.query(
    `UPDATE exercises SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );

  return result.affectedRows > 0;
};

const deleteExercise = async (id) => {
  const [result] = await pool.query("DELETE FROM exercises WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  partialUpdateExercise,
  deleteExercise,
};
