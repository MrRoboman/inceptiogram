var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var HashHistory = require('react-router').hashHistory;

var PictureIndex = require('./components/picture_index');

// var App = require('./components/app.jsx');
var App = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Replace me with a header</h1>
				{this.props.children}
			</div>
		);
	}
});
var routes = (
	<Route path='/' component={App}>
		<IndexRoute component={PictureIndex}/>
	</Route>
);

document.addEventListener('DOMContentLoaded', function () {
	ReactDOM.render(
	  <Router history={HashHistory} routes={routes} />,
		document.getElementById('root')
	);
});
