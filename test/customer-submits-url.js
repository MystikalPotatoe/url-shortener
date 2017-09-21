'use strict';

let chai = require('chai'),
      expect = chai.expect;
      
import urlValidator from '../source/url-validator';
      
describe('The urlValidator', () => {
    it('returns the provided url if it is of the format http://www.example.com', (done) => {
        const url = 'http://www.example.com';
        expect(urlValidator(url)).to.equal(url);
        done();
    });
    it('returns an error message if the provided url is not of the format http://www.example.com', (done) => {
        const badURL = 'badexample.com';
        expect(urlValidator(badURL)).to.equal('Invalid URL - ' + badURL + 'please follow the format http://www.example.com');
        done();
    });
})