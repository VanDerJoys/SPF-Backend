const express = require("express");
const Sheet = require("../../controller/Sheet/sheet");
const router = express.Router();

// create a sheet
router.post("/", (req, res) => {
  let sheet = new Sheet();
  sheet
    .createSheet(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

// get a sheet of a single post
router.post("/shetbydate", (req, res) => {
  let sheet = new Sheet();
  sheet
    .getSheetOfADate(req.body.date1, req.body.date2)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});
// get all shet
router.get("/", (req, res) => {
  let sheet = new Sheet();
  sheet
    .getAllFiche()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

// delete a single sheet
router.delete("/:sheet_id", (req, res) => {
  let sheet = new Sheet();
  sheet
    .deleteOneSheet(req.params.sheet_id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

module.exports = router;
