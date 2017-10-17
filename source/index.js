'use strict';

const express = require('express'),
      DB = require('./utils/dbmodule.js'),
      url = process.env.MONGO_URI,
      app = express(),
      routes = require('./routes');

      
app.use(express.static('public'));

// Ignore view engine set because we are using react server rendering
// app.set('view engine','ejs');

//Connecting to Database instance
DB.connect(url,() => {console.log("Database connection open")});

//Set routes for the application
routes(app,DB.getDB());

module.exports = app;
