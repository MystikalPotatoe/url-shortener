'use strict';

const express = require('express'),
      DB = require('./utils/dbmodule.js'),
      url = process.env.MONGO_URI,
      app = express(),
      path = require('path'),
      routes = require('./routes');

      
app.use(express.static('public'));

//Connecting to Database instance
DB.connect(url,() => {
      console.log("Database connection open");
      routes(app,DB.getDB());
});

//Set routes for the application
// routes(app,DB.getDB());

module.exports = app;
