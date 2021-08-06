const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

let databaseInit = require('./config/database');
databaseInit();

const app = express();

// Manage middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Loading routes
// ##################### CONTACT ROUTES #########################
const Contact = require('./routes/Contact/contact');

// ##################### FEMME FATALE ROUTES #########################
const FemmeFataleBase = require('./routes/Femme-fatale/Bases');
const FemmeFataleContacts = require('./routes/Femme-fatale/Contacts');
const FemmeFataleNotebook = require('./routes/Femme-fatale/notebook');

// #################### CUB ROUTES ########################
const CubBase = require('./routes/Cub/Bases');
const CubContacts = require('./routes/Cub/Contacts');
const CubNotebook = require('./routes/Cub/notebook');

// #################### SHEET ROUTE #####################
const Sheet = require('./routes/Sheet/sheet');

// #################### ACCOUNT ROUTE ###################### 
const Account = require('./routes/account');

// ################### POST ROUTE #######################
const Posts = require('./routes/Postes/posts');

// Loading middlewares
// #######################   TCHOP ET YAMO MIDDLEWARES  ###########################
app.use('/contacts', Contact);

// #######################   FEMME FATALE MIDDLEWARES  ###########################
app.use('/femme-fatale/base', FemmeFataleBase);
app.use('/femme-fatale/contacts', FemmeFataleContacts);
app.use('/femme-fatale/notebook', FemmeFataleNotebook);

// #######################  CUB MIDDLEWARES  ###########################
app.use('/cub/base', CubBase);
app.use('/cub/contacts/', CubContacts);
app.use('/cub/notebook', CubNotebook);

// #################### ACCOUNT MIDDLEWARE ###################
app.use('/user', Account);

// #################### POST MIDDLEWARE ###################
app.use('/posts', Posts);

// #################### SHEET MIDDLEWARE #####################
app.use('/sheet', Sheet);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listenning on port ${PORT}...`);
})