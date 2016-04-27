var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var HashHistory = require('react-router').hashHistory;

var UserStore = require('./stores/user_store');
var PictureIndex = require('./components/picture_index');
var LoginForm = require('./components/login');
var SignupForm = require('./components/signup');

// var App = require('./components/app.jsx');
var App = React.createClass({

	getInitialState: function() {
		return {currentUser: "blah"};
	},

	componentDidMount: function() {
		this.listener = UserStore.addListener(this._onUserStoreChange);
	},

	componentWillUnmount: function() {
		this.listener.remove();
	},

	_onUserStoreChange: function() {
		var username = "notloggedin";
		if(UserStore.getCurrentUser()) username = UserStore.getCurrentUser().username;
		this.setState({currentUser: username});
	},

	render: function() {

		return (
			<div>
				<h1>{this.state.currentUser}</h1>
				{this.props.children}
			</div>
		);
	}
});
var routes = (
	<Route path='/' component={App}>
		<IndexRoute component={SignupForm}/>
	</Route>
);

document.addEventListener('DOMContentLoaded', function () {
	ReactDOM.render(
	  <Router history={HashHistory} routes={routes} />,
		document.getElementById('root')
	);
});
