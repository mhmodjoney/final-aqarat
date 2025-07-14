const pool = require('../dbconfig');

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

  return rows[0];
};
