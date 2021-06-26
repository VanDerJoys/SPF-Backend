const express = require('express');
const BaseController = require('../../controller/Base/Femme-fatale_base');
const { verifyToken } = require('../../helpers/web-token');

const base = new BaseController();

const router = express.Router();

// Create a new base
router.post('/new', (req, res)=>{
    base.createBase(req.body.name).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.send(400).send('Une erreur est survenue');
    })
})

// Get multiple bases
router.get('/', (req, res)=>{
    base.getBases(req.body.project_name).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

router.put('/:id_base', (req, res)=>{
    base.updateBase(req.params.id_base, req.body.name).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue')
    })
});

router.delete('/:id_base', (req, res)=>{
    base.deleteBase(req.params.id_base).then(response =>{
        res.status(200).send(Boolean(response.deletedCount));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

module.exports = router;