const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Replace these with your actual database credentials
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'dubizzle_clone',
    port: 3306                // ✅ Port is a separate field
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1); // Exit if DB connection fails
  }
  console.log('Connected to MySQL database!');
});

// Example route to test database connection
app.get('/test-db', (req, res) => {
  db.query('SELECT * FROM dubizzle_clone.real_estate', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ server_time: results[0] });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});