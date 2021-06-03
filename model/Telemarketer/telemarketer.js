const connection = require('../../config/database');

class MarketerModel{
    getMarketer() {
        return new Promise((resolve, reject) => {
            connection.query(`CALL getMarketer()`, (err, results) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(results);
                }
            })
        })
    }

    createBase(id, nom){
        return new Promise((resolve, reject) => {
            connection.query(`CALL createBase(${id}, '${nom}')`, (err, results) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("Base créée");
                }
            })
        })
    }

    assignBase(id_base, id_user){
        return new Promise((resolve, reject) => {
            connection.query(`CALL assignBase(${id_base}, ${id_user})`, (err, results) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("Base attribuée");
                }
            })
        })
    }
}

module.exports = MarketerModel;