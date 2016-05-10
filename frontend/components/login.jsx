var React = require('react');
var ClientActions = require('../actions/client_actions');
var HashHistory = require('react-router').hashHistory;
var SessionStore = require('../stores/session_store');
var Inception = require('../utils/inception_fullscreen');
var AllTimePicStore = require('../stores/all_time_pic_store');

var Login = React.createClass({

  demo: {
    username: "Rob Kayson",
    password: "asdfasdf"
  },

  getInitialState: function() {
    return {username: "", password: "", errors: []};
  },

  componentDidMount: function() {
    this.listener = SessionStore.addListener(this.onChange);
    if(!SessionStore.fetchSent()){
      ClientActions.fetchCurrentUser();
    }
    else if(SessionStore.fetchReceived() && SessionStore.getCurrentUser() === ""){
      HashHistory.push('login');
    }
// debugger;
    if(AllTimePicStore.empty()) {
      ClientActions.fetchAllPics();
      this.allPicStoreListener = AllTimePicStore.addListener(this.onAllTimePicStoreChange);
    }
    else {
      this.loadInception();
    }
  },

  loadInception: function() {
    // console.log(document.getElementById('canvas'));
    var canvas = document.getElementById('canvas');
    this.inception = new Inception(canvas, AllTimePicStore.all());
  },

  componentWillUnmount: function() {
    this.listener.remove();
    this.allPicStoreListener.remove();
  },

  onAllTimePicStoreChange: function() {
    this.loadInception();
  },

  onChange: function() {
    var currentUser = SessionStore.getCurrentUser();
    var errors = SessionStore.getErrors();
    if(errors.length){
      this.setState({password: "", errors: errors});
    }else if(currentUser.length){
      HashHistory.push('/');
    }
  },

  usernameChange: function(e) {
    this.setState({username: e.target.value});
  },

  passwordChange: function(e) {
    this.setState({password: e.target.value});
  },

  submit: function(e) {
    e.preventDefault();
    ClientActions.login(this.state);
    // this.setState({username: "", password: ""});
    // HashHistory.push("pictureindex");
  },

//TODO: set minusernamelength, minPasswordLength as object var
//TODO: there is a possible bug: when I didnt use this disable function and submitted I would be logged in for a sec
// then the name would change back to not logged in.
  submitDisabled: function() {
    return (
      !(this.state.username.length > 0 &&
        this.state.password.length > 0
       )
    );
  },

  gotoSignup: function(e) {
    e.preventDefault();
    HashHistory.push("signup");
  },

  clickGuest: function(e){
    e.preventDefault();

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

  render: function() {
    var errors = this.state.errors.map(function(error){
      return <li key={error}>{error}</li>;
    });
    return (
      <div className="authform">
        <h2>Login</h2>
        <form onSubmit={this.submit}>
          <input id="username"
                 type="text"
                 placeholder="Username"
                 onChange={this.usernameChange}
                 value={this.state.username}/>
          <br/>
          <input id="password"
                 type="password"
                 placeholder="Password"
                 onChange={this.passwordChange}
                 value={this.state.password}/>
          <br/>
          <input type="submit" value="submit" disabled={this.submitDisabled()}/>
        </form>
        <button className="bottom-margin" onClick={this.clickGuest}>Guest</button>
        <div className="auth-flip">
          <span>Need an account? <a onClick={this.gotoSignup}>Sign Up</a></span>
        </div>
        <ul className="red">
          {errors}
        </ul>
        <canvas id="canvas"></canvas>
      </div>
    );
  }
});

module.exports = Login;
