const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// configure routes
const account = require('./routes/account');

// Managing middlewares
app.use(express.json());
app.use(cors());

app.use('/user', account);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listenning on port ${PORT}...`);
})