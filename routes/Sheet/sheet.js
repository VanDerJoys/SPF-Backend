const express = require('express');
const Sheet = require('../../controller/Sheet/sheet');
const router = express.Router();

router.post('/', (req, res)=>{
    let sheet = new Sheet(req.body.project_name, req.body.post_id);
    sheet.createSheet().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

router.post('/call', (req, res)=>{
    let sheet = new Sheet(req.body.project_name, req.body.id);
    sheet.addCall(req.body.contacts).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

router.post('/notebook', (req, res)=>{
    let sheet = new Sheet(req.body.project_name, req.body.post_id);
    sheet.addNotebook(req.body.notebooks).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

router.post('/argument', (req, res)=>{
    let sheet = new Sheet(req.body.project_name, req.body.post_id);
    sheet.addArgument(req.body.arguments).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

module.exports = router;