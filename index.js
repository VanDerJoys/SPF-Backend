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
const Base = require('./routes/Bases/bases');

// #################### SHEET ROUTE #####################
const Sheet = require('./routes/Sheet/sheet');

// #################### ACCOUNT ROUTE ###################### 
const Account = require('./routes/account');

// ################### POST ROUTE #######################
const Posts = require('./routes/Postes/posts');

// ################### POST ROUTE #######################
const Bases = require('./routes/Bases/bases');

// ################### Project ROUTE #######################
const Projects = require('./routes/Projects/project');


// Loading middlewares
// #######################   CONTACTS MIDDLEWARE  ###########################
app.use('/contacts', Contact);

// #######################   BASES MIDDLEWARE  ###########################
app.use('/bases', Base);

// #################### ACCOUNT MIDDLEWARE ###################
app.use('/user', Account);

// #################### POST MIDDLEWARE ###################
app.use('/base', Bases);
app.use('/posts', Posts);

// #################### PROJET MIDDLEWARE ###################
app.use('/project', Projects);

// #################### SHEET MIDDLEWARE #####################
app.use('/sheet', Sheet);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listenning on port ${PORT}...`);
})