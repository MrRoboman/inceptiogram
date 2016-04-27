var React = require('react');
var ClientActions = require('../actions/client_actions');

var Login = React.createClass({
  getInitialState: function() {
    return {username: "", password: ""};
  },

  usernameChange: function(e) {
    this.setState({username: e.target.value});
  },

  passwordChange: function(e) {
    this.setState({password: e.target.value});
  },

  submit: function() {
    ClientActions.login(this.state);
    this.setState({username: "", password: ""});
  },

  render: function() {
    return (
      <div>
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
          <input type="submit" value="submit"/>
        </form>
      </div>
    );
  }
});

module.exports = Login;
