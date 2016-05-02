var HashHistory = require('react-router').hashHistory;
var SessionStore = require('../stores/session_store');
var ClientActions = require('../actions/client_actions');

var CurrentUserMixin = {
  getInitialState: function() {
    return {currentUser: SessionStore.getCurrentUser(),
            currentUserId: SessionStore.getCurrentUserId()};
  },
  componentDidMount: function() {
    this.sessionListener = SessionStore.addListener(this.onSessionChange);
    if(!SessionStore.fetchSent()){
      ClientActions.fetchCurrentUser();
    }
    else if(SessionStore.fetchReceived() && SessionStore.getCurrentUser() === ""){
      HashHistory.push('login');
    }
  },
  componentWillUnmount: function() {
    this.sessionListener.remove();
  },
  onSessionChange: function() {
    var currentUser = SessionStore.getCurrentUser();
    this.setState({currentUser: currentUser});
    if(currentUser === ""){
      HashHistory.push('login');
    }
  }
};

module.exports = CurrentUserMixin;
