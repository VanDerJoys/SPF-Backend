const express = require('express');

const TchopetyamoController = require('../../controller/Tchopetyamo/Tchopetyamo');

const router = express.Router();

router.post('/new', (req, res)=>{
    const contact = new TchopetyamoController(
        req.body.base_id,
        req.body.name,
        req.body.phone,
        req.body.town
    );
    contact.addContact().then(response =>{
        res.status(200).send(response);
    }).catch(err=>{
        console.log(err)
        res.status(400).send("Une erreur est survenue");
    })
});

// get all contacts
router.get('/', (req, res)=>{
    const contact = new TchopetyamoController();
    contact.getContacts().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

// get contacts of all bases
router.get('/base/', (req, res)=>{
    const contact = new TchopetyamoController();
    contact.getContactsByBase().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

// get contacts of a specific post
router.get('/post/:post_id', (req, res)=>{
    const contact = new TchopetyamoController();
    contact.getPostContacts(req.params.post_id).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

router.delete('/:contactId', (req, res)=>{
    let contact = new TchopetyamoController();
    contact.deleteContact(req.params.contactId).then(response =>{
        res.status(200).send(Boolean(response.deletedCount))
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
});

router.put('/:contactId', (req, res)=>{
    let contact = new TchopetyamoController(req.body.name,req.body.phone,req.body.town);
    contact.updateContact(req.params.contactId).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
});

// Qualify a call
router.put('/status/:contact_id', (req, res)=>{
    let contact = new TchopetyamoController();
    contact.changeStatus(req.params.contact_id, req.body.contact_status)
    .then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// Archive a contact
router.put('/archive/:contact_id', (req, res)=>{
    let contact = new TchopetyamoController();
    contact.addToArchive(req.params.contact_id, req.body.archived)
    .then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

module.exports = router;