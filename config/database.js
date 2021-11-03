const mongoose = require('mongoose');
function databaseInit(){
    // database initialisation
    mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Connected to database...");
    }).catch(error => console.log(error));
}

module.exports = databaseInit;