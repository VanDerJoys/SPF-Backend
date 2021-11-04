const express = require("express");
const Event = require("../controller/events");
const router = express.Router();

let event = new Event();

// create a sheet
router.post("/", (req, res) => {
  event
    .createEvent(req.body.post, req.body.name, req.body.start, req.body.details)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

router.get("/:post", (req, res) => {
  event
    .getEvents(req.params.post)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Une erreur est survenue");
    });
});

router.delete('/:postId/:eventId', (req, res)=>{
  event.deleteEvent(req.params.postId, req.params.eventId).then((response)=>{
    if (Boolean(response.modifiedCount)) {
      res.status(200).send('Rendez-vous supprimé!'); 
    } else {
      res.status(400).send("L'élément à supprimer n'existe pas!");
    }
  }).catch(error =>{
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  })
})

module.exports = router;
