var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var HashHistory = require('react-router').hashHistory;

var SessionStore = require('./stores/session_store');

var PictureIndex = require('./components/picture_index');
var LoginForm = require('./components/login');
var SignupForm = require('./components/signup');
var ProfileIndex = require('./components/profile_index');
var Profile = require('./components/profile');

var ClientActions = require('./actions/client_actions');

var currentUser = "";
var App = React.createClass({

	getInitialState: function() {
		return {currentUser: ""};
	},

	componentDidMount: function() {
		this.listener = SessionStore.addListener(this._onSessionStoreChange);
		ClientActions.fetchCurrentUser();
	},

	componentWillUnmount: function() {
		this.listener.remove();
	},

	_onSessionStoreChange: function() {
		var username = "Current User: NOBODY!";
		if(SessionStore.getCurrentUser()) username = SessionStore.getCurrentUser();
		this.setState({currentUser: username});
		currentUser = username;
	},

	logout: function(e) {
		e.preventDefault();
		ClientActions.logout();
	},

	gotoPictures: function(e) {
		e.preventDefault();
		HashHistory.push('pictureindex');
	},

	gotoProfiles: function(e) {
		e.preventDefault();
		HashHistory.push('profileindex');
	},

	render: function() {
		var topleft = "Inceptiogram"; //Using this var to remember that I had {this.state.currentUser}
		var logoutButton = "";
		if(this.state.currentUser !== "Current User: NOBODY!"){
			logoutButton = (
				<div>
					<button onClick={this.logout}>Logout</button>
					<button onClick={this.gotoProfiles}>Profiles</button>
					<button onClick={this.gotoPictures}>Pictures</button>
					<i className="icon-map-marker"></i>
					<i className="fa fa fa-check-square" aria-hidden="true"></i>
				</div>
			);
		}
		return (
			<div className="app">
				<div className="appnav">
					{logoutButton}
					<h1>{topleft}</h1>
				</div>
				{this.props.children}
			</div>
		);
	}
});
var router = (
	<Router history={HashHistory}>
		<Route path='/' component={App}>
			<IndexRoute component={PictureIndex} />
			<Route component={PictureIndex} path="pictureindex" />
			<Route component={ProfileIndex} path="profileindex" />
			<Route component={Profile} path="profile/:id" />
			<Route component={SignupForm} path="signup" />
			<Route component={LoginForm} path="login" />
		</Route>
	</Router>
);

document.addEventListener('DOMContentLoaded', function () {
	ReactDOM.render(
	  router,
		document.getElementById('root')
	);
});
