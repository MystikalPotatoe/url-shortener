'use strict';

const express = require('express'),
      mongo = require('mongodb').MongoClient,
      url = process.env.MONGODB_URI,
      app = express(),
      bodyParser = require('body-parser'),
      appHome = require('./react/url-input'); 
      
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

app.route('/')
    .get((req,res) => {
        let body = appHome.home();
        res.render('layout/basic',{body:body});
    })
    .post((req,res) => {
        
    });

app.get('/link/:id', (req,res) => {
    console.log(req.params.id);
    /*
    mongo.connect(url, (err,db) => {
        if(err) throw err;
        
    }); */
});