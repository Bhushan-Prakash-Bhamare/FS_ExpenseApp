const path = require('path');
var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./Controllers/Error');
const sequelize=require('./Util/dataBase');
const app = express();

app.use(cors());

const mainRoute=require('./Routes/Main');
 
app.use(bodyParser.json({ extended: false }));

app.use(mainRoute);

// app.use(errorController.get404);

sequelize.sync()
    .then(()=>app.listen(3100))
    .catch(err=>console.log(err)); 