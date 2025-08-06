const pool = require('../config/dbconfig');
//p_action VARCHAR(10),
//p_real_estate_id INT,
//p_title VARCHAR(150),
//p_description TEXT,
//p_price DECIMAL(20,2),
//p_currency VARCHAR(10),
//p_city VARCHAR(100),
//p_region VARCHAR(100),
//p_type VARCHAR(50),
//p_purpose VARCHAR(50),
//p_status VARCHAR(50),
//p_created_by VARCHAR(50),
//p_user_id INT

exports.getRealEstate = async (filters) => {
  const {
    real_estate_id = null,
    min_price = null,
    max_price = null,
    currency = null,
    city = null,
    region = null,
    type = null,
    purpose = null,
    sort_column = null,
    sort_order = null
  } = filters;

  const [rows] = await pool.query(
    'CALL sp_get_real_estate(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [real_estate_id, min_price, max_price, currency, city, region, type, purpose, sort_column, sort_order]
  );

  // console.log(   'CALL sp_get_real_estate(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  //   [real_estate_id, min_price, max_price, currency, city, region, type, purpose, sort_column, sort_order])
  return rows[0];
};

exports.create = async (data)=>{
  const {estateData,owner} = data;

  const [rows] = await pool.query(
    'CALL sp_crud_real_estate(?,?,?,?,?,?,?,?,?,?,?,?,?)',
    ['insert',null,estateData.title,estateData.description,estateData.price,estateData.city,estateData.region,estateData.type,estateData.purpose,"activated",null,owner]
  );

// console.log(   'CALL sp_get_real_estate(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//   [real_estate_id, min_price, max_price, currency, city, region, type, purpose, sort_column, sort_order])
return rows[0];
};

exports.delete = async (data)=>{
  const {user_id,real_estate_id}=data;
  const [rows] = await pool.query(
    'CALL sp_crud_real_estate(?,?,?,?,?,?,?,?,?,?,?,?,?)',
    ['delete',real_estate_id,null,null,null,null,null,null,null,null,null,user_id]
  );
  return rows[0][0];
};