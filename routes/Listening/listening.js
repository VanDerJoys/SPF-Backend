const express = require('express');
const formidable = require('formidable');
const path = require('path');
const ListeningController = require('../../controller/listening');
const ListeningModel = require("../../model/Schemas/Listening");
// const { verifyToken } = require('../../helpers/web-token');

const router = express.Router();


router.post('/', (req, res)=>{
    const listening = new ListeningController(
        req.body.data.observation,
        req.body.data.post,
    );
    listening.createListening().then(response =>{
        res.status(201).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    })
});

router.get('/', (req, res)=>{
    const listening = new ListeningController();
    listening.getListenings().then(response =>{
        res.status(200).send(response);
    }).catch(error =>{
        console.log(error);
        res.status(400).send('Une erreur est survenue');
    });
});

// File upload
router.post('/:listeningId/file', (req, res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
		if (err) {
			console.log(err);
			res.status(400).send("Erreur de chargement des fichiers");
		}else{
            await ListeningModel.updateOne({_id: req.params.listeningId}, {filePath: `${files.audio.newFilename}_${files.audio.originalFilename}`});
            res.send("Fichiers reçus").status(200);
        }
	});

	form.on("fileBegin", (name, file) => {
		file.filepath = path.join(
			`${__dirname}/../../uploads`,
			`${file.newFilename}_${file.originalFilename}`
		);
	});
})

router.get("/audio/:filename", (req, res) => {
	var options = {
		root: path.join(__dirname + "/../../uploads"),
	};

	res.sendFile(req.params.filename, options);
});

// delete a listening
router.delete('/:id', (req, res)=>{
    const listening = new ListeningController();
    listening.deleteListening(req.params.id).then(response =>{
        res.status(response.status).send(response.message);
    }).catch(error =>{
        console.log(error);
        res.status(error.status).send(error.message);
    });
});

module.exports = router;