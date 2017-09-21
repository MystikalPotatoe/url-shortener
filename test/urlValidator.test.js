'use strict';

import test from 'blue-tape';
import Promise from 'bluebird';
import urlValidator from '../source/urlValidator';

test('urlValidator checks if a string input meets the format "https://www.example.com"', (t) => {
    const expectedNegativeOutput = false;
    const actualNegativeOutput = urlValidator('ABADEXAMPLE');
    t.equal(actualNegativeOutput,expectedNegativeOutput, 'urlValidator should return Boolean("false") for input of "ABADEXAMPLE"');
    
    const expectedPositiveOutput = true;
    const actualPositiveOutput = urlValidator('https://www.example.com');
    t.equal(actualPositiveOutput,expectedPositiveOutput,'urlValidator should return Boolean("true") for input of "https://www.example.com"');
    
    t.end();
});

