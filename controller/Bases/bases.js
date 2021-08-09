const Base = require('../../model/Schemas/base');
// const Account = require('../../model/Schemas/account');

class BaseController{
    async getBase(){
        /* let populateQuery = [
            {path:'Base', model: Base, select: {_id: 0, __v: 0, created_at: 0}}, 
            {path:'account', model: Account, select: {_id: 0, __v: 0, password: 0, created_at: 0}}
        ]; */
        try {
            let response = await Base
            .find()
            .populate("base_id");
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getAvailableBases(){
        try {
            let bases = await Base.find({available: true});
            return bases;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createBase(baseName){
        try {
            const base = new Base({ name: baseName });
            let message = await base.save();
            return message;
        } catch (error) {
            console.log("Controller: "+error);
            throw error;
        }
    }

// get multiple Bases
    async getBases(){
        try {
            let bases = await Base
            .find({}, {__v: 0, created_at: 0})
            .populate("post_id");
            return bases;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateBase(id, name){
        try {
            let base = await Base.updateOne({"_id":id}, {name: name})
            return base;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async assignBase(baseId, postId){
        try{
            let base = await Base.updateOne({_id: baseId}, {post_id: postId});
            return base;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

// get a single Base
    async getBase(id){
        try {
            let base = await Base.findOne({"_id": id}, {__v: 0, created_at: 0}).populate('post_id');
            return base;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = BaseController;