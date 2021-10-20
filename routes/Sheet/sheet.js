const express = require("express");
const Sheet = require("../../controller/Sheet/sheet");
const router = express.Router();

// add new data in sheet
router.post("/", (req, res) => {
  let sheet = new Sheet();
  sheet
    .createSheet(req.body.data, req.body.post, req.body.contactId)
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
/* router.get('/:post_id', (req, res)=>{
    let sheet = new Sheet();
    sheet.getSheetOfOnePost(req.params.post_id).then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');   
    });
}); */

router.get('/dashboard', (req, res)=>{
  let sheet = new Sheet();
  sheet.getDashboardData().then(response =>{
    res.status(200).send(response);
  }).catch(error =>{
    console.log(error);
  })
})

module.exports = router;
