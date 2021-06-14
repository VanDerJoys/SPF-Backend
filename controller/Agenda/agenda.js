const AgendaModel = require("../../model/Schemas/agenda");
const db = new AgendaModel();
class AgendaController{
    constructor(id, intitule, date_heure){
        this.id = id;
        this.intitule = intitule;
        this.date_heure = date_heure;
    }
    async addAgenda(){
        try {
            let response = await db.addAgenda(this.id, this.intitule, this.date_heure);
            return {code: 200, message: response};
        } catch (error) {
            console.log("Controller: "+error);
            return {code: 400, message: "Une erreur s'est produite"};
        }
    }

    async updateAgenda(id, intitule, date_heure){
        try {
            let response = await db.updateAgenda(id, intitule, date_heure);
            return {code: 200, message: response};
        } catch (error) {
            console.log("Controller: "+error);
            return {code: 400, message: "Une erreur s'est produite"};
        }
    }

    async getOneAgenda(id){
        try {
            let response = await db.getOneAgenda(id);
            return {code: 200, message: response};
        } catch (error) {
            console.log("Controller: "+error);
            return {code: 400, message: "Une erreur s'est produite"};
        }
    }

    async deleteAgenda(id){
        try {
            let response = await db.deleteAgenda(id);
            return {code: 200, message: response};
        } catch (error) {
            console.log("Controller: "+error);
            return {code: 400, message: "Une erreur s'est produite"};
        }
    }
}

module.exports = AgendaController;