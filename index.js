const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

require('dotenv').config();
require('./config/database')();

const app = express();

// Manage middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

// Loading routes
// ##################### CONTACT ROUTES #########################
const Contact = require('./routes/Contact/contact');

// ##################### EVENTS ROUTES #########################
const Events = require('./routes/events');

// #################### SHEET ROUTE #####################
const Sheet = require('./routes/Sheet/sheet');

// #################### ACCOUNT ROUTE ###################### 
const Account = require('./routes/account');

// ################### POST ROUTE #######################
const Posts = require('./routes/Postes/posts');

// ################### Project ROUTE #######################
const Projects = require('./routes/Projects/project');

// ################### Listening ROUTE #######################
const Listenings = require('./routes/Listening/listening');

// ################### Dashboard ROUTE #######################
const Dashboard = require('./routes/dashboard');

// Loading middlewares
// #######################   CONTACTS MIDDLEWARE  ###########################
app.use('/contacts', Contact);

// #######################   EVENTS MIDDLEWARE  ###########################
app.use('/events', Events);

// #################### ACCOUNT MIDDLEWARE ###################
app.use('/user', Account);

// #################### POST MIDDLEWARE ###################
app.use('/post', Posts);

// #################### PROJET MIDDLEWARE ###################
app.use('/project', Projects);

// #################### SHEET MIDDLEWARE #####################
app.use('/sheet', Sheet);

// #################### LISTENING MIDDLEWARE #####################
app.use('/listening', Listenings);

// #################### DASHBOARD MIDDLEWARE #####################
app.use('/dashboard', Dashboard);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listenning on port ${PORT}...`);
})