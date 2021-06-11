const express = require('express');

const CubConstructor = require('../../controller/Projects/Cub');

const router = express.Router();

router.post('/new', (req, res)=>{
    const contact = new CubConstructor(
        req.body.base_name,
        req.body.name,
        req.body.phone,
        req.body.cni,
        req.body.service,
        req.body.observation,
        req.body.quartier,
        req.body.facebook,
        req.body.status,
        req.body.posts,
        req.body.recommandation
    );
    contact.addContact().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send("Une erreur est survenue");
    });
})

module.exports = router;