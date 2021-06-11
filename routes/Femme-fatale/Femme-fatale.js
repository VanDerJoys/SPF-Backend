const express = require('express');
const FemmeFataleConstructor = require('../../controller/Projects/Femme-fatale');

const router = express.Router();

router.post('/new', (req, res)=>{
    const contact = new FemmeFataleConstructor(
        req.body.plaint,
        req.body.base_name,
        req.body.name,
        req.body.phone,
        req.body.order,
        req.body.amount,
        req.body.observation,
        req.body.location,
        req.body.contact_status,
        req.body.payment_date,
        req.body.payment_status,
        req.body.posts,
        req.body.recommandation 
    );
    contact.addContact().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send("Les valeurs envoyées sont incorrectes");
    })
})

module.exports = router;