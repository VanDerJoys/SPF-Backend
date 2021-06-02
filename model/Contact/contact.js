const connection = require('../../config/database');

class ContactModel{
    addContact(id, nom, telephone, localisation) {
        return new Promise((resolve, reject) => {
            connection.query(`CALL addContact(${id}, '${nom}', '${telephone}', '${localisation}')`, (err, results) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(results);
                }
            })
        })
    }

    getContacts(){
        return new Promise((resolve, reject) => {
            connection.query(`CALL getContacts()`, (err, results) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(results);
                }
            })
        })
    }
}

module.exports = ContactModel;