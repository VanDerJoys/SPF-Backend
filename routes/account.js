const express = require("express");
const Account = require("../controller/account");

const { generateToken } = require("../helpers/web-token");
const router = express.Router();
// login
router.post("/login", async (req, res) => {
  let account = new Account();
  try {
    let results = await account.logUser(req.body.phone, req.body.password);
    if (results.code) {
      res.status(results.code).send(results.message);
    } else {
      // let token = generateToken(req.body.phone);
      res
        .send(results).status(201);
    }
  } catch (error) {
    console.log("Router: " + error);
  }
});

router.post("/register", (req, res) => {
  let account = new Account();
  account
    .register(
      req.body.data.name,
      req.body.data.surname,
      req.body.data.phone,
      req.body.data.type,
      req.body.data.password
    )
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((error) => {
      console.log("Router: " + error);
      res.status(400).send("Une erreur est survenue");
    });
});

// get all users
router.get("/", (req, res) => {
  let accounts = new Account();
  accounts
    .getAccounts()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

router.get("/telemarketer", (req, res) => {
  let accounts = new Account();
  accounts
    .getAccountsTelemarketer()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

router.get("/archived", (req, res) => {
  let accounts = new Account();
  accounts
    .getAccountsArchived()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

// get project for an account
router.get('/management/:account_id', (req, res)=>{
  let account = new Account();
  account.getProjectByAccount(req.params.account_id).then(response =>{
      res.status(200).send(response);
  }).catch(error =>{
      console.log(error);
      res.status(400).send('Une erreur est survenue');
  })
})

router.delete("/:accountId", (req, res) => {
  let account = new Account();
  account
    .deleteAccount(req.params.accountId)
    .then((response) => {
      res.status(200).send(Boolean(response.deletedCount));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

// delete project assignation
router.delete('/:account_id/:project_id', (req, res)=>{
  let account = new Account();
  account.deleteProjectAssignation(req.params.account_id, req.params.project_id).then(response =>{
    if (Boolean(response.deletedCount)){
      res.status(200).send("Suppression effectuée");
    }else {
      res.status(404).send("La ressource à supprimer n'existe pas");
    }
  }).catch(error =>{
    console.log("Router: "+error);
    res.status(400).send("Une erreur est survenue");
  })
})

router.put("/:accountId", (req, res) => {
  let account = new Account();
  account
    .updateAccount(
      req.params.accountId,
      req.body.data.name,
      req.body.data.surname,
      req.body.data.phone,
      req.body.data.type
    )
    .then((response) => {
      res.status(200).send(Boolean(response.nModified));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

router.put("/archive/:idUser", (req, res) => {
  let account = new Account();
  account
    .archiveAccount(req.params.idUser)
    .then((response) => {
      res.status(200).send(Boolean(response.nModified));
    })
    .catch((error) => {
      console.log(error);
      res.status(200).send("Une erreur est survenue");
    });
});

// assign to post
router.put('/:account_id/post/:post_id', (req, res)=>{
  let account = new Account();
  account.assignPost(req.params.post_id, req.params.account_id).then(response =>{
      res.status(200).send(Boolean(response.nModified));
  }).catch(error =>{
      console.log(error);
      res.status(400).send('Une erreur est survenue');
  });
});

// Assign project to an account
router.put('/manage-project/assign', (req, res)=>{
  let account = new Account();
  account.assignProject(req.body.account_id, req.body.project_id).then(response =>{
      res.status(200).send(response);
  }).catch(error =>{
      console.log(error);
      res.status(400).send('Une erreur est survenue');
  })
})

module.exports = router;
