const express = require('express');
const Sheet = require('../../controller/Sheet/sheet');
const router = express.Router();

// create a sheet
router.post('/', (req, res)=>{
    let sheet = new Sheet(
        req.body.post_id,
        req.body.call, 
        req.body.notebook,
        req.body.argument,
        req.body.order,
        req.body.busy_call,
        req.body.unavailable,
        req.body.unreachable,
        req.body.do_not_call,
        req.body.tranche
    );
    sheet.createSheet().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

// get a sheet of a single post
router.get('/:post_id', (req, res)=>{
    let sheet = new Sheet();
    sheet.getSheetOfOnePost(req.params.post_id).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');   
    })
})
// get all shet
router.get('/', (req, res)=>{
    let sheet = new Sheet();
    sheet.getAllFiche().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');   
    })
})


// delete a single sheet
router.delete('/:sheet_id', (req, res)=>{
    let sheet = new Sheet();
    sheet.deleteOneSheet(req.params.sheet_id).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

module.exports = router;