var React = require('react');
var Login = require('./login');
var Signup = require('./signup');

var AuthPage = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div className="flip-container" ontouchstart="this.classList.toggle('hover');">
      	<div className="flipper">
      		<div className="front">
      			FRONT
      		</div>
      		<div className="back">
      			BACK
      		</div>
      	</div>
      </div>
    );
  }
});

module.exports = AuthPage;
