
const React = require('react'),
      ReactDOMServer = require('react-dom/server');
      
class myLink extends React.Component {
    render () {
        return <input type="url" name="userlink" data-info="The link provided by the user" placeholder="Add your link here" required title="You need to provide a link." id="userlink"/>;
    }
}

var Register = React.createClass({
    render:function(){
        return <form method="post" accept-charset="utf-8" action="/">
                  <myLink />
                  <button type="submit">Submit</button>    
                </form>;
    }

});

module.exports = {
    register:function(msg){
        return ReactDOMServer.renderToString(<Register msg={msg} />);
    }
};