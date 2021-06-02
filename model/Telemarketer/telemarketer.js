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
}

module.exports = MarketerModel;