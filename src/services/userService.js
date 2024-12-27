const db = require('../utils/db');

exports.getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};

exports.createUser = async (adminData) => {
  const { name, username, password, role } = adminData;

  // Check if the username already exists
  const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  if (existingUser.length > 0) {
    throw new Error('Username already exists');
  }

  const [result] = await db.query('INSERT INTO users (name, username, password, role, created_at) VALUES (?, ?, ?, ?, ?)', [name, username, password, role, new Date()]);
  return { id: result.insertId, name, username, password, role };
};

exports.updateUser = async (id, userData) => {
  const { name, username, password, role } = userData;
  const [result] = await db.query('UPDATE users SET name = ?, username = ?, password = ?, role = ?, updated_at = ? WHERE id = ?', [name, username, password, role, new Date(), id]);
  if (result.affectedRows === 0) {
    throw new Error('User not found');
  }
  return { id, name, username, password, role };
};

exports.deleteUser = async (id) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  if (result.affectedRows === 0) {
    throw new Error('User not found');
  }
};