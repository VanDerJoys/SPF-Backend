const express = require('express');
const FemmeFataleConstructor = require('../../controller/Femme-fatale/Femme-fatale');

const router = express.Router();

router.post('/new', (req, res)=>{
    const contact = new FemmeFataleConstructor(
        req.body.base_id,
        req.body.name,
        req.body.phone,
    );
    contact.addContact().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send("Les valeurs envoyées sont incorrectes");
    })
})

// get all contacts
router.get('/', (req, res)=>{
    const contact = new FemmeFataleConstructor();
    contact.getContacts().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

// get contacts of a specific base
router.get('/base/', (req, res)=>{
    const contact = new FemmeFataleConstructor();
    contact.getContactsByBase().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

// get contacts of a specific post
router.get('/post/:post', (req, res)=>{
    const contact = new FemmeFataleConstructor();
    contact.getContactsByPost(req.params.post).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

router.delete('/:contactId', (req, res)=>{
    let contact = new FemmeFataleConstructor();
    contact.deleteContact(req.params.contactId).then(response =>{
        res.status(200).send(Boolean(response.deletedCount))
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

router.put('/:contactId', (req, res)=>{
    let contact = new FemmeFataleConstructor();
    contact.updateContact(
        req.params.contactId,
        req.body.name,
        req.body.phone
    ).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
});

// Qualify a call
router.put('/status/:contact_id', (req, res)=>{
    let contact = new FemmeFataleConstructor();
    contact.changeStatus(req.params.contact_id, req.body.observation, req.body.rdv)
    .then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// Archive a call
router.put('/archive/:contact_id', (req, res)=>{
    let contact = new FemmeFataleConstructor();
    contact.addToArchive(req.params.contact_id, req.body.archived)
    .then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

module.exports = router;