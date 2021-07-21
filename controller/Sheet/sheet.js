let path = require('../../helpers/path');

class Calls{
    constructor(project_name,id){
        this.projectName = project_name;
        this.id = id;
    }

    async createSheet(){
        try{
            const CallSchema = require(path(this.projectName));
            let callSheet = new CallSchema({
                post: this.id
            });
            let results = await callSheet.save();
            return results;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async addCall(contacts){
        try {
            const CallSchema = require(path(this.projectName));
            let call = await CallSchema.updateOne(
                {_id: this.id}, 
                {$addToSet: {calls: {$each: contacts}}}
            );
            return call;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}   

module.exports = Calls;