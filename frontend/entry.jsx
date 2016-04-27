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
var ClientActions = require('./actions/client_actions');

// var App = require('./components/app.jsx');
var App = React.createClass({

	getInitialState: function() {
		return {currentUser: "Current User: NOBODY!"};
	},

	componentDidMount: function() {
		this.listener = UserStore.addListener(this._onUserStoreChange);
		ClientActions.fetchCurrentUser();
	},

	componentWillUnmount: function() {
		this.listener.remove();
	},

	_onUserStoreChange: function() {
		var username = "Current User: NOBODY!";
		if(UserStore.getCurrentUser()) username = UserStore.getCurrentUser();
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
var router = (
	<Router history={HashHistory}>
		<Route path='/' component={App}>
			<IndexRoute component={LoginForm} />
			<Route component={SignupForm} path="signup" />
			<Route component={LoginForm} path="login" />
			<Route component={PictureIndex} path="pictureindex" />
		</Route>
	</Router>
);

document.addEventListener('DOMContentLoaded', function () {
	ReactDOM.render(
	  router,
		document.getElementById('root')
	);
});
