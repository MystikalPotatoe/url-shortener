'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mainContainer = require('./main-container');

var _mainContainer2 = _interopRequireDefault(_mainContainer);

var _heading = require('./heading');

var _heading2 = _interopRequireDefault(_heading);

var _introduction = require('./introduction');

var _introduction2 = _interopRequireDefault(_introduction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var outputFactory = function outputFactory() {

  return _react2.default.createElement(
    _mainContainer2.default,
    null,
    _react2.default.createElement(_heading2.default, null),
    _react2.default.createElement(_introduction2.default, null)
  );
};

exports.default = outputFactory;