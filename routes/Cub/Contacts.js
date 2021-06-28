const express = require('express');

const CubController = require('../../controller/Cub/Cub');

const router = express.Router();

router.post('/new', (req, res)=>{
    const contact = new CubController(
        req.body.base_id,
        req.body.name,
        req.body.phone,
        req.body.cni,
        req.body.service,
        req.body.observation,
        req.body.quartier,
        req.body.facebook,
        req.body.status,
        req.body.contact_status,
        req.body.recommandation
    );
    contact.addContact().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send("Une erreur est survenue");
    });
})

// get all contacts
router.get('/', (req, res)=>{
    const contact = new CubController();
    contact.getContacts().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

// get contacts of a specific base
router.get('/base', (req, res)=>{
    const contact = new CubController();
    contact.getContactsByBase().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

// get contacts of a specific post
router.get('/post/:post', (req, res)=>{
    const contact = new CubController();
    contact.getContactsByPost(req.params.post).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

router.delete('/:contactId', (req, res)=>{
    let contact = new CubController();
    contact.deleteContact(req.params.contactId).then(response =>{
        res.status(200).send(Boolean(response.deletedCount));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

router.put('/:contactId', (req, res)=>{
    let contact = new CubController();
    contact.updateContact(
        req.params.contactId,
        req.body.name,
        req.body.phone,
        req.body.cni,
        req.body.service,
        req.body.observation,
        req.body.quartier,
        req.body.facebook,
        req.body.status,
        req.body.contact_status,
        req.body.recommandation
    ).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
});

module.exports = router;