const express = require('express');
const formidable = require('formidable');
const path = require('path');
const ListeningController = require('../../controller/listening');
// const { verifyToken } = require('../../helpers/web-token');

const router = express.Router();


router.post('/', (req, res)=>{
    const listening = new ListeningController(
        req.body.data.observation,
        req.body.data.finalNote,
        req.body.data.comment6,
        req.body.data.note6,
        req.body.data.comment5,
        req.body.data.note5,
        req.body.data.comment4,
        req.body.data.note4,
        req.body.data.comment3,
        req.body.data.note3,
        req.body.data.comment2,
        req.body.data.note2,
        req.body.data.comment1,
        req.body.data.note1,
        req.body.data.post,
    );
    listening.createListening().then(response =>{
        res.status(201).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
});

router.get('/', (req, res)=>{
    const listening = new ListeningController();
    listening.getListenings().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// File upload
router.post('/:listeningId/file', (req, res)=>{
    const listening = new ListeningController();
    const form = formidable();
    form.parse(req, (err, fields, files)=>{
        if(err){
            console.log(err)
            res.status(400).send('Le fichier est endommagé!');
        }
    });

    form.on('fileBegin', (name, file)=>{
        file.filepath = path.join('C:/Apache/htdocs/audio/', file.originalFilename);
        listening.upload(req.params.listeningId, `http://localhost/audio/${file.originalFilename}`).then(response =>{
            res.status(201).send(response);
        }).catch(error =>{
            console.log(error);
            res.status(500).send('Une erreur est survenue');
        })
    })
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