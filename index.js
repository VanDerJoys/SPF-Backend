const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// load routes
const Account = require('./routes/account');
const Contact = require('./routes/Contact/contact');
const Agenda = require('./routes/Agenda/agenda');
const Telemarketer = require('./routes/Telemarketer/telemarketer');

// Manage middlewares
app.use(express.json());
app.use(cors());

app.use('/user', Account);
app.use('/contact', Contact);
app.use('/agenda', Agenda);
app.use('/marketer', Telemarketer);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listenning on port ${PORT}...`);
})