// config/promise.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ceo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 30000,
  timeout: 30000,
  connectTimeout: 10000,
  idleTimeout: 60000,
  maxIdle: 10,
});

// Exporte o pool diretamente, não como um objeto
module.exports = pool;