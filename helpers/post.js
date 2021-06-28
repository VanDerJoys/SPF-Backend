const Post = require('../model/Schemas/post');

async function checkPassword(postId){
    try {
        let post = await Post.findOne({_id: postId});
        return post.available;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = checkPassword