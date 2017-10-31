'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MainContainer = function MainContainer(props) {

    var outputStyles = {
        fontFamily: 'Raleway, sans-serif',
        margin: '0 auto',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        background: '#B5E1E3',
        padding: '30px',
        boxSizing: 'border-box',
        boxShadow: '5px 5px 5px #333'
    };

    return _react2.default.createElement(
        'div',
        { style: outputStyles },
        props.children
    );
};

exports.default = MainContainer;