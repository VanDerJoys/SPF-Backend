const connection = require('../../config/database');

class AgendaModel{
    addAgenda(id, intitule, date_heure){
        return new Promise((resolve, reject) => {
            connection.query(`CALL addAgenda(${id}, '${intitule}', '${date_heure}')`, (err, results) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("Agenda enregistré");
                }
            })
        })
    }

    deleteAgenda(id){
        return new Promise((resolve, reject) => {
            connection.query(`CALL deleteAgenda(${id})`, (err, results) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("Agenda supprimé");
                }
            })
        })
    }

    updateAgenda(id, intitule, date_heure){
        return new Promise((resolve, reject) => {
            connection.query(`CALL updateAgenda(${id}, '${intitule}', '${date_heure}')`, (err, results) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("Agenda modifié");
                }
            })
        })
    }

    getAgenda(){
        return new Promise((resolve, reject) => {
            connection.query(`CALL getAgenda()`, (err, results) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(results[0]);
                }
            })
        })
    }

    getOneAgenda(id){
        return new Promise((resolve, reject) => {
            connection.query(`CALL getOneAgenda(${id})`, (err, results) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(results[0]);
                }
            })
        })
    }
}

module.exports = AgendaModel;