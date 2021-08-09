const express = require('express');
const BaseController = require('../../controller/Bases/bases');
// const { verifyToken } = require('../../helpers/web-token');

const base = new BaseController();

const router = express.Router();

// Create a new base
router.post('/', (req, res)=>{
    base.createBase(req.body.name).then(response =>{
        res.status(201).send(response);
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

// Get single base
router.get('/:base', (req, res)=>{
    base.getBase(req.params.base).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

router.put('/:base', (req, res)=>{
    base.updateBase(req.params.base, req.body.name).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue')
    })
});

router.delete('/:base', (req, res)=>{
    base.deleteBase(req.params.base).then(response =>{
        res.status(200).send(Boolean(response.deletedCount));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

router.put('/:base/posts/:post', (req, res)=>{
    base.assignBase(req.params.base, req.params.post).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send("Une erreur est survenue");
    })
})

module.exports = router;