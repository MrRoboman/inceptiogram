var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');

var _currentUser = null;
var _authErrors = [];

var UserStore = new Store(dispatcher);

// UserStore.all = function() {
//   return Object.assign({}, _users);
// };

UserStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case UserConstants.RECEIVED_CURRENT_USER:
      _currentUser = payload.currentUser;
      break;
  }
};

// for testing (remove for production)
window.UserStore = UserStore;

module.exports = UserStore;
