const express = require('express');
const MarketerController = require('../../controller/Postes/posts');
const { verifyToken } = require('../../helpers/web-token');

const marketer = new MarketerController();

const router = express.Router();

// get all telemarketers
router.get('/', (req, res)=>{
    marketer.getMarketer().then(results =>{
        res.status(200).send(results);
    }).catch(error =>{
        console.log(error);
        res.status(400).send("Une erreur est survenue");
    });
});



// Create a new post
router.post('/post/new', (req, res)=>{
    marketer.createPost(req.body.name).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.send(400).send('Une erreur est survenue');
    })
})

// Get all posts
router.get('/post', (req, res)=>{
    marketer.getPosts().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// get available posts
router.get('/post/available', (req, res)=>{
    marketer.getAvailablePosts().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// Get a single post
router.get('/post/:idPost', (req, res)=>{
    marketer.getPost(req.params.idPost).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

router.put('/post/:idPost', (req, res)=>{
    marketer.updatePost(req.params.idPost, req.body.name).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue')
    })
});

// assign a post to an account
router.put('/post', (req, res)=>{
    marketer.assignPost(req.body.postId, req.body.accountId).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

router.delete('/post/:idPost', (req, res)=>{
    marketer.deletePost(req.params.idPost).then(response =>{
        res.status(200).send(Boolean(response.deletedCount));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

module.exports = router;