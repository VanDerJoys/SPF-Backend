const express = require("express");
const Event = require("../controller/events");
const router = express.Router();

let event = new Event();

// create a sheet
router.post("/", (req, res) => {
  event
    .createEvent(req.body.post, req.body.name, req.body.start)
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

module.exports = router;
