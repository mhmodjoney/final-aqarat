const { Result } = require('express-validator');
const pool = require('../config/dbcfg');



// IN p_action ,
// IN p_real_estate_id  ,
// IN p_title  ,
// IN p_description  ,
// IN p_price  ,
// IN p_currency  ,
// IN p_city  ,
// in p_address  ,
// in p_longitude  ,
// in p_latitude  ,
// IN p_type  ,
// in p_rooms_number  ,
// in p_baths_number  ,
// IN p_purpose  ,
// in p_object  ,
// IN p_state  ,
// IN p_created_by  ,
// in p_size  ,
// IN p_user_id ,
// in p_furnished ,
// IN p_min_price ,
// IN p_max_price ,
// IN p_sort_by 

exports.getRealEstate = async (filters) => {
  const {
    real_estate_id = null,
    currency = null,
    city = null,
    address = null,
    longitude = null,
    latitude = null,
    type = null,
    rooms_number = null,
    baths_number = null,
    purpose = null,
    object = null,
    state = null,
    created_by = null,
    size = null,
    user_id = null,
    furnished = null,
    min_price = null,
    max_price = null,
    sort_by = null,
    page=null
  } = filters;
  
  const [rows] = await pool.query(
    'CALL sp_crud_real_estate(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    ['search', real_estate_id, null, null, null, currency, city, address, longitude, latitude, type, rooms_number, baths_number, purpose, object, state, created_by, size, user_id, furnished, min_price, max_price, sort_by,page]
  );
  // console.log(rows);
  
  return rows;
};

exports.create = async (fields) => {
  const {
    title=null,
    description=null,
    price=null,
    currency=null,
    city=null,
    address=null,
    longitude=null,
    latitude=null,
    type=null,
    rooms_number=null,
    baths_number=null,
    purpose=null,
    object=null,
    size=null,
    user_id=null,
    furnished=null
  } = fields;
  
  // console.log(fields);
  const [rows] = await pool.query(
    'CALL sp_crud_real_estate(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    ['insert', null, title, description, price, currency, city, address, longitude, latitude, type, rooms_number, baths_number, purpose, object, null, null, size, user_id, furnished, null, null, null,null]
  );
  
  return rows[0][0];
};

exports.update = async (fields) => {
  const {
    real_estate_id=null,
    title=null,
    description=null,
    price=null,
    currency=null,
    city=null,
    address=null,
    longitude=null,
    latitude=null,
    type=null,
    rooms_number=null,
    baths_number=null,
    purpose=null,
    object=null,
    state=null,
    created_by=null,
    size=null,
    user_id=null,
    furnished=null
  } = fields;
  
  const [rows] = await pool.query(
    'CALL sp_crud_real_estate(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    ['update', real_estate_id, title, description, price, currency, city, address, longitude, latitude, type, rooms_number, baths_number, purpose, object, state, created_by, size, user_id, furnished, null, null, null,null]
  );
  // console.log(rows);

  return rows[0][0];
};

exports.delete = async (data) => {
  const { user_id, real_estate_id } = data;
  // console.log(data);
  
  const [rows] = await pool.query(
    'CALL sp_crud_real_estate(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    ['delete', real_estate_id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, user_id, null, null, null, null,null]
  );
  // console.log(rows);
  
  return rows[0][0];
};

exports.getByOwner = async (user_id) => {
  const [rows] = await pool.query(
    'CALL sp_crud_real_estate(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    ['owner', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, user_id, null, null, null, null,null]
  );
  // console.log(rows);
  
  return rows;
};