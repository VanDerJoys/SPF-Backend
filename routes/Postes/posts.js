const express = require('express');
const MarketerController = require('../../controller/Postes/posts');
// const { verifyToken } = require('../../helpers/web-token');

const marketer = new MarketerController();

const router = express.Router();

// get all telemarketers
/* router.get('/', (req, res)=>{
    marketer.getMarketer().then(results =>{
        res.status(200).send(results);
    }).catch(error =>{
        console.log(error);
        res.status(400).send("Une erreur est survenue");
    });
}); */

// Create a new post
router.post('/', (req, res)=>{
    marketer.createPost(req.body.name).then(response =>{
        res.status(201).send(response);
    }).catch(error =>{
        console.log(error);
        res.send(400).send('Une erreur est survenue');
    })
})

// Get all posts
router.get('/', (req, res)=>{
    marketer.getPosts().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// get available posts
router.get('/available', (req, res)=>{
    marketer.getAvailablePosts().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// Get a single post
router.get('/:post_id', (req, res)=>{
    marketer.getPost(req.params.post_id).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

router.put('/:post_id', (req, res)=>{
    marketer.updatePost(req.params.idPost, req.body.name).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue')
    })
});

// assign a post to an account
router.put('/:post_id/account/:account_id', (req, res)=>{
    marketer.assignPost(req.params.post_id, req.params.account_id).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

module.exports = router;