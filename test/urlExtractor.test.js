import test from 'blue-tape';
import Promise from 'bluebird';
import urlExtractor from '../source/urlExtractor';

test('urlExtractor splits string at "http" and returns object with the two string halves', (t) => {
    const expectedReturnType = 'object';
    const actualReturnType = typeof urlExtractor();
    t.equal(actualReturnType,expectedReturnType, 'urlExtractor should return an object');
    
    const expectedNoSplit= {path:'a string',url:null};
    const actualNoSplit = urlExtractor('a string');
    t.deepEqual(actualNoSplit,expectedNoSplit,'urlExtractor should return object with complete input string in "path" and "url" null');
    
    const expectedSplit = {path:'/get/a/route/',url:'http://www.atest'};
    const actualSplit = urlExtractor('/get/a/route/http://www.atest');
    t.deepEqual(actualSplit,expectedSplit,'urlExtractor should split the input string at "http"');
    
    t.end();
});