var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var ProfileConstants = require('../constants/profile_constants');

var _profiles = [];

var ProfileStore = new Store(dispatcher);

ProfileStore.all = function() {
  return _profiles.slice();
};

ProfileStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case ProfileConstants.RECEIVED_PROFILES:
      _profiles = payload.profiles;
      break;
  }
  this.__emitChange();
};

// for testing (remove for production)
window.ProfileStore = ProfileStore;

module.exports = ProfileStore;
