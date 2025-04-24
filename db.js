const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'biblioteca_tasi',
    port: 3306,
    connectionLimit: 10
})

module.exports = db;