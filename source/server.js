'use strict';

const express = require('express'),
      mongodb = require('mongodb').MongoClient,
      url = process.env.MONGODB_URI,
      app = express(),
      bodyParser = require('body-parser');
      
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');