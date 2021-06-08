const express = require('express');
const ContactController = require('../../controller/Contact/contact');
const { verifyToken } = require('../../helpers/web-token');

const router = express.Router();

router.post('/new', verifyToken, (req, res)=>{
    const contact = new ContactController(
        req.body.id, //id of the base
        req.body.nom,
        req.body.telephone, 
        req.body.localisation,
        req.body.statut
    );

    contact.addContact()
    .then(response =>{
        res.status(response.code).send(response.message);
    })
    .catch(error =>{
        console.log("Router: "+error);
    })
});

// get all contacts
router.get('/', verifyToken, (req, res)=>{
    const contact = new ContactController();
    contact.getContacts()
    .then(response =>{
        res.status(200).send(response);
    })
    .catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

// get marketer contacts
router.get('/:idCompte', verifyToken, (req, res)=>{
    const contact = new ContactController();
    contact.getMarketerContacts(req.params.idCompte)
    .then(response =>{
        res.status(200).send(response);
    })
    .catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

// get base contacts
router.get('/base/:idBase', verifyToken, (req, res)=>{
    const contact = new ContactController();
    contact.getBaseContacts(req.params.idBase)
    .then(response =>{
        res.status(200).send(response);
    })
    .catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

// modify contact status
router.put('/status/:telephone', verifyToken, (req, res)=>{
    const contact = new ContactController();
    contact.changeStatus(req.params.telephone, req.body.status).then(response =>{
        res.status(response.code).send(response.message);
    }).catch(error =>{
        console.log("Router: "+error);
    })
})

// add observation
router.put('/observation/:telephone', verifyToken, (req, res)=>{
    const contact = new ContactController();
    contact.addObservation(req.params.telephone, req.body.observation)
    .then(response =>{
        res.status(response.code).send(response.message);
    })
    .catch(error =>{
        console.log("Router: "+error);
    });
})
module.exports = router;