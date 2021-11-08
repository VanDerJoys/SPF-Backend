const Listening = require("../model/Schemas/Listening");

class ListeningController{
    constructor(observation, finalNote, comment6, note6, comment5, note5, comment4, note4, comment3, note3, comment2, note2, comment1, note1, post){
        this.post = post;
        this.finalNote = finalNote;
        this.comment5 = comment6;
        this.note5 = note6;
        this.comment5 = comment5;
        this.note5 = note5;
        this.comment4 = comment4;
        this.note4 = note4;
        this.comment3 = comment3;
        this.note3 = note3;
        this.comment2 = comment2;
        this.note2 = note2;
        this.comment1 = comment1;
        this.note1 = note1;
        this.observation = observation;
    }

    async createListening(){
        try{
            const listening = new Listening({
                post: this.post,
                finalNote: this.finalNote,
                comment6: this.comment6,
                note6: this.note6,
                comment5: this.comment5,
                note5: this.note5,
                comment4: this.comment4,
                note4: this.note4,
                comment3: this.comment3,
                note3: this.note3,
                comment2: this.comment2,
                note2: this.note2,
                comment1: this.comment1,
                note1: this.note1,
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
            const listening = await Listening.deleteOne({_id: id});
            return listening;
        }catch(error){
            console.log(error);
            throw error;
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