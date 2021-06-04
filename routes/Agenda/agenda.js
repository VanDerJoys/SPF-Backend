const express = require('express');
const AgendaController = require('../../controller/Agenda/agenda');
const { verifyToken } = require('../../helpers/web-token');

const router = express.Router();

router.post('/new', verifyToken, (req, res)=>{
    const agenda = new AgendaController(req.body.id, req.body.intitule, req.body.period);
    agenda.addAgenda().then(response =>{
        res.status(response.code).send(response.message);
    })
    .catch(error =>{
        console.log("Router: "+error);
    });
})

// get agenda for one person
router.get('/:id', verifyToken, (req, res)=>{
    const agenda = new AgendaController();
    agenda.getOneAgenda(req.params.id).then(response =>{
        res.status(response.code).send(response.message);
    })
    .catch(error =>{
        console.log("Router: "+error);
    })
});

router.put('/:id', verifyToken, (req, res)=>{
    const agenda = new AgendaController();
    agenda.updateAgenda(req.params.id, req.body.intitule, req.body.date_heure)
    .then(response =>{
        res.status(response.code).send(response.message);
    })
    .catch(error =>{
        console.log(error);
    });
});

router.delete('/:id', verifyToken, (req, res)=>{
    const agenda = new AgendaController();
    agenda.deleteAgenda(req.params.id)
    .then(response =>{
        res.status(response.code).send(response.message);
    })
    .catch(error =>{
        console.log(error);
    });
})

module.exports = router;