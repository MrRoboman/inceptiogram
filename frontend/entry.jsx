var React = require('react');
 var ReactDOM = require('react-dom');
 var Router = require('react-router').Router;
 var Route = require('react-router').Route;
 var HashHistory = require('react-router').hashHistory;
 
 var App = require('./components/app.jsx');
 
 var routes = (
 	<Route path='/' component={App}>
 	</Route>
 );
 
 document.addEventListener('DOMContentLoaded', function () {
 	ReactDOM.render(
 		<Router history={HashHistory}>{routes}</Router>,
 		document.getElementById('root')
 	);
 });

