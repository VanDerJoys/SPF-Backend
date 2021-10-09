const express = require("express");
const Sheet = require("../../controller/Sheet/sheet");
const router = express.Router();

// create a sheet
router.post("/", (req, res) => {
  let sheet = new Sheet();
  sheet
    .createSheet(req.body.data, req.body.post)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

// get sheets of all posts
router.get("/", (req, res) => {
  let sheet = new Sheet();
  sheet
    .getAllSheets()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

// get sheets of one post
router.get("/all/:post_id", (req, res) => {
  let sheet = new Sheet();
  sheet
    .getAllSheetsOfOnePost(req.params.post_id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

// get sum of sheets of one post
router.get('/:post_id', (req, res)=>{
    let sheet = new Sheet();
    sheet.getSheetOfOnePost(req.params.post_id).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');   
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
