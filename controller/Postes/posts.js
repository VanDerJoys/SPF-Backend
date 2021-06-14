const Marketer = require("../../model/Telemarketer/telemarketer");

const db = new Marketer();
class MarketerController{
    async getMarketer(){
        try {
            let response = await db.getMarketer();
            return response[0];
        } catch (error) {
            console.log(error);
        }
    }

    async createBase(id, nom){
        try {
            let response = await db.createBase(id, nom);
            return {code: 200, message: response};
        } catch (error) {
            console.log(error);
            return {code: 400, message: "Une erreur est survenue"};
        }
    }

    async assignBase(id_base, id_user){
        try {
            let response = await db.assignBase(id_base, id_user);
            return {code: 200, message: response};
        } catch (error) {
            console.log(error);
            return {code: 400, message: "Une erreur est survenue"};
        }
    }
}

module.exports = MarketerController