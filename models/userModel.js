const pool = require('../config/dbconfig');

function getMySQLDateTimeNow() {
  const now = new Date();
  return now.toISOString().slice(0, 19).replace('T', ' ');
};

exports.delete = async (fields) => {

  //p_action, p_user_id, p_full_name, p_phone_number, p_whatsapp_number, p_email, p_user_name, p_password, p_type, p_state, p_created_by, p_last_updated_by, p_created_date, p_updated_date p_otp_code p_otp_expires_at
  const [rows] = await pool.query(
     
    'CALL sp_crud_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    ["delete",fields.user_id,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
  );
  
  // console.log(rows[0][0]);
  return rows[0][0];
};

exports.update = async (fields) => {
  //p_action, p_user_id, p_full_name, p_phone_number, p_whatsapp_number, p_email, p_user_name, p_password, p_type, p_state, p_created_by, p_last_updated_by, p_created_date, p_updated_date p_otp_code p_otp_expires_at
  const timenow = getMySQLDateTimeNow()
  console.log(timenow);
  const [rows] = await pool.query(
    
    'CALL sp_crud_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    ["update",null,fields.full_name,fields.phone_number,fields.whatsapp_number,fields.email,fields.user_name,fields.password,null,null,null,fields.user_name,null,null,null,null]
  );
  return rows[0][0];
};

exports.profile = async (fields)=> {
  const [rows] = await pool.query(
    'CALL sp_crud_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    ["user_id",fields.user_id,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
  )
  return rows[0][0];

};