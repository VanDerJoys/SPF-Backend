const express = require('express');
const MarketerController = require('../../controller/Postes/posts');
const { verifyToken } = require('../../helpers/web-token');

const marketer = new MarketerController();

const router = express.Router();

// Create telemarketer base
router.post('/new', verifyToken, (req, res)=>{
    marketer.createBase(req.body.id, req.body.nom).then(results =>{
        res.status(results.code).send(results.message);
    }).catch(error =>{
        console.log("Router: "+error);
    })
})

// get all telemarketers
router.get('/', (req, res)=>{
    marketer.getMarketer().then(results =>{
        res.status(200).send(results);
    }).catch(error =>{
        console.log(error);
        res.status(400).send("Une erreur est survenue");
    })
});

// Assign a base to another telemarketer
router.put('/base', verifyToken, (req, res)=>{
    marketer.assignBase(req.body.id_base, req.body.id_user)
    .then(results =>{
        res.status(results.code).send(results.message);
    })
    .catch(error =>{
        console.log("Router: "+error);
    });
});

// Create a new station
router.post('/post/new', (req, res)=>{
    marketer.createPost(req.body.name).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.send(400).send('Une erreur est survenue');
    })
})

// Get multiple posts
router.get('/post/', (req, res)=>{
    marketer.getPosts().then(response =>{
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

router.delete('/post/:idPost', (req, res)=>{
    marketer.deletePost(req.params.idPost).then(response =>{
        res.status(200).send(Boolean(response.deletedCount));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

module.exports = router;