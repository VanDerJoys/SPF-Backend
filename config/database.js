/* const mysql = require('mysql');

// production
const connection = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "spf",
    "port": 3306
});

module.exports = connection; */
const mongoose = require('mongoose');
function databaseInit(){
    // database initialisation
    mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(() => {
        console.log("Connected to database...");
    }).catch(error => console.log(error));
}

module.exports = databaseInit;