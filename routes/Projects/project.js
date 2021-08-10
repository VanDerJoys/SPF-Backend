const express = require('express');
const ProjectController = require('../../controller/Project/project');
// const { verifyToken } = require('../../helpers/web-token');

const project= new ProjectController();

const router = express.Router();

// Create a new projet
router.post('/new', (req, res)=>{
    project.createProject(req.body.name).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.send(400).send('Une erreur est survenue');
    })
})

// Get all projets
router.get('/', (req, res)=>{
    project.getProjects().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});


router.put('/:idProjet', (req, res)=>{
    project.updateProject(req.params.idPost, req.body.name).then(response =>{
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