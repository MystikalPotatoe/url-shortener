'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var intro = function intro() {

    var outputStyles = {
        color: '#212121'
    };

    return _react2.default.createElement(
        'p',
        { style: outputStyles },
        'This web app is my version of the FreeCodeCamp Url Shortener project. Hope you like it!'
    );
};

exports.default = intro;