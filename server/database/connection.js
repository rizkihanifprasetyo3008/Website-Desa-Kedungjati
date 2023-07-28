const mysql = require('mysql');

// create db connection using function
const db_kedungjati = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_kedungjati'
});

module.exports = db_kedungjati;