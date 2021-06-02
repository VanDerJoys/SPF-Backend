const express = require('express');
const MarketerController = require('../../controller/Telemarketer/telemarketer');
const { verifyToken } = require('../../helpers/web-token');

const controller = new MarketerController();

const router = express.Router();

/* router.post('/new', verifyToken, (req, res)=>{

}) */

router.get('/', verifyToken, (req, res)=>{
    controller.getMarketer().then(results =>{
        res.status(200).send(results);
    }).catch(error =>{
        console.log(error);
        res.status(400).send(error);
    })
});

/* router.put('/:idUser', verifyToken, (req, res)=>{

}); */

module.exports = router;