var React = require('react');

 module.exports = React.createClass({
 	render: function () {
 		return(
 			<div>
 				Inceptiogram
 				{this.props.children}
 			</div>
 		);
 	}
 });
