
const React = require('react'),
      ReactDOMServer = require('react-dom/server');
      
class MyLink extends React.Component {
    render () {
        return <input type="text" name="userlink" data-info="The link provided by the user" placeholder="Add your link here" required title="You need to provide a link." required="required" id="userlink" />;
    }
}

var Home = React.createClass({
    render:function(){
        return <form method="post" accept-charset="utf-8" action="/">
                  <MyLink />
                  <button type="submit">Submit</button>    
                </form>;
    }

});


class Result extends React.Component {
    render () {
        return <p>Resulting Short Link - {this.props.output}</p>;
    }
}

module.exports = {
    home:function(){
        return ReactDOMServer.renderToString(<Home />);
    },
    
    result:function(output){
        return ReactDOMServer.renderToString(<Result output={output}/>);
    }
};