const express = require('express');
const Account = require('../controller/account');

const { generateToken } = require('../helpers/web-token');
const router = express.Router();
// login
router.post('/authentification', async (req, res)=>{
    let account = new Account(req.body.telephone, req.body.password);
    try {
        let results = await account.logUser();
        if (results.code == 400) {
            res.status(results.code).send(results.message);
        }else{
            let token = generateToken(req.body.telephone);
            res.send({path: results.path, user_data: results.user_data, authToken: token}).status(200);
        }
    } catch (error) {
        console.log('Router: '+error);
    }
});

router.post('/register', async (req, res)=>{
    let account = new Account();
    account.register(req.body.nom, req.body.prenom, req.body.telephone, req.body.password, req.body.type)
    .then((response)=>{
        res.status(response.code).send(response.message)
    })
    .catch((error)=>{
        console.log("Router: "+error);
    });
})

module.exports = router;