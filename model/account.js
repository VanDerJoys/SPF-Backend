const connection = require('../config/database');
class Model {
    register(nom, prenom, tel, password, type) {
        return new Promise((resolve, reject) => {
            connection.query(`CALL register('${nom}', '${prenom}', '${tel}', '${password}', '${type}')`, (err, results) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve('Enregistrement effectué');
                }
            })
        })
    }

    findUser(tel) {
        return new Promise((resolve, reject) => {
            connection.query(`CALL findUser('${tel}');`, (err, results) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve(results);
                }
            });
        })
    }
}

module.exports = Model;

