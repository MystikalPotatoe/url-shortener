'use strict';

//this was done in a different branch
//how weird!!!

const express = require('express'),
      MongoClient = require('mongodb').MongoClient,
      url = process.env.MONGO_URI,
      app = express(),
      routes = require('./routes');

      
app.use(express.static('public'));

app.set('view engine','ejs');

//db.connect()

routes(app,db);

module.exports = app;
