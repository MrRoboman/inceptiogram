var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');

var _currentUser = "";
var _authErrors = [];

var SessionStore = new Store(dispatcher);

SessionStore.getCurrentUser = function() {''
  return _currentUser.slice(); //TODO: do I need to copy this?
};

SessionStore.getErrors = function() {
  return _authErrors.slice();
};

//TODO: stay logged in!
SessionStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case UserConstants.RECEIVED_CURRENT_USER:
      _currentUser = payload.currentUser.username;
      _authErrors = [];
      this.__emitChange();
      break;
    case UserConstants.RECEIVED_ERROR:
      _currentUser = payload.errors.username;
      _authErrors = payload.errors.error;
      this.__emitChange();
      break;
  }
};

// for testing (remove for production)
window.SessionStore = SessionStore;

module.exports = SessionStore;
