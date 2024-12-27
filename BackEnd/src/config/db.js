const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'CEO'
})

connection.connect((err) => {
    if(err){
        throw err
    } else {
        console.log('Banco conectado')
    }
})

module.exports = connection