const express = require('express');
const FemmeFataleConstructor = require('../../controller/Projects/Femme-fatale');

const router = express.Router();

router.post('/new', (req, res)=>{
    const contact = new FemmeFataleConstructor(
        req.body.plaint,
        req.body.name,
        req.body.phone,
        req.body.order,
        req.body.amount,
        req.body.observation,
        req.body.location,
        req.body.contact_status,
        req.body.payment_date,
        req.body.payment_status,
        req.body.recommandation 
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
router.get('/base/:base_name', (req, res)=>{
    const contact = new FemmeFataleConstructor();
    contact.getContactsByBase(req.params.base_name).then(response =>{
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

module.exports = router;