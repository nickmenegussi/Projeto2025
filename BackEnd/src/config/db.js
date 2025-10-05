const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT
})

connection.connect((err) => {
    if(err){
        throw err
    } else {
        console.log('Banco conectado')
    }
})

module.exports = connection