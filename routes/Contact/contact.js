const express = require('express');
const ContactController = require('../../controller/contact');
// const { verifyToken } = require('../../helpers/web-token');

const router = express.Router();

// Add new contact
router.post('/', (req, res)=>{
    const contact = new ContactController();
    contact.addContact(req.body)
    .then(response =>{
        res.status(201).send(response);
    })
    .catch(error =>{
        console.log("Router: "+error);
        res.status(400).send('Une erreur est survenue');
    });
});

// get all contacts
router.get('/', (req, res)=>{
    const contact = new ContactController();
    contact.getAllContacts()
    .then(response =>{
        res.status(200).send(response);
    })
    .catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// get contacts of a project
router.get('/project/:project', (req, res)=>{
    const contact = new ContactController();
    contact.getProjectContacts(req.params.project)
    .then(response =>{
        res.status(200).send(response);
    })
    .catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

// get base contacts
router.get('/base/:base', (req, res)=>{
    const contact = new ContactController();
    contact.getBaseContacts(req.params.base)
    .then(response =>{
        res.status(200).send(response);
    })
    .catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

// get contact by collector
router.get('/collector', (req, res)=>{
    const contact = new ContactController();
    contact.getCollectorContacts()
    .then(response =>{
        res.status(200).send(response);
    })
    .catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

// get the bests collectors
router.get('/best-collectors', (req, res)=>{
    const contact = new ContactController();
    contact.getTheBests().then(response =>{
      res.status(200).send(response);
    }).catch(error =>{
      console.log(error);
      res.status(400).send('Une erreur est survenue');
    })
  })
module.exports = router;