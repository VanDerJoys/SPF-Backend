const express = require('express');
const Account = require('../controller/account');

const { generateToken } = require('../helpers/web-token');
const router = express.Router();
// login
router.post('/authentification', async (req, res)=>{
    let account = new Account(req.body.phone, req.body.password);
    try {
        let results = await account.logUser();
        if (results.code == 400) {
            res.status(results.code).send(results.message);
        }else{
            let token = generateToken(req.body.telephone);
            res.send(
                {
                    path: results.path, 
                    id: results.user_data.id,
                    name: results.user_data.nom, 
                    surname: results.user_data.prenom, 
                    role: results.user_data.type,
                    archived: results.user_data.statut, 
                    phone: results.user_data.telephone, 
                    authToken: token}).status(200);
        }
    } catch (error) {
        console.log('Router: '+error);
    }
});

router.post('/register', (req, res)=>{
    let account = new Account();
    account.register(req.body.name, req.body.surname, req.body.phone, req.body.password, req.body.type)
    .then((response)=>{
        res.status(response.code).send(response.message)
    })
    .catch((error)=>{
        console.log("Router: "+error);
    });
})

module.exports = router;