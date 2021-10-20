const express = require("express");
const ContactController = require("../../controller/contact");
// const { verifyToken } = require('../../helpers/web-token');

const router = express.Router();

// Add new contact
router.post("/", (req, res) => {
  const contact = new ContactController();
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
  const contact = new ContactController();
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
  const contact = new ContactController();
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
  const contact = new ContactController();
  contact
    .activateContacts()
    .then((response) => {
      res.status(200).send(Boolean(response.nModified));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

// get contacts of a project
/* router.get("/project/:project", (req, res) => {
  const contact = new ContactController();
  contact
    .getProjectContacts(req.params.project)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
}); */

// get contact by collector
router.get("/collector", (req, res) => {
  const contact = new ContactController();
  contact
    .getCollectorContacts()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

// get the bests collectors
router.get("/best-collectors", (req, res) => {
  const contact = new ContactController();
  contact
    .getTheBests()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

module.exports = router;
