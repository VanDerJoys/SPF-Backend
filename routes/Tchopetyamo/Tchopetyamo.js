const express = require('express');

const TchopetyamoController = require('../../controller/Projects/Tchopetyamo');

const router = express.Router();

router.post('/new', (req, res)=>{
    const contact = new TchopetyamoController(
        req.body.base_name,
        req.body.name,
        req.body.phone,
        req.body.town,
        req.body.stations,
        req.body.recommandation
    );
    contact.addContact().then(response =>{
        res.status(200).send(response);
    }).catch(err=>{
        console.log(error)
        res.status(400).send("Les valeurs envoyées sont incorrectes");
    })
})

module.exports = router;