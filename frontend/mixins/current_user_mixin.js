var HashHistory = require('react-router').hashHistory;
var SessionStore = require('../stores/session_store');
var ClientActions = require('../actions/client_actions');

var CurrentUserMixin = {

  componentDidMount: function() {
    this.sessionListener = SessionStore.addListener(this.onSessionChange);
    ClientActions.fetchCurrentUser();
  },

  componentWillUnmount: function() {
    this.sessionListener.remove();
  },

  onSessionChange: function() {
    this.redirect();
  },

  redirect: function() {
    // var onAuth = window.location.hash.indexOf('auth') > -1;
    // if(SessionStore.loggedIn() && onAuth) {
    //   HashHistory.push('/');
    // }
    // else if(!SessionStore.loggedIn() && !onAuth) {
    //   HashHistory.push('/auth');
    // }
  }
};

module.exports = CurrentUserMixin;
