'use strict';

const express = require('express'),
      MongoClient = require('mongodb').MongoClient,
      url = process.env.MONGO_URI,
      app = express(),
      routes = require('./routes');

      
app.use(express.static('public'));

app.set('view engine','ejs');

MongoClient.connect(url, (err,db) => {
    if(err) {
        console.log('Failed to make a connection');
        console.log(err);
        process.exit(1);
    }
    
    routes(app,db);
});

module.exports = app;
