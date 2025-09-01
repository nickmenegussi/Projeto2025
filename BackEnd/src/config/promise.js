const mysql = require('mysql2/promise.js')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'CEO',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;