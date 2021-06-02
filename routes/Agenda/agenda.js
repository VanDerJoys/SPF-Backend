const express = require('express');
const { verifyToken } = require('../../helpers/web-token');

const router = express.Router();

router.post('/new', verifyToken, (req, res)=>{

})

router.get('/', verifyToken, (req, res)=>{

});

router.put('/:agenda/', verifyToken, (req, res)=>{
    
})

module.exports = router;