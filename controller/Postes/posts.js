const Marketer = require("../../model/Telemarketer/telemarketer");
const Post = require('../../model/Schemas/post');
const Account = require('../../model/Schemas/account');

class MarketerController{
    async getMarketer(){
        let populateQuery = [
            {path:'post', model: Post, select: {_id: 0, __v: 0, created_at: 0}}, 
            {path:'account', model: Account, select: {_id: 0, __v: 0, password: 0, created_at: 0}}
        ];
        try {
            let response = await Marketer
            .find()
            .select({_id: 0, __v: 0})
            .populate(populateQuery);
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async createBase(id, nom){
        try {
            let response = await db.createBase(id, nom);
            return {code: 200, message: response};
        } catch (error) {
            console.log(error);
            return {code: 400, message: "Une erreur est survenue"};
        }
    }

    async assignBase(id_base, id_user){
        try {
            let response = await db.assignBase(id_base, id_user);
            return {code: 200, message: response};
        } catch (error) {
            console.log(error);
            return {code: 400, message: "Une erreur est survenue"};
        }
    }

    async createPost(postName){
        const post = new Post({ name: postName });
        try {
            let message = await post.save();
            return message;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
// get multiple posts
    async getPosts(){
        try {
            let post = await Post.find();
            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updatePost(id, name){
        try {
            let post = await Post.updateOne({"_id":id}, {name: name})
            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deletePost(id){
        try {
            let post = await Post.deleteOne({"_id": id});            
            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
// get a single post
    async getPost(id){
        try {
            let post = await Post.findOne({"_id": id});
            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = MarketerController;