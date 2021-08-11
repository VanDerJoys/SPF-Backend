const express = require("express");
const Account = require("../controller/account");

const { generateToken } = require("../helpers/web-token");
const router = express.Router();
// login
router.post("/authentification", async (req, res) => {
  let account = new Account();
  try {
    let results = await account.logUser(req.body.phone, req.body.password);
    if (results.code == 400) {
      res.status(results.code).send(results.message);
    } else {
      let token = generateToken(req.body.phone);
      console.log(results)
      res
        .send({
          id: results._id,
          name: results.name,
          surname: results.surname,
          role: results.role,
          archived: results.status,
          project_id: results.project_id,
          phone: results.phone,
          authToken: token,

        })
        .status(201);
    }
  } catch (error) {
    console.log("Router: " + error);
  }
});

router.post("/register", (req, res) => {
  let account = new Account();
  account
    .register(
      req.body.name,
      req.body.surname,
      req.body.phone,
      req.body.password,
      req.body.role,
      req.body.project_id
    )
    .then((response) => {
      if (response.code == 201) {
        res.status(response.code).send(response.message);
      } else {
        res.status(response.code).send(response.message.message);
      }
    })
    .catch((error) => {
      console.log("Router: " + error);
      res.statut(400).send("Une erreur est survenue");
    });
});

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

router.delete("/:accountId", (req, res) => {
  let account = new Account();
  account
    .deleteAccount(req.params.accountId, req.body.post_id)
    .then((response) => {
      res.status(200).send(Boolean(response.deletedCount));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

router.put("/:idUser", (req, res) => {
  let account = new Account();
  account
    .updateAccount(
      req.params.idUser,
      req.body.name,
      req.body.surname,
      req.body.phone,
    )
    .then((response) => {
      console.log('ici')
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

module.exports = router;
