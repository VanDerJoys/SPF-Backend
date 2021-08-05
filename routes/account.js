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
                    authToken: token
                }
            ).status(201);
        }
    } catch (error) {
        console.log('Router: '+error);
    }
});

router.post('/register', (req, res)=>{
    let account = new Account();
    account.register(req.body.name, req.body.surname, req.body.phone, req.body.password, req.body.role)
    .then((response)=>{
        if(response.code == 200){
            res.status(response.code).send(response.message)
        }else{
            res.status(response.code).send(response.message.message);
        }
    })
    .catch((error)=>{
        console.log("Router: "+error);
        res.statut(400).send('Une erreur est survenue')
    });
})

router.get('/', (req, res)=>{
    let accounts = new Account();
    accounts.getAccounts().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

router.delete('/:accountId', (req, res)=>{
    let account = new Account();
    account.deleteAccount(req.params.accountId, req.body.post_id).then(response =>{
        res.status(200).send(Boolean(response.deletedCount))
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
})

router.put('/:idUser', (req, res)=>{
    console.log(req.params.idUser)
    console.log(req.body);
    let account = new Account();
    account.updateAccount(
        req.params.idUser,
        req.body.name,
        req.body.surname,
        req.body.phone
    ).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
})

router.put('/archive/:idUser', (req, res)=>{
    let account = new Account();
    account.archiveAccount(req.params.idUser).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error)
        res.status(200).send('Une erreur est survenue');
    })
})

/* router.put('/role/:idUser', (req, res)=>{
    let account = new Account();
    account.updateRole(req.params.idUser, req.body.role).then(response =>{
        res.status(200).send(Boolean(response.nModified));
    }).catch(error =>{
        console.log(error);
        res.status(200).send("Une erreur est survenue");
    })
}) */

module.exports = router;