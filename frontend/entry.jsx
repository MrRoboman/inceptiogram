var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var HashHistory = require('react-router').hashHistory;

require('./actions/client_actions');

// var App = require('./components/app.jsx');
var App = {};
var routes = (
	<Route path='/' component={App}>
	</Route>
);

document.addEventListener('DOMContentLoaded', function () {
	ReactDOM.render(

  <div>Hi</div>,
	document.getElementById('root')
	);
});
