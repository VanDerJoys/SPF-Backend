const express = require('express');
const ContactController = require('../../controller/Contact/contact');
const { verifyToken } = require('../../helpers/web-token');

const router = express.Router();

router.post('/new', verifyToken, (req, res)=>{
    const contact = new ContactController(
        req.body.id,
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

// get user contacts
router.get('/:idUser', verifyToken, (req, res)=>{

})

// modify contact status
router.put('/:telephone/:statut', (req, res)=>{
    const contact = new ContactController();
    contact.changeStatus(req.params.telephone, req.params.statut).then(response =>{
        res.status(response.code).send(response.message);
    }).catch(error =>{
        console.log("Router: "+error);
    })
})
module.exports = router;