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
var AuthPage = require('./components/auth_page');
var ProfileIndex = require('./components/profile_index');
var Profile = require('./components/profile');

var ClientActions = require('./actions/client_actions');

var imgTag = require('./utils/helper').imgTag;
var Modal = require("react-modal");
var AllTimePicStore = require('./stores/all_time_pic_store');
var Inception = require('./utils/inception_fullscreen');

var currentUser = "";
var App = React.createClass({

	getInitialState: function() {
		return {currentUser: ""};
	},

	componentDidMount: function() {
		this.listener = SessionStore.addListener(this._onSessionStoreChange);
		ClientActions.fetchCurrentUser();

		//Inception
		if(AllTimePicStore.empty()) {
      ClientActions.fetchAllPics();
      this.allPicStoreListener = AllTimePicStore.addListener(this.onAllTimePicStoreChange);
    }
    else {
      this.loadInception();
    }
	},

	loadInception: function() {
    if(!window.inception){
	    var canvas = document.getElementById('canvas');
	    window.inception = new Inception(canvas, AllTimePicStore.all());
			if(SessionStore.loggedIn()){
				window.inception.stop();
			}
		}
  },

	componentWillUnmount: function() {
		this.listener.remove();
		this.allPicStoreListener.remove();
	},

	onAllTimePicStoreChange: function() {
    this.loadInception();
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
		window.inception.play();
	},

	gotoPictures: function(e) {
		e.preventDefault();
		HashHistory.push('/');
		window.inception.stop();
	},

	gotoProfiles: function(e) {
		e.preventDefault();
		HashHistory.push('profileindex');
		window.inception.stop();
	},

	gotoCurrentUserProfile: function() {
		HashHistory.push('profile/' + SessionStore.getCurrentUserId());
		window.inception.stop();
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

	render: function() {
		var topleft = "Inceptiogram"; //Using this var to remember that I had {this.state.currentUser}
		var navIcons = "";
		if(this.state.currentUser !== "Current User: NOBODY!"){
			navIcons = (
				<div className="nav-buttons">
					<div className="icon">
						<i onClick={this.gotoProfiles} className="fa fa-users fa-2x"></i>
					</div>
					<div className="icon">
						<i onClick={this.gotoCurrentUserProfile} className="fa fa-user fa-2x"></i>
					</div>
					<div className="icon">
						<i onClick={this.logout} className="fa fa-sign-out fa-2x"></i>
					</div>
				</div>
			);
		}
		return (
			<div className="app">
				<div className="appnav">
					<div className="appnav-inner-container">
						<h1 onClick={this.gotoPictures}>{topleft}</h1>
						{navIcons}
					</div>
				</div>
				<canvas id="canvas"></canvas>
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
			<Route component={AuthPage} path="login" />
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
