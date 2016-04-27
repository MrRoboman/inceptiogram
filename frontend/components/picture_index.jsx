//Picture Index
var ClientActions = require('../actions/client_actions');
var UserStore = require('../stores/user_store');
var HashHistory = require('react-router').hashHistory;

var React = require('react');

module.exports = React.createClass({

  componentDidMount: function() {
    this.listener = UserStore.addListener(this.onChange);
    ClientActions.fetchCurrentUser();
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onChange: function() {
    if(UserStore.getCurrentUser() === ""){
      HashHistory.push("login");
    } else{
      //fetch pictures of this users followees
    }
  },

  render: function() {
    return (
      <div>
        Welcome to Inceptiogram {UserStore.getCurrentUser()}
      </div>
    );
  }
});
