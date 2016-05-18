var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var SessionConstants = require('../constants/session_constants');

var _fetchSent = false;
var _fetchReceived = false;
var _currentUser = null;
var _currentUserId = null;
var _authErrors = [];

var SessionStore = new Store(dispatcher);

SessionStore.fetchSent = function(hasBeenSent) {
  if(hasBeenSent === 'undefined') {
    return _fetchSent;
  }
  _fetchSent = hasBeenSent;
},

SessionStore.fetchReceived = function() {
  return _fetchReceived;
},

SessionStore.loggedIn = function() {
  if(_currentUser === null) return false;
  return _fetchReceived && _currentUser.length > 0;
};

SessionStore.getCurrentUser = function() {
  if(_currentUser === null) return null;
  return _currentUser.slice();
};

SessionStore.currentUserFetched = function() {
  return _currentUser !== null;
};

SessionStore.getCurrentUserId = function() {
  return _currentUserId;
};

SessionStore.getErrors = function() {
  return _authErrors.slice();
};

SessionStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case SessionConstants.RECEIVED_CURRENT_USER:
      _fetchReceived = true;
      _currentUser = payload.currentUser.username;
      _currentUserId = payload.currentUser.id;
      _authErrors = [];
      this.__emitChange();
      break;
    case SessionConstants.RECEIVED_ERROR:
      _currentUser = payload.errors.username;
      _authErrors = payload.errors.error;
      this.__emitChange();
      break;
  }
};

// for testing (remove for production)
window.SessionStore = SessionStore;

module.exports = SessionStore;
