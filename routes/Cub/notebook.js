const express = require('express');
const CubNotebookController = require('../../controller/Notebook/Cub_notebook');
// const { verifyToken } = require('../../helpers/web-token');

const router = express.Router();

router.post('/', (req, res)=>{
    const notebook = new CubNotebookController();
    notebook.addNotebook(req.body.contactId, req.body.period).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    })
    .catch(error =>{
        console.log("Router: "+error);
        res.status(400).send('Une erreur est survenue');
    });
});

router.delete('/:contactId', (req, res)=>{
    const notebook = new CubNotebookController();
    notebook.deleteNotebook(req.params.contactId).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    })
    .catch(error =>{
        console.log("Router: "+error);
        res.status(400).send('Une erreur est survenue');
    });
});

module.exports = router;