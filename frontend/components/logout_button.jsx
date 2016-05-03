var React = require('react');
var ClientActions = require('../actions/client_actions');

var LogoutButton = React.createClass({
  getInitialState: function() {
    return {};
  },

  onClick: function() {
    ClientActions.logout();
  },

  render: function() {
    var className = "follow-button follow";
    var btn = <button className={className} onClick={this.onClick}>Logout</button>;
    return (
      <div>
        {btn}
      </div>
    );
  }
});

module.exports = LogoutButton;
