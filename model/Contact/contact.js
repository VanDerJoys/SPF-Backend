const connection = require('../../config/database');

class ContactModel{
    addContact(id, nom, telephone, localisation, statut) {
        return new Promise((resolve, reject) => {
            connection.query(`CALL addContact(${id}, '${nom}', '${telephone}', '${localisation}', '${statut}')`, (err, results) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("Contact enregistré");
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

    changeStatus(telephone, statut){
        return new Promise((resolve, reject) => {
            connection.query(`CALL changeStatus('${telephone}', '${statut}')`, (err, results) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("Statut modifié");
                }
            })
        })
    }
}

module.exports = ContactModel;