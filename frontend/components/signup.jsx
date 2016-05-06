var React = require('react');
var ClientActions = require('../actions/client_actions');
var SessionStore = require('../stores/session_store');
var HashHistory = require('react-router').hashHistory;

var Signup = React.createClass({

  minUsernameLength: 1,
  minPasswordLength: 6,

  getInitialState: function() {
    return {username: "", password: "", retype: "", errors: []};
  },

  componentDidMount: function() {
    this.usernameInput = document.getElementById('username');
    this.passwordInput = document.getElementById('password');
    this.retypeInput = document.getElementById('retype');
    this.listener = SessionStore.addListener(this._onChange);
    if(!SessionStore.fetchSent()){
      ClientActions.fetchCurrentUser();
    }
    else if(SessionStore.fetchReceived() && SessionStore.getCurrentUser() === ""){
      HashHistory.push('login');
    }
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  _onChange: function() {
    var currentUser = SessionStore.getCurrentUser();
    var errors = SessionStore.getErrors();
    if(errors.length) {
      this.setState({errors: errors});
      //TODO: focus on username field, select the previous name that was there
    }else if(currentUser.length > 0){
      HashHistory.push("profileindex");
    }
  },

  usernameChange: function(e) {
    this.setState({username: e.target.value});
  },

  passwordChange: function(e) {
    this.setState({password: e.target.value});
  },

  retypeChange: function(e) {
    this.setState({retype: e.target.value});
  },

  submit: function(e) {
    e.preventDefault();
    ClientActions.createUser(this.state);
    // this.setState({password: "", retype: ""});
    // this.usernameInput.select();
  },

  submitDisabled: function() {
    return (
      !(this.state.username.length >= this.minUsernameLength &&
        this.state.password.length >= this.minPasswordLength &&
        this.state.password === this.state.retype)
    );
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

  gotoLogin: function(e){
    e.preventDefault();
    HashHistory.push("login");
  },

  render: function() {
    var errors = this.state.errors.map(function(error){
      return <li key={error}>{error}</li>;
    });

    return (
      <div className="authform">
        <h2>Sign Up</h2>
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
});

module.exports = Signup;
