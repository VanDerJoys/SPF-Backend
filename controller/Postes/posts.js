const Marketer = require("../../model/Schemas/account");

class MarketerController{
    async getMarketer(){
        try {
            let response = await Marketer.find({type: "Télévendeur"}, {"password": 0, "created_at":0});
            return response;
        } catch (error) {
            console.log(error);
            return error;
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