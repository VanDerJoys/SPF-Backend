const Project = require('../../model/Schemas/project');
// const Account = require('../../model/Schemas/account');

class ProjectController{
    
    async createProject(projectName){
        const project = new Project({ name: projectName, archived:false });
        try {
            let message = await project.save();
            return message;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

// get multiple projects
    async getProjects(){
        try {
            let projects = await Project.find();
            return projects;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateProject(id, name){
        try {
            let project = await Project.updateOne({"_id":id}, {name: name})
            return project;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    
    async deleteProject(id){
        try {
            let project = await Project.deleteOne({"_id": id});            
            return project;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

// get a single project
    async getProject(id){
        try {
            let project = await Project.findOne({"_id": id});
            return project;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ProjectController;