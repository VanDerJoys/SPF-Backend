const express = require('express');

const TchopetyamoController = require('../../controller/Tchopetyamo/Tchopetyamo');

const router = express.Router();

router.post('/new', (req, res)=>{
    const contact = new TchopetyamoController(
        req.body.base_id,
        req.body.name,
        req.body.phone,
        req.body.town,
        req.body.post,
        req.body.contact_status,
        req.body.observation,
        req.body.recommandation
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

// get contacts of a specific base
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
router.get('/post/:post', (req, res)=>{
    const contact = new TchopetyamoController();
    contact.getContactsByPost(req.params.post).then(response =>{
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
})

module.exports = router;