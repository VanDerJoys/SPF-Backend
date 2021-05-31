const mysql = require('mysql');

// production
const connection = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "spf",
    "port": 3306
});

module.exports = connection;