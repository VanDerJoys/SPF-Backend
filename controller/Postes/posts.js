const Post = require('../../model/Schemas/post');
// const Account = require('../../model/Schemas/account');

class PostController{
    async getMarketer(){
        /* let populateQuery = [
            {path:'post', model: Post, select: {_id: 0, __v: 0, created_at: 0}}, 
            {path:'account', model: Account, select: {_id: 0, __v: 0, password: 0, created_at: 0}}
        ]; */
        try {
            let response = await Post
            .find()
            .select({_id: 0, __v: 0, base_id: 0})
            .populate({path:'account', select: {_id: 0, __v: 0, password: 0, created_at: 0}});
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getAvailablePosts(){
        try {
            let posts = await Post.find({available: false}, {__v: 0});
            return posts;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createPost(name){
        const post = new Post({ name: name });
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
            let posts = await Post
            .find({}, {__v: 0, available: 0, created_at: 0})
            .populate({path:'account', select: {__v: 0, password: 0, created_at: 0, _id: 0, archived: 0}});
            return posts;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updatePost(id, name){
        try {
            let post = await Post.updateOne({_id:id}, {name: name})
            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async assignPost(postId, accountId){
        try{
            let post = await Post.updateOne({_id: postId}, {account: accountId, available: false});
            return post;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

// get a single post
    async getPost(id){
        try {
            let post = await Post
            .findOne({"_id": id}, {__v: 0})
            .populate({path:'account', select: {__v: 0, password: 0, created_at: 0}});
            return post;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = PostController;