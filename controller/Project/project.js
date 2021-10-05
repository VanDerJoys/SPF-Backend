const Project = require('../../model/Schemas/project');
const Contact = require('../../model/Schemas/contacts');
const ManageProject = require('../../model/Schemas/gestion_projet');
// const Account = require('../../model/Schemas/account');

class ProjectController{
    
    async createProject(name, path){
        const project = new Project({ name: name, path: path });
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
            let projects = await Project.find({}, {__v: 0, created_at: 0});
            return projects;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateProject(id, name){
        try {
            let project = await Project.updateOne({"_id":id}, {name: name});
            return project;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteProject(id){
        try {
            await Project.deleteOne({"_id": id});    
            await Contact.deleteMany({"project_id": id});
            let project = await ProjectManager.deleteMany({"project": id});        
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

// assign project to post
    async assignPost(projectId, postId){
        try {
            let items = [];
            for (let i = 0; i < postId.length; i++) {
                items.push({projectId: projectId, postId: postId[i]});
            }
            let results = await ManageProject.insertMany(items);
            return results;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = ProjectController;