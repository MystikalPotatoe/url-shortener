'use strict';

const app = require('express')(),
      test = require('tape'),
      routes = require('../source/routes/index'),
      DB = require('');
      request = require('supertest');

// Temporary Test App for checking valid test structure
// app.get('/',(req,res) => {
//   res.status(200).json({ name: 'tobi' });
//   console.log('200 done');
// });

//db.connect()
DB.connect(process.env.MONGO_URI,() => {console.log("Database connection open")});

routes(app,DB.getDB());

test('Correct users returned', function (t) {
  request(app)
    .get('/')
    .expect(200)
    .end(function (err, res) {
      if (err) console.log('broken');
      console.log('does work!');
      t.pass('this test will pass');
      // t.same(res.body,{result:3},'testing response content to be {result: 3}');
      t.end();
    });
}); 

// for each test: refresh db if necessary; 