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
        req.body.do_not_call
    );
    sheet.createSheet().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
});

// get all sheets by post
router.get('/', (req, res)=>{
    let sheet = new Sheet();
    sheet.getAllByPost().then(response =>{
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

// get all sheets of a post
router.get('/all/:post_id', (req, res)=>{
    let sheet = new Sheet();
    sheet.getAllSheetsOfOnePost(req.params.post_id).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');   
    });
});

// update a sheet
router.put('/:sheet_id', (req, res)=>{
    let sheet = new Sheet();
    sheet.updateSheet(req.params.sheet_id, req.body).then(response =>{
        if(Boolean(response.nModified)){
            res.status(200).send(Boolean(response.nModified));
        }
        else{
            res.status(404).send("La fiche n'existe pas")
        }
    }).catch(error =>{
        console.log(error);
        res.status(400).send("Une erreur est survenue");
    });
});

// delete a single sheet
router.delete('/:sheet_id', (req, res)=>{
    let sheet = new Sheet();
    sheet.deleteOneSheet(req.params.sheet_id).then(response =>{
        res.status(200).send(Boolean(response.deletedCount));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

module.exports = router;