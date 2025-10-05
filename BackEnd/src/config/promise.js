const mysql = require("mysql2/promise.js");

const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 30000, // 30 segundos para adquirir conexão
  timeout: 30000, // 30 segundos para timeout de query
  connectTimeout: 10000, // 10 segundos para conexão inicial
  idleTimeout: 60000, // 60 segundos para fechar conexões idle
  maxIdle: 10, // máximo de conexões idle
});

module.exports = pool;
