'use strict';

const outputFactory = function ({ React }) {
  // Declare what you need from React --> const { string, func } = React.PropTypes;
  return function Output(props) {
    //Declare expected props and proptypes
    return {
      props,
      //componentDidUpdate
      render () {
        // name for expected props
        // const { word, mode } = this.props;
        // set styles
        
        const outputStyles = {
          width:'50vw',
          background: 'blue',
          color: 'yellow'
        };
        
        return (
          <div style={ outputStyles }>
            <h1>Well, Hello there .... World!</h1>
            <p>pleased to make your acquaintance</p>
          </div>
        );
      }
    };
  };
};

export default outputFactory;