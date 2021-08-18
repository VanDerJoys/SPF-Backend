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

// get all sheets of a post
router.get('/all/:post_id', (req, res)=>{
    let sheet = new Sheet();
    sheet.getAllSheetsOfOnePost(req.params.post_id).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');   
    });
});

// update a sheet
router.put('/:sheet_id', (req, res)=>{
    let sheet = new Sheet();
    sheet.updateSheet(req.params.sheet_id, req.body).then(response =>{
        if(Boolean(response.nModified)){
            res.status(200).send(Boolean(response.nModified));
        }
        else{
            res.status(404).send("La fiche n'existe pas")
        }
    }).catch(error =>{
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
