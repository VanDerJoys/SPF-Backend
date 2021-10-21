const express = require("express");
const Sheet = require("../../controller/Sheet/sheet");
const router = express.Router();

router.get('/', (req, res)=>{
  let sheet = new Sheet();
  sheet.getDashboardData().then(response =>{
    res.status(200).send(response);
  }).catch(error =>{
    console.log(error);
  })
})

module.exports = router;
