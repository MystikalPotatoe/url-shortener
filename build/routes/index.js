'use strict';

var _urlExtractor = require('../urlExtractor');

var _urlExtractor2 = _interopRequireDefault(_urlExtractor);

var _urlValidator = require('../urlValidator');

var _urlValidator2 = _interopRequireDefault(_urlValidator);

var _template = require('../react/template');

var _template2 = _interopRequireDefault(_template);

var _server = require('react-dom/server');

var _mini = require('../react/mini');

var _mini2 = _interopRequireDefault(_mini);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bodyParser = require('body-parser');
//appHome = require('./react/url-input');

// const MiniApp = miniApp({ React });


module.exports = function (app, db) {

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(function (req, res, next) {

    //extract url from req.url
    var output = (0, _urlExtractor2.default)(req.url);

    // set new url
    req.url = output.path;

    // store extracted url in request object so that it can be used in routes....?
    req.body.myUrl = output.url;

    // console.log('myUrl - '+req.body.myUrl);
    // console.log('req.url - '+req.url);
    // console.log('new path - '+req.path);
    next();
  });

  app.get('/', function (req, res) {
    db.collection('urls').find().sort({ shorturl: -1 }).limit(1).toArray(function (err, docs) {
      if (err) console.log('An error occurred: ' + err);
      if (!docs) res.send({ result: "No documents in database" });
      // console.log(docs[0]);
    });
    res.set('Content-Type', 'text/html');
    var body = (0, _server.renderToString)(_react2.default.createElement(_mini2.default, null));
    var title = "URL Shortener";
    res.render('layout/template', { body: body, title: title });
  });

  app.get('/new', function (req, res, next) {

    console.log(req.body.myUrl);
    //validate content
    if (!(0, _urlValidator2.default)(req.body.myUrl)) {

      res.send({ "Error": "Invalid URL; must be of format http://www.example.com" });
    } else {

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
    }
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