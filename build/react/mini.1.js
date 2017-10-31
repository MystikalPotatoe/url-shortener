'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var outputFactory = function outputFactory(_ref) {
  var React = _ref.React;

  // Declare what you need from React --> const { string, func } = React.PropTypes;
  return function Output(props) {
    //Declare expected props and proptypes
    return {
      props: props,
      //componentDidUpdate
      render: function render() {
        // name for expected props
        // const { word, mode } = this.props;
        // set styles

        var outputStyles = {
          width: '50vw',
          background: 'blue',
          color: 'yellow'
        };

        return React.createElement(
          'div',
          { style: outputStyles },
          React.createElement(
            'h1',
            null,
            'Well, Hello there .... World!'
          ),
          React.createElement(
            'p',
            null,
            'pleased to make your acquaintance'
          )
        );
      }
    };
  };
};

exports.default = outputFactory;