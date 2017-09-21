const app = require('../source'),
      test = require('blue-tape'),
      request = require('supertest');

test('Correct users returned', function (t) {
  request(app)
    .get('/')
    .expect(200)
    .end(function (err, res) {
      t.pass('this test will pass');
      t.same(res.body,{result:3},'testing response content to be {result: 3}');
      t.end();
    });
}); 

