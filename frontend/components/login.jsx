var React = require('react');
var ClientActions = require('../actions/client_actions');
var HashHistory = require('react-router').hashHistory;
var UserStore = require('../stores/user_store');

var Login = React.createClass({
  getInitialState: function() {
    return {username: "", password: "", errors: []};
  },

  componentDidMount: function() {
    this.listener = UserStore.addListener(this.onChange);
    ClientActions.fetchCurrentUser();
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onChange: function() {
    var currentUser = UserStore.getCurrentUser();
    var errors = UserStore.getErrors();
    console.log('hey',errors);
    if(errors.length){
      this.setState({password: "", errors: errors});
    }else if(currentUser.length){
      HashHistory.push('pictureindex');
    }
  },

  usernameChange: function(e) {
    this.setState({username: e.target.value});
  },

  passwordChange: function(e) {
    this.setState({password: e.target.value});
  },

  submit: function() {
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

  render: function() {
    var errors = this.state.errors.map(function(error){
      return <li key={error}>{error}</li>;
    });
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.submit}>
          <p>Inceptiogram</p>
          <input type="text"
                 placeholder="Username"
                 onChange={this.usernameChange}
                 value={this.state.username}/>
          <br/>
          <input type="password"
                 placeholder="Password"
                 onChange={this.passwordChange}
                 value={this.state.password}/>
          <br/>
          <input type="submit" value="submit" disabled={this.submitDisabled()}/>
        </form>
        <p>Need an account?</p>
        <button onClick={this.gotoSignup}>Sign Up</button>
        <ul>
          {errors}
        </ul>
      </div>
    );
  }
});

module.exports = Login;
