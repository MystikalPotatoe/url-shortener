const bodyParser = require('body-parser');
import urlExtractor from '../urlExtractor';
      //appHome = require('./react/url-input');

import urlValidator from '../urlValidator';
import { renderToString } from 'react-dom/server';
import MiniApp from '../react/mini';
import React from 'react';
import path from 'path';

// const MiniApp = miniApp({ React });


module.exports = function (app, db) {
  
  
  
  app.use(bodyParser.urlencoded({extended:true}));
  // Ignore view engine set because we are using react server rendering
  app.set('view engine','ejs');
  app.set('views',path.join(process.cwd(),'views'));
  
  app.use((req,res,next) => {
    
    //extract url from req.url
    let output = urlExtractor(req.url);
    
    // set new url
    req.url = output.path;
    
    // store extracted url in request object so that it can be used in routes....?
    req.body.myUrl = output.url;
    

    // console.log('myUrl - '+req.body.myUrl);
    // console.log('req.url - '+req.url);
    // console.log('new path - '+req.path);
    next();
  });
  
  app.get('/', (req,res) => {
      db.collection('urls').find().sort({shorturl: -1}).limit(1).toArray((err,docs) => {
        if(err) console.log('An error occurred: '+ err);
        if(!docs) res.send({result: "No documents in database"});
        // console.log(docs[0]);
      });
      res.set('Content-Type', 'text/html');
      let body = renderToString(<MiniApp />);
      let title = "URL Shortener";
      res.render('layout/template',{body:body,title:title});
  });
  
  
  
  app.get('/new', (req,res,next) => {

      console.log(req.body.myUrl);
      //validate content
      if(!urlValidator(req.body.myUrl)) {
        
        res.send({"Error":"Invalid URL; must be of format http://www.example.com"});
        
      } else {
      
        // get largest shortId value     
        db.collection('urls').find().sort({shorturl: -1}).limit(1).toArray((err,docs) => {
          
          //set next Id to increment from the largest Id 
          let newId = docs[0].shorturl+1;
          
          //create new database document, storing short and complete url
          let newitem = {shorturl: newId, longurl: req.body.myUrl};
          
          //insert new document
          db.collection('urls').insertOne(newitem, (err, result) => {
            if(err) return alert(err);
            
            //on success return json object that was stored in the API response
            res.send(newitem);
          });
        });
      }
  });
  
  app.get('/:shortId', (req,res) => {
      
      //convert short Id provided from string to number 
      let shortnum = parseInt(req.params.shortId, 10);
      
      //find entry in database with the provided short id
      db.collection('urls').find({shorturl: shortnum}).toArray((err, doc) => {
        
        //database error response
        if(err) return err;
        
        //response if there is no url with that short Id reference
        if(doc.length === 0) {
          
          res.send({"Error":"No link with short url reference - '"+req.params.shortId+"'."});
      
        } else {
        
          //redirect to url with that short Id reference
          res.redirect(doc[0].longurl);
        }
      });
  });
  
  app.use((req,res) => {
    res.send(404);
  });
  
  // return app;
  
};
