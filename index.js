const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
let databaseInit = require('./config/database');

dotenv.config();
databaseInit();

const app = express();

// Manage middlewares
app.use(express.json());
app.use(cors());

// Loading routes
// ##################### TCHOP ET YAMO ROUTES #########################
const TeyBase = require('./routes/Tchopetyamo/Bases');
const TeyContacts = require('./routes/Tchopetyamo/Contacts');
const TeyNotebook = require('./routes/Tchopetyamo/notebook');

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
app.use('/tchopetyamo/base', TeyBase);
app.use('/tchopetyamo/contacts', TeyContacts);
app.use('/tchopetyamo/notebook', TeyNotebook);

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
app.use('/telemarketer', Posts);

// #################### SHEET MIDDLEWARE #####################
app.use('/sheet', Sheet);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listenning on port ${PORT}...`);
})