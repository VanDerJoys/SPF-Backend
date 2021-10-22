const Project = require('../../model/Schemas/project');
const Contact = require('../../model/Schemas/contacts2');
const ManageProject = require('../../model/Schemas/gestion_projet');
// const mongoose = require('mongoose');

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

    /* async updateProject(id, name){
        try {
            let project = await Project.updateOne({"_id":id}, {name: name});
            return project;
        } catch (error) {
            console.log(error);
            throw error;
        }
    } */

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

// get projects of single post
    async getPostProjects(id){
        try {
            let projects = await ManageProject.find({postId: id}, {created_at: 0, __v: 0})
            .populate({path: 'projectId', select: {__v: 0, archived: 0, path: 0, created_at: 0, _id: 0}})
            // .populate({path: 'postId', select: {__v: 0, archived: 0, path: 0, created_at: 0}})
            return projects;
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

    async removePostProject(id){
        try {
            let project = await ManageProject.deleteOne({_id: id});  
            return project;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getGroups(){
        try{
            let groups = await ManageProject
            .find({})
            .populate('projectId')
            .populate('postId')
            return groups;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }
}

module.exports = ProjectController;