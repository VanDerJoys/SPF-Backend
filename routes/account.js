const express = require('express');
const Account = require('../controller/account');

const { generateToken } = require('../helpers/web-token');
const router = express.Router();
// login
router.post('/authentification', async (req, res)=>{
    let account = new Account();
    try {
        let results = await account.logUser(req.body.phone, req.body.password);
        if (results.code == 400) {
            res.status(results.code).send(results.message);
        }else{
            let token = generateToken(req.body.phone);
            res.send(
                {
                    id: results._id,
                    name: results.name, 
                    surname: results.surname, 
                    role: results.type,
                    archived: results.status, 
                    phone: results.phone, 
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