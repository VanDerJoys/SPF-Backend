const Base = require("../../model/Tchopetyamo/base");

class BaseController{
    async createBase(project, name){
        const base = new Base({
            project: project,
            name: name
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
    async getBases(project){
        try {
            let bases = await Base.find({project: project});
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
    async getBase(id){
        try {
            let base = await Base.findOne({"_id": id});
            return base;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = BaseController;