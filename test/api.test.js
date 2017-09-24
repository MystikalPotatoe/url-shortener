'use strict';

const app = require('express')(),
      test = require('blue-tape'),
      routes = require('../source/routes/index'),
      DB = require('../source/utils/dbmodule'),
      request = require('supertest'),
      Promise = require('bluebird');

//Temporary Test App for checking valid test structure
app.get('/',(req,res) => {
  //const db = DB.getDB();
  res.status(200).json({ name: 'tobi' });
  console.log('200 done');
});

//db.connect()
const setup = test;
const teardown = test;

setup('Preparing DB',(t) => {
  DB.connect(process.env.MONGO_URI,() => {console.log("Database connection open"); t.end()});
});

//routes(app,DB.getDB());

test('Correct users returned', function (t) {
  DB.dropify().then(DB.fixify).then(() => {
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if (err) console.log('broken');
        const db = DB.getDB();
        const expected = 3;
        db.collection('comments').find().toArray((err,docs) => {
          const actual = docs.length;
          t.equal(actual,expected,'both should be 3 as there are three entries in the test collection "comments"');
        });
        // t.same(res.body,{result:3},'testing response content to be {result: 3}');
        t.end();
      });
  });
});

teardown('Clsoing DB', (t) => {
  DB.close(() => {t.end()});
});

// for each test: refresh db if necessary; 