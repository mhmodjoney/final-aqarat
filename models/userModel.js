const pool = require('../config/dbconfig');

// CREATE USER
exports.createUser = async ({ email, password, ...otherFields }) => {
  // Add other fields as needed (e.g., name, phone)
  const [rows] = await pool.query(
    'CALL sp_create_user(?, ?, ?)', // Adjust parameters as per your stored procedure
    [email, password, otherFields.name || null] // Add more fields as needed
  );
  // Assuming the stored procedure returns the new user's ID
  return { id: rows[0][0].id, email, ...otherFields };
};

// UPDATE USER
exports.updateUser = async (userId, updateFields) => {
  // Example: updateFields = { email, password, name }
  const [rows] = await pool.query(
    'CALL sp_update_user(?, ?, ?, ?)', // Adjust as per your stored procedure
    [
      userId,
      updateFields.email || null,
      updateFields.password || null,
      updateFields.name || null
    ]
  );
  return rows;
};

// DELETE USER
exports.deleteUser = async (userId) => {
  const [rows] = await pool.query(
    'CALL sp_delete_user(?)',
    [userId]
  );
  return rows;
};

// GET USER BY EMAIL (for login)
exports.getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    'CALL sp_get_user_by_email(?)',
    [email]
  );
  // Assuming the stored procedure returns user info in the first row
  return rows[0][0];
};

// GET USER BY ID (optional, for profile)
exports.getUserById = async (userId) => {
  const [rows] = await pool.query(
    'CALL sp_get_user_by_id(?)',
    [userId]
  );
  return rows[0][0];
};