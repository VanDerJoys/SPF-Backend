const express = require('express');
const MarketerController = require('../../controller/Postes/posts');
const { verifyToken } = require('../../helpers/web-token');

const controller = new MarketerController();

const router = express.Router();

// Create telemarketer base
router.post('/base/new', verifyToken, (req, res)=>{
    controller.createBase(req.body.id, req.body.nom).then(results =>{
        res.status(results.code).send(results.message);
    }).catch(error =>{
        console.log("Router: "+error);
    })
})

// get all telemarketers
router.get('/', verifyToken, (req, res)=>{
    controller.getMarketer().then(results =>{
        res.status(200).send(results);
    }).catch(error =>{
        console.log(error);
        res.status(400).send("Une erreur est survenue");
    })
});

// Assign a base to another telemarketer
router.put('/base', verifyToken, (req, res)=>{
    controller.assignBase(req.body.id_base, req.body.id_user)
    .then(results =>{
        res.status(results.code).send(results.message);
    })
    .catch(error =>{
        console.log("Router: "+error);
    });
});

module.exports = router;