const express = require('express');
const ProjetController = require('../../controller/Projet/projet');
const { verifyToken } = require('../../helpers/web-token');

const Projet= new ProjetController();

const router = express.Router();

// Create a new projet
router.post('/new', (req, res)=>{
    console.log('ici')
    Projet.createProjet(req.body.name).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.send(400).send('Une erreur est survenue');
    })
})

// Get all projets
router.get('/', (req, res)=>{
    Projet.getProjets().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});


// Get a single projet
// router.get('/post/:idPost', (req, res)=>{
//     ProjetController.getPost(req.params.idPost).then(response =>{
//         res.status(200).send(response);
//     }).catch(error =>{
//         console.log(error);
//         res.status(400).send('Une erreur est survenue');
//     })
// })

router.put('/:idProjet', (req, res)=>{
    Projet.updatePost(req.params.idPost, req.body.name).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue')
    })
});


// router.delete('/post/:idPost', (req, res)=>{
//     ProjetController.deletePost(req.params.idPost).then(response =>{
//         res.status(200).send(Boolean(response.deletedCount));
//     }).catch(error =>{
//         console.log(error);
//         res.status(400).send('Une erreur est survenue');
//     });
// });

module.exports = router;