const Base = require("../../model/Tchopetyamo/base");

class BaseController{
    async createBase(name, post){
        const base = new Base({
            name: name,
            post: post
        })
        try {
            let response = await base.save();
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

// get multiple bases
    async getBases(){
        try {
            let bases = await Base.find().populate('contacts')
            return bases;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateBase(id, project, name){
        try {
            let base = await Base.updateOne({"_id":id}, {project: project, name: name})
            return base;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteBase(id){
        try {
            let base = await Base.deleteOne({"_id": id});            
            return base;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
// get a single base
    async getSingleBase(id){
        try {
            let base = await Base.findOne({"_id": id}).populate('contacts');
            return base;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = BaseController;