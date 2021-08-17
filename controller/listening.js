const Listening = require("../model/Schemas/Listening");;

class ListeningController{
    constructor(post_id, hours, duration, notes, observation, actions){
        this.post_id = post_id;
        this.hours = hours;
        this.duration = duration;
        this.notes = notes;
        this.observation = observation;
        this.actions = actions;
    }

    async createListening(){
        try{
            const listening = new Listening({
                post_id: this.post_id,
                hours: this.hours,
                duration: this.duration,
                notes: this.notes,
                observation: this.observation,
                actions: this.actions
            });
            const results = await listening.save();
            return results;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async getPostListenings(post_id){
        try{
            const listenings = await Listening.find({post_id: post_id}, {__v: 0});
            return listenings;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async getListenings(){
        try{
            const listenings = await Listening.find({}, {__v: 0}).populate('post_id');
            return listenings;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async deleteListening(id){
        try{
            const listening = await Listening.deleteOne({_id: id});
            return listening;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

}

module.exports = ListeningController;