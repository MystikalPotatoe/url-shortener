'use strict';

//this was done in a different branch
//how weird!!!

const express = require('express'),
      DB = require('./utils/dbmodule.js'),
      url = process.env.MONGO_URI,
      app = express(),
      routes = require('./routes');

      
app.use(express.static('public'));

app.set('view engine','ejs');

//db.connect()
DB.connect(url,() => {console.log("Database connection open")});

routes(app,DB.getDB());

module.exports = app;
