var React = require('react');
 
 module.exports = React.createClass({
 	render: function () {
 		return(
 			<div>
 				Hello World!
 				{this.props.children}
 			</div>
 		);
 	}
 });

