const mysql = require('mysql2/promise');

// Database configuration matching your screenshot and provided credentials
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'job_portal_updatedl',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Enable JSON parsing for JSON columns
  typeCast: function (field, next) {
    if (field.type === 'JSON') {
      return JSON.parse(field.string());
    }
    return next();
  }
});

module.exports = pool;
