var React = require('react');
var ClientActions = require('../actions/client_actions');
var SessionStore = require('../stores/session_store');
var PictureStore = require('../stores/picture_store');
var CurrentUserMixin = require('../mixins/current_user_mixin');
var Login = require('./login');
var Signup = require('./signup');

var Auth = React.createClass({

  mixins: [CurrentUserMixin],

  demo: {
    username: "Rob Kayson",
    password: "asdfasdf"
  },

  getInitialState: function() {
    return {username: "", password: "", errors: [], form: "LOGIN"};
  },

  componentDidMount: function() {
    this.sessionListener = SessionStore.addListener(this.onChange);
    this.pictureListener = PictureStore.addListener(this.onPictureChange);
    ClientActions.fetchAllPictures();
  },

  componentWillUnmount: function() {
    this.sessionListener.remove();
    this.pictureListener.remove();
    if(this.mosaic) this.mosaic.dismount();
  },

  onChange: function() {
    var errors = SessionStore.getErrors();
    if(errors.length){
      this.setState({password: "", errors: errors});
    }
  },

  onPictureChange: function() {
    var imageUrls = PictureStore.getPictures().map(function(pic) {
      return pic.url;
    });
    console.log(imageUrls);
    this.mosaic = new Mosaic({
                              canvasId: 'auth-canvas',
                              imageUrls: imageUrls,
                              fullscreen: true,
                              cols: 40,
                              rows: 40
                            });
  },

  usernameChange: function(e) {
    this.setState({username: e.target.value});
  },

  passwordChange: function(e) {
    this.setState({password: e.target.value});
  },

  isSubmitDisabled: function() {
    return (
      !(this.state.username.length > 0 &&
        this.state.password.length > 0
       )
    );
  },

  gotoSignup: function(e) {
    e.preventDefault();
    this.setState({form: "SIGNUP"});
  },

  toggleForm: function() {
    var nextForm = this.state.form === "LOGIN" ? "SIGNUP" : "LOGIN";
    this.setState({form: nextForm});
  },

  clickGuest: function(e){
    e.preventDefault();

    if(this.interval) {
      clearInterval(this.interval);
    }

    this.setState({username: this.demo.username.slice(0,1), password: ""});
    this.interval = setInterval(function() {
      var stateUser = this.state.username;
      var demoUser = this.demo.username;
      var statePass = this.state.password;
      var demoPass = this.demo.password;

      if(stateUser !== demoUser){
        this.setState({username: demoUser.slice(0, stateUser.length + 1),
                       password: ""});
      }
      else if(this.state.password !== this.demo.password){
        this.setState({username: demoUser,
                       password: demoPass.slice(0, statePass.length + 1)});
      }
      else {
        clearInterval(this.interval);
        setTimeout(function() {
          ClientActions.login(this.state);
        }.bind(this), 200);
      }
    }.bind(this), 100);
  },

  form: function() {
    if(this.state.form === "LOGIN") {
      return <Login toggleForm={this.toggleForm}/>;
    }
    else {
      return <Signup toggleForm={this.toggleForm}/>;
    }
  },

  render: function() {

    var errors = this.state.errors.map(function(error){
      return <li key={error}>{error}</li>;
    });

    return (
      <div>
        <canvas id="auth-canvas"></canvas>
        {this.form()}
      </div>
    );
  }
});

module.exports = Auth;
