'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Heading = function Heading() {

    var outputStyles = {
        alignSelf: 'center',
        color: '#E0681B'
    };

    return _react2.default.createElement(
        'h1',
        { style: outputStyles },
        'URL Shortener'
    );
};

exports.default = Heading;