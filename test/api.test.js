'use strict';

const app = require('express')(),
      test = require('blue-tape'),
      routes = require('../source/routes/index'),
      DB = require('../source/utils/dbmodule'),
      request = require('supertest'),
      Promise = require('bluebird');

//Temporary Test App for checking valid test structure
// removed.....

//db.connect()
const setup = test;
const teardown = test;

setup('Preparing DB',(t) => {
  DB.connect(process.env.MONGO_URI,() => {
    console.log("Database connection open");
    routes(app,DB.getDB());
    t.end()});
});

//routes(app,DB.getDB());

// test('Correct users returned', function (t) {
//   //routes(app,DB.getDB());
//   DB.dropify().then(DB.fixify).then(() => {
//     request(app)
//       .get('/')
//       .expect(200)
//       .end(function (err, res) {
//         if (err) console.log('broken');
//         const db = DB.getDB();
//         const expected = 3;
//         db.collection('urls').find().toArray((err,docs) => {
//           const actual = docs.length;
//           t.equal(actual,expected,'both should be 3 as there are three entries in the test collection "urls"');
//         });
//         console.log(res);
//         t.equal(res.body.result,4,"test data had 3 entries, so the next shorturl number should be 4");
//         // t.same(res.body,{result:3},'testing response content to be {result: 3}');
//         t.end();
//       });
//   });
// });

// test('Add new url', function (t) {
//   //routes(app,DB.getDB());
//   DB.dropify().then(DB.fixify).then(() => {
//     request(app)
//       .get('/new/http://www.medium.com')
//       .expect(200)
//       .end(function (err, res) {
//         const expected = 'http://www.medium.com';
//         const actual = res.body.longurl;
//         t.equal(actual,expected,"expecting provided url to be stored ('http://www.medium.com");
//         t.end();
//       });
//   });
// });

test('Error - Add new invalid url', function (t) {
  //routes(app,DB.getDB());
  DB.dropify().then(DB.fixify).then(() => {
    request(app)
      //very small difference to demonstrate negative flow, missing '/'
      .get('/new/http:/www.medium.com')
      .expect(200)
      .end(function (err, res) {
        const expected = "Invalid URL; must be of format http://www.example.com";
        const actual = res.body.Error;
        t.equal(actual,expected,"expecting error response to be returned");
        t.end();
      });
  });
});

teardown('Closing DB', (t) => {
  DB.close(() => {t.end()});
});

// for each test: refresh db if necessary; 