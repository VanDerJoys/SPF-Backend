const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// load routes
const Account = require('./routes/account');
const Base = require('./routes/Base/base');
const Agenda = require('./routes/Agenda/agenda');
const Posts = require('./routes/Postes/posts');
const Tchopetyamo = require('./routes/Tchopetyamo/Tchopetyamo');
const Cub = require('./routes/Cub/Cub');
const FemmeFatale = require('./routes/Femme-fatale/Femme-fatale');

// Manage middlewares
app.use(express.json());
app.use(cors());

app.use('/user', Account);
app.use('/base', Base);
app.use('/agenda', Agenda);
app.use('/telemarketer', Posts);
app.use('/tchopetyamo', Tchopetyamo);
app.use('/cub', Cub);
app.use('/femme-fatale', FemmeFatale);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listenning on port ${PORT}...`);
})