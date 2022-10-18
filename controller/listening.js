const Listening = require("../model/Schemas/Listening");

class ListeningController{
    constructor(observation, post){
        this.post = post;
        this.observation = observation;
    }

    async createListening(){
        try{
            const listening = new Listening({
                post: this.post,
                observation: this.observation
            });
            const results = await listening.save();
            return results;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async getListenings(){
        try{
            const listenings = await Listening.find({}, {__v: 0});
            return listenings;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async deleteListening(id){
        try{
            await Listening.deleteOne({_id: id});
            return {
                status: 200,
                message: "Ecoute supprimée"
            }
        }catch(error){
            console.log(error);
            throw {status: 400, message: "Une erreur est survenue"}
        }
    }

    async upload(id, path){
        try {
            const listening = await Listening.updateOne({_id: id}, {filePath: path});
            return listening;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

module.exports = ListeningController;