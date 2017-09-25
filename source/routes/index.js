const bodyParser = require('body-parser');
import urlExtractor from '../urlExtractor';
      //appHome = require('./react/url-input');

import urlValidator from '../urlValidator';


module.exports = function (app, db) {
  
  
  
  app.use(bodyParser.urlencoded({extended:true}));
  
  app.use((req,res,next) => {
    
    //extract url from req.url
    let output = urlExtractor(req.url);
    
    // set new url
    req.url = output.path;
    
    // store extracted url in request object so that it can be used in routes....?
    req.body.myUrl = output.url;
    

    console.log('myUrl - '+req.body.myUrl);
    console.log('req.url - '+req.url);
    console.log('new path - '+req.path);
    next();
  });
  
  app.get('/', (req,res) => {
      console.log('step 1');
      db.collection('urls').find().sort({shorturl: -1}).limit(1).toArray((err,docs) => {
        if(err) console.log('An error occurred: '+ err);
        if(!docs) res.send({result: "No documents in database"});
        console.log(typeof docs[0]);
        console.log(docs[0]);
        res.send({result: docs[0].shorturl+1});
      });
      //let body = appHome.home();
      //res.render('layout/basic',{body:body});
  });
  
  
  
  app.get('/new', (req,res) => {

      console.log(req.body.myUrl);
      //validate content
      if(!urlValidator(req.body.myUrl)) res.send({"Error":"Invalid URL; must be of format http://www.example.com"});
      
      // get largest shortId value     
      db.collection('urls').find().sort({shorturl: -1}).limit(1).toArray((err,docs) => {
        console.log('last object added: '+ JSON.stringify(docs[0]));
        
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
      
  });
  
  app.get('/:shortId', (req,res) => {
      console.log('shortId - '+ req.params.shortId );
      
      //convert short Id provided from string to number 
      let shortnum = parseInt(req.params.shortId, 10);
      
      //find entry in database with the provided short id
      db.collection('urls').find({shorturl: shortnum}).toArray((err, doc) => {
        console.log('made the search and array bit');
        
        //database error response
        if(err) return err;
        
        //response if there is no url with that short Id reference
        if(!doc) res.send({"Error":"No link with short url reference - '"+shortnum+"'."});
        
        console.log(doc);
        
        //redirect to url with that short Id reference
        res.redirect(doc[0].longurl);
      });
  });
  
  return app;
  
};
