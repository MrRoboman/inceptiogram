var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var HashHistory = require('react-router').hashHistory;
var linkToProfile = require('./utils/helper').linkToProfile;

var SessionStore = require('./stores/session_store');

var PictureIndex = require('./components/picture_index');
var LoginForm = require('./components/login');
var SignupForm = require('./components/signup');
var ProfileIndex = require('./components/profile_index');
var Profile = require('./components/profile');

var ClientActions = require('./actions/client_actions');

var imgTag = require('./utils/helper').imgTag;
var Modal = require("react-modal");

var Auth = require('./components/auth');

var App = React.createClass({

	getInitialState: function() {
		return {loggedIn: false};
	},

	componentDidMount: function() {
		this.listener = SessionStore.addListener(this.onSessionChange);
		ClientActions.login({username: "Rob Kayson", password: "asdfasdf"});
	},

	componentWillUnmount: function() {
		this.listener.remove();
	},

	onSessionChange: function() {
		if(SessionStore.loggedIn()){
			ClientActions.fetchPictures();
		}
		this.setState({loggedIn: SessionStore.loggedIn()});
	},

	logout: function(e) {
		e.preventDefault();
		ClientActions.logout();
	},

	gotoPictures: function(e) {
		e.preventDefault();
		HashHistory.push('/');
	},

	gotoProfiles: function(e) {
		e.preventDefault();
		HashHistory.push('profileindex');
	},

	upload: function(e) {
		e.preventDefault();
		cloudinary.openUploadWidget(
			window.cloudinary_options,
			function(error, images){
				if(error === null){
					ClientActions.uploadImages(images);
				}
		});
	},

	gotoCurrentUserProfile: function() {

	},

	// <div className="icon">
	// 	<i onClick={this.logout} className="fa fa-sign-out fa-2x"></i>
	// </div>

	render: function() {
		var topleft = "Inceptiogram"; //Using this var to remember that I had {this.state.currentUser}
		var icons = "";
		if(this.state.loggedIn) {
			icons = (
				<div className="nav-buttons">
					<div className="icon">
						<i onClick={this.gotoProfiles} className="fa fa-users fa-2x"></i>
					</div>
					<div className="icon">
						<i onClick={this.gotoCurrentUserProfile} className="fa fa-user fa-2x"></i>
					</div>
				</div>
			);
		}
		return (
			<div className="app">
				<div className="appnav">
					<div className="appnav-inner-container">
						<h1 onClick={this.gotoPictures}>{topleft}</h1>
						{icons}
					</div>
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
			<Route component={ProfileIndex} path="profileindex" />
			<Route component={Profile} path="profile/:id" />
			<Route component={SignupForm} path="signup" />
			<Route component={Auth} path="auth" />
		</Route>
	</Router>
);

document.addEventListener('DOMContentLoaded', function () {
	Modal.setAppElement(document.body);
	ReactDOM.render(
	  router,
		document.getElementById('root')
	);
});


window.up = function() {
	cloudinary.openUploadWidget(
		window.cloudinary_options,
		function(error, images){
			if(error === null){
				ClientActions.uploadImages(images);
			}
	});
};
// <div className="icon">
// 	<i onClick={this.upload} className="fa fa-cloud-upload fa-2x"></i>
// </div>
