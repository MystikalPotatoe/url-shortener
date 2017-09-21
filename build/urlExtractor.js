'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var urlExtractor = function urlExtractor(fullString) {
    if (typeof fullString !== 'string') return {};
    var start = fullString.indexOf('http');
    var output = {};
    console.log(start);
    output.path = start === -1 ? fullString : fullString.slice(0, start);
    output.url = start === -1 ? null : fullString.slice(start);
    return output;
};

exports.default = urlExtractor;