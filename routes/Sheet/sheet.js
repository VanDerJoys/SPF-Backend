const express = require("express");
const Sheet = require("../../controller/Sheet/sheet");
const router = express.Router();

// add new data in sheet
router.post("/", (req, res) => {
  let sheet = new Sheet();
  sheet
    .createSheet(req.body.data, req.body.groupId, req.body.contactId, req.body.postId)
    .then((response) => {
      res.status(200).send(Boolean(response.nModified));
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

// get sheets of all posts
router.get("/:projectId", (req, res) => {
  let sheet = new Sheet();
  sheet
    .getAllSheets(req.params.projectId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

// get total sheet of today
router.get("/total/:projectId", (req, res) => {
  let sheet = new Sheet();
  sheet
    .getTotalSheet(req.params.projectId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

module.exports = router;
