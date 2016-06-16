var React = require('react');
var ClientActions = require('../actions/client_actions');

var Login = React.createClass({

  demo: {
    username: "Rob Kayson",
    password: "asdfasdf"
  },

  getInitialState: function() {
    return {username: "", password: "", errors: []};
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
  },

  submitDisabled: function() {
    return (
      !(this.state.username.length > 0 &&
        this.state.password.length > 0
       )
    );
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


        <ul className="red">
          {errors}
        </ul>

      </div>
    );
  }
});

// <div className="auth-flip">
//   <span>Need an account? <a onClick={this.props.toggleForm}>Sign Up</a></span>
// </div>

module.exports = Login;
