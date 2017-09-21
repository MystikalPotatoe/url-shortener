'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react'),
    ReactDOMServer = require('react-dom/server');

var MyLink = function (_React$Component) {
    _inherits(MyLink, _React$Component);

    function MyLink() {
        _classCallCheck(this, MyLink);

        return _possibleConstructorReturn(this, (MyLink.__proto__ || Object.getPrototypeOf(MyLink)).apply(this, arguments));
    }

    _createClass(MyLink, [{
        key: 'render',
        value: function render() {
            var _React$createElement;

            return React.createElement('input', (_React$createElement = { type: 'text', name: 'userlink', 'data-info': 'The link provided by the user', placeholder: 'Add your link here', required: true, title: 'You need to provide a link.' }, _defineProperty(_React$createElement, 'required', 'required'), _defineProperty(_React$createElement, 'id', 'userlink'), _React$createElement));
        }
    }]);

    return MyLink;
}(React.Component);

var Home = React.createClass({
    displayName: 'Home',

    render: function render() {
        return React.createElement(
            'form',
            { method: 'post', 'accept-charset': 'utf-8', action: '/' },
            React.createElement(MyLink, null),
            React.createElement(
                'button',
                { type: 'submit' },
                'Submit'
            )
        );
    }

});

var Result = function (_React$Component2) {
    _inherits(Result, _React$Component2);

    function Result() {
        _classCallCheck(this, Result);

        return _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).apply(this, arguments));
    }

    _createClass(Result, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'p',
                null,
                'Resulting Short Link - ',
                this.props.output
            );
        }
    }]);

    return Result;
}(React.Component);

module.exports = {
    home: function home() {
        return ReactDOMServer.renderToString(React.createElement(Home, null));
    },

    result: function result(output) {
        return ReactDOMServer.renderToString(React.createElement(Result, { output: output }));
    }
};