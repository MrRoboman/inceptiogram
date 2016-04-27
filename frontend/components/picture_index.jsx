//Picture Index
var ClientActions = require('../actions/client_actions');
var SessionStore = require('../stores/session_store');
var HashHistory = require('react-router').hashHistory;

var React = require('react');

module.exports = React.createClass({

  componentDidMount: function() {
    this.listener = SessionStore.addListener(this.onChange);
    ClientActions.fetchCurrentUser();
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onChange: function() {
    if(SessionStore.getCurrentUser() === ""){
      HashHistory.push("login");
    } else{
      //fetch pictures of this users followees
    }
  },

  render: function() {
    return (
      <div>
        Welcome to Inceptiogram {SessionStore.getCurrentUser()}
      </div>
    );
  }
});
