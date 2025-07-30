const pool = require('../config/dbconfig');
function getMySQLDateTimeNow() {
  const now = new Date();
  return now.toISOString().slice(0, 19).replace('T', ' ');
}

// CREATE USER
exports.create = async (fields) => {
  //p_action, p_user_id, p_full_name, p_phone_number, p_whatsapp_number, p_email, p_user_name, p_password, p_type, p_state, p_created_by, p_last_updated_by, p_created_date, p_updated_date 
  const timenow = getMySQLDateTimeNow()
  console.log(timenow); 
  const [rows] = await pool.query(
     
    'CALL sp_crud_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    ["create",null,fields.full_name,fields.phone_number,fields.whatsapp_number,fields.email,fields.user_name,fields.password,fields.type,"activated",fields.user_name,fields.user_name,timenow,timenow]
  );
  // Assuming the stored procedure returns the new user's ID
  // console.log(rows[0][0]);
  return rows[0][0];
};

// UPDATE USER
exports.updateUser = async (fields) => {
  //p_action, p_user_id, p_full_name, p_phone_number, p_whatsapp_number, p_email, p_user_name, p_password, p_type, p_state, p_created_by, p_last_updated_by, p_created_date, p_updated_date 
  const timenow = getMySQLDateTimeNow()
  console.log(timenow);
  const [rows] = await pool.query(
    
    'CALL sp_crud_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    ["update",null,fields.full_name,fields.phone_number,fields.whatsapp_number,fields.email,fields.user_name,fields.password,fields.type,"activated",fields.user_name,fields.user_name,null,timenow]
  );
  // Assuming the stored procedure returns the new user's ID
  return {user_id:rows[0][0].id, email:email};
};

// DELETE USER
exports.deleteUser = async (fields) => {
  const [rows] = await pool.query(
    'CALL sp_crud_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    ["delete",fields.user_id,null,null,null,null,null,null,null,null,null,null,null,null]
  );
  return rows[0][0];
};
// make them more usable
// GET USER BY EMAIL (for login)
exports.getUserByEmail = async (fields) => {
  const [rows] = await pool.query(
    
    'CALL sp_crud_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    ['email',null, null, null, null, p_email,null, null, null, null, null, null, null, null]
  );
  return rows[0][0];
};

exports.getUserByUsername = async (fields) => {
  const [rows] = await pool.query(
    'CALL sp_get_user_by_user_name(?)',
    [fields.username]
  );
  return rows[0][0];
};

exports.login=async(fields)=>{
  const [rows]=await pool.query(
    'CALL sp_crud_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    ["login",null,null,null,null,fields.email,null,null,null,null,null,null,null,null]
  );
  // console.log(rows);
  return rows[0][0];
};