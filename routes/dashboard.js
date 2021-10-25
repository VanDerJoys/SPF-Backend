const express = require("express");
const Dashboard = require("../controller/dashboard");
const router = express.Router();

router.get('/', (req, res)=>{
  let dashboard = new Dashboard();
  dashboard.getDashboardData().then(response =>{
    res.status(200).send(response);
  }).catch(error =>{
    console.log(error);
    res.status(400).send('Une erreur est survenue');
  })
})

router.get('/today', (req, res)=>{
  let dashboard = new Dashboard();
  dashboard.getToday().then(response =>{
    res.status(200).send(response);
  }).catch(error =>{
    console.log(error);
    res.status(400).send('Une erreur est survenue');
  })
})

router.get('/yesterday', (req, res)=>{
  let dashboard = new Dashboard();
  dashboard.getYesterday().then(response =>{
    res.status(200).send(response);
  }).catch(error =>{
    console.log(error);
    res.status(400).send('Une erreur est survenue');
  })
})

router.get('/seven-days', (req, res)=>{
  let dashboard = new Dashboard();
  dashboard.getSevenDays().then(response =>{
    res.status(200).send(response);
  }).catch(error =>{
    console.log(error);
    res.status(400).send('Une erreur est survenue');
  })
})

router.get('/thirty-days', (req, res)=>{
  let dashboard = new Dashboard();
  dashboard.getThirtyDays().then(response =>{
    res.status(200).send(response);
  }).catch(error =>{
    console.log(error);
    res.status(400).send('Une erreur est survenue');
  })
})

module.exports = router;
