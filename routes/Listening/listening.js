const express = require('express');
const ListeningController = require('../../controller/listening');
// const { verifyToken } = require('../../helpers/web-token');

const router = express.Router();


router.post('/', (req, res)=>{
    const listening = new ListeningController(
        req.body.post_id,
        req.body.hours,
        req.body.duration,
        req.body.notes,
        req.body.observation,
        req.body.actions
    );
    listening.createListening().then(response =>{
        res.status(201).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

router.get('/', (req, res)=>{
    const listening = new ListeningController();
    listening.getListenings().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// get listenings of a single post
router.get('/:post_id', (req, res)=>{
    const listening = new ListeningController();
    listening.getPostListenings(req.params.post_id).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
})

// delete a listening
router.delete('/:id', (req, res)=>{
    const listening = new ListeningController();
    listening.deleteListening(req.params.id).then(response =>{
        res.status(200).send(Boolean(response.deletedCount));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

module.exports = router;