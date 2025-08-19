const pool = require('../config/dbconfig');
// Functions for useing
function getMySQLDateTimeNow() {
  const now = new Date();
  return now.toISOString().slice(0, 19).replace('T', ' ');
};
function getMySQLDateTimePlus5Min() {
  const dt = new Date(Date.now() + 5 * 60 * 1000);
  return dt.toISOString().slice(0, 19).replace('T', ' ');
};


// data base functions
exports.create = async (fields) => {
  //p_action, p_user_id, p_full_name, p_phone_number, p_whatsapp_number, p_email, p_user_name, p_password, p_type, p_state, p_created_by, p_last_updated_by, p_created_date, p_updated_date p_otp_code p_otp_expires_at
  const timenow = getMySQLDateTimeNow()
  const [rows] = await pool.query(
     
    'CALL sp_crud_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    ["create",null,null,fields.phone_number,null,fields.email,fields.user_name,fields.password,"user","inactivated",fields.user_name,fields.created_by,timenow,null,null,null]
  );
  // console.log(rows[0][0]);
  return rows[0][0];
};

exports.login=async(fields)=>{
  const [rows]=await pool.query(
    'CALL sp_crud_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    ["login",null,null,null,null,fields.email,null,null,null,null,null,null,null,null,null,null]
  );
  // console.log(rows);
  return rows[0][0];
};

exports.verifyOtpById = async (fields) => {
  const [rows] = await pool.query(
    'CALL sp_crud_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    ["activate", fields.user_id, null, null, null,null, null, null, null, null, null, null, null, null, fields.otp_code, null]
  );
  return rows[0][0]; 
};

exports.setOtp = async (fields) => {
  const otpExpiresDate=getMySQLDateTimePlus5Min();
  const [rows] = await pool.query(
    'CALL sp_crud_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    ["update", fields.user_id, null, null, null,null, null, null, null, null, null, null, null, null, fields.otp_code, otpExpiresDate]
  );
  return rows[0][0]; 
};