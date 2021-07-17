const express = require('express');
const BaseController = require('../../controller/Base/Tchopetyamo_base');
const { verifyToken } = require('../../helpers/web-token');

const base = new BaseController();

const router = express.Router();

// Create a new base
router.post('/new', (req, res)=>{
    base.createBase(req.body.name, req.body.post).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.send(400).send('Une erreur est survenue');
    })
})

// Get multiple bases
router.get('/', (req, res)=>{
    base.getBases().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// Get a single base
router.get('/:baseId', (req, res)=>{
    base.getSingleBase(req.params.baseId).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// Assign a base to another post
router.put('/', (req, res)=>{
    base.assignBase(req.body.baseId, req.body.accountId)
    .then(results =>{
        res.status(200).send(Boolean(results.nModified));
    })
    .catch(error =>{
        console.log("Router: "+error);
        res.status(400).send('Une erreur est survenue');
    });
});

// update a single base
router.put('/:id_base', (req, res)=>{
    base.updateBase(req.params.id_base, req.body.name).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
});

// delete a single base
router.delete('/:id_base', (req, res)=>{
    base.deleteBase(req.params.id_base).then(response =>{
        res.status(200).send(Boolean(response.deletedCount));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

module.exports = router;