const pool = require('../config/dbconfig');
function getMySQLDateTimeNow() {
  const now = new Date();
  return now.toISOString().slice(0, 19).replace('T', ' ');
}
