const express = require("express");
const ContactController = require("../../controller/contact");
// const { verifyToken } = require('../../helpers/web-token');

const router = express.Router();
const contact = new ContactController();

// Add new contact
router.post("/", (req, res) => {
  contact
    .addContact(req.body.data, req.body.id)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((error) => {
      console.log("Router: " + error);
      res.status(400).send("Une erreur est survenue");
    });
});

// get contacts of a post for a single project
router.get("/:groupId", (req, res) => {
  contact
    .getContacts(req.params.groupId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

// get inactive contacts
router.get("/status/inactive", (req, res) => {
  contact
    .getInactiveContacts()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

// activate all contacts
router.put("/", (req, res) => {
  contact
    .activateContacts()
    .then((response) => {
      res.status(200).send(Boolean(response.modifiedCount));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

module.exports = router;
