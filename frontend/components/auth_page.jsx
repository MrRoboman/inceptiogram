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
    return {username: "",
            password: "",
            errors: [],
            login: true
            // title: "",
            // usernamePlaceholder: "",
            // passwordPlaceholder: "",
            // retypePlaceholder: "",
            // submit: "",
            // loginAsGuest: "",
            // switchMode: "",
            // switchModeLink: ""
          };
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

  },

  componentWillUnmount: function() {
    this.listener.remove();
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

  submitLogin: function(e) {
    e.preventDefault();
    ClientActions.login(this.state);
    window.inception.stop();
  },

  submitSignup: function(e) {
    e.preventDefault();
    ClientActions.createUser(this.state);
    window.inception.stop();
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
    this.setState({login: false});
  },

  gotoLogin: function(e) {
    e.preventDefault();
    this.setState({login: true});
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
          window.inception.stop();
        }.bind(this), 200);
      }
    }.bind(this), 100);
  },

  passwordHelper: function() {
    if(document.activeElement === this.passwordInput){
      var password = this.state.password;
      if(password.length > 0 && password.length < this.minPasswordLength){
        return <li>Password must be at least {this.minPasswordLength} long</li>;
      }
    }
    else if(document.activeElement === this.retypeInput){
      if(this.state.retype !== this.state.password){
        return <li>Passwords much match</li>;
      }
    }
  },


  getContent: function() {
    if(this.state.login) {
      var errors = this.state.errors.map(function(error){
        return <li key={error}>{error}</li>;
      });
      return (
        <div className="authform">
          <h2>Login</h2>
          <form onSubmit={this.submitLogin}>
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
          <button className="bottom-margin" onClick={this.clickGuest}>Sign in as Guest</button>
          <div className="auth-flip">
            <span>Need an account? <a onClick={this.gotoSignup}>Sign Up</a></span>
          </div>
          <ul className="red">
            {errors}
          </ul>
        </div>
      );
    }
    else {
      var errors = this.state.errors.map(function(error){
        return <li key={error}>{error}</li>;
      });

      return (
        <div className="authform">
          <h2>Sign Up</h2>
          <form onSubmit={this.submitSignup}>
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
            <input id="retype"
                   type="password"
                   placeholder="Retype Password"
                   onChange={this.retypeChange}
                   value={this.state.retype}/>
            <br/>
            <input type="submit" value="submit" disabled={this.submitDisabled()}/>
          </form>
          <div className="auth-flip">
            <p>Have an account? <a onClick={this.gotoLogin}>Log In</a></p>


          </div>
          <ul>
            {errors}
          </ul>
          <ul className="red">
            {this.passwordHelper()}
          </ul>
        </div>
      );
    }
  },

  render: function() {
    return this.getContent();
  }
});

module.exports = Login;
