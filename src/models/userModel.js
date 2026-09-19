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

module.exports = {
  getAllUsers,
  getUserById,
};
