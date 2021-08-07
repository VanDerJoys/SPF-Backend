const Projet = require('../../model/Schemas/project');
const Account = require('../../model/Schemas/account');

class ProjetController{
    // async getMarketer(){
    //     let populateQuery = [
    //         {path:'post', model: Post, select: {_id: 0, __v: 0, created_at: 0}}, 
    //         {path:'account', model: Account, select: {_id: 0, __v: 0, password: 0, created_at: 0}}
    //     ];
    //     try {
    //         let response = await Marketer
    //         .find()
    //         .select({_id: 0, __v: 0})
    //         .populate(populateQuery);
    //         return response;
    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     }
    // }

    

    async createProjet(projetName){
        const projet = new Projet({ name: projetName, archived:false });
        try {
            let message = await projet.save();
            return message;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

// get multiple projets
    async getProjets(){
        try {
            let projets = await Projet.find();
            return projets;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateProjet(id, name){
        try {
            let projet = await Projet.updateOne({"_id":id}, {name: name})
            return projet;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    
    async deleteProjet(id){
        try {
            let projet = await Projet.deleteOne({"_id": id});            
            return projet;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

// get a single projet
    async getProjet(id){
        try {
            let projet = await Projet.findOne({"_id": id});
            return projet;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ProjetController;