const pool = require("../config/db");

const getAllUsers = async () => {
  const [rows] = await pool.query(
    `SELECT id, name, email, created_at
         FROM users
         ORDER BY id ASC`,
  );

  return rows;
};

const getUserById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, name, email, created_at
         FROM users
         WHERE id = ?`,
    [id],
  );

  return rows[0];
};

const createUser = async (name, email, password) => {
  const [result] = await pool.query(
    `INSERT INTO users (name, email, password)
         VALUES (?, ?, ?)`,
    [name, email, password],
  );

  return result.insertId;
};

const getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `SELECT id, name, email, password, created_at
         FROM users
         WHERE email = ?`,
    [email],
  );

  return rows[0];
};

const updateUser = async (id, data) => {
  const fields = [];
  const values = [];

  if (data.name !== undefined) {
    fields.push("name = ?");
    values.push(data.name);
  }

  if (data.email !== undefined) {
    fields.push("email = ?");
    values.push(data.email);
  }

  if (data.password !== undefined) {
    fields.push("password = ?");
    values.push(data.password);
  }

  if (fields.length === 0) {
    return false;
  }

  values.push(id);

  const [result] = await pool.query(
    `UPDATE users
         SET ${fields.join(", ")}
         WHERE id = ?`,
    values,
  );

  return result.affectedRows > 0;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  getUserByEmail,
  updateUser,
};
