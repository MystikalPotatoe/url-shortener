'use strict';

const chai = require('chai'),
      expect = chai.expect,
      sinon = require('sinon'),
      chaiHttp = require('chai-http'),
      server = require('../source/server');
      
chai.use(chaiHttp);
      
describe('Customer opens homepage', function() {
    context('When a request to the homepage URL is made', function () {
        it('Then the homepage is returned', function(done) {
            chai.request(server)
                .get('/')
                .end(function(err,res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
})