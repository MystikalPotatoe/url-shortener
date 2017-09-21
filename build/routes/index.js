'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _urlExtractor = require('../urlExtractor');

var _urlExtractor2 = _interopRequireDefault(_urlExtractor);

var _urlValidator = require('../urlValidator');

var _urlValidator2 = _interopRequireDefault(_urlValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bodyParser = require('body-parser');
//appHome = require('./react/url-input');

module.exports = function (app, db) {

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(function (req, res, next) {

    //extract url from req.url
    var output = (0, _urlExtractor2.default)(req.url);

    // set new url
    req.url = output.path;

    // store extracted url in request object so that it can be used in routes....?
    req.body.myUrl = output.url;

    console.log('myUrl - ' + req.body.myUrl);
    console.log('req.url - ' + req.url);
    console.log('new path - ' + req.path);
    next();
  });

  app.get('/', function (req, res) {
    console.log('step 1');
    db.collection('urls').find().sort({ shorturl: -1 }).limit(1).toArray(function (err, docs) {
      if (err) console.log('An error occurred: ' + err);
      if (!docs) res.send({ result: "No documents in database" });
      console.log(_typeof(docs[0]));
      console.log(docs[0]);
      res.send({ result: docs[0].shorturl + 1 });
    });
    //let body = appHome.home();
    //res.render('layout/basic',{body:body});
  });

  app.get('/new', function (req, res) {

    console.log(req.body.myUrl);
    //validate content
    if ((0, _urlValidator2.default)(req.body.myUrl)) res.send({ "Error": "Invalid URL; must be of format http://www.example.com" });

    // get largest shortId value     
    db.collection('urls').find().sort({ shorturl: -1 }).limit(1).toArray(function (err, docs) {
      console.log('last object added: ' + JSON.stringify(docs[0]));

      //set next Id to increment from the largest Id 
      var newId = docs[0].shorturl + 1;

      //create new database document, storing short and complete url
      var newitem = { shorturl: newId, longurl: req.body.myUrl };

      //insert new document
      db.collection('urls').insertOne(newitem, function (err, result) {
        if (err) return alert(err);

        //on success return json object that was stored in the API response
        res.send(newitem);
      });
    });
  });

  app.get('/:shortId', function (req, res) {
    console.log('shortId - ' + req.params.shortId);

    //convert short Id provided from string to number 
    var shortnum = parseInt(req.params.shortId, 10);

    //find entry in database with the provided short id
    db.collection('urls').find({ shorturl: shortnum }).toArray(function (err, doc) {
      console.log('made the search and array bit');

      //database error response
      if (err) return err;

      //response if there is no url with that short Id reference
      if (!doc) res.send({ "Error": "No link with short url reference - '" + shortnum + "'." });

      console.log(doc);

      //redirect to url with that short Id reference
      res.redirect(doc[0].longurl);
    });
  });

  return app;
};

// app.route('/')
//     .get((req,res) => {
//         let body = appHome.home();
//         res.render('layout/basic',{body:body});
//     })
//     .post((req,res) => {
//         let validationResult = urlValidator(req.body.userlink);
//         if (req.body.userlink !== validationResult) {
//             res.end(validationResult);
//         } 
//         mongo.connect(url, (err,db) => {
//             if(err) throw err;
//             console.log('successful server connection');
//             let links = db.collection('links');
//             links.insert({
//                 userlink: req.body.userlink,
//                 shortlink: 'the system generated short link'
//             });
//             db.close();
//         });
//         let body = appHome.result(req.body.userlink);
//         res.render('layout/basic',{body:body});
//     });

// app.get('/link/:id', (req,res) => {
//     console.log(req.params.id);
//     /*
//     mongo.connect(url, (err,db) => {
//         if(err) throw err;

//     }); */
// });