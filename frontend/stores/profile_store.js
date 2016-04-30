var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var ProfileConstants = require('../constants/profile_constants');

var _profiles = [];

var ProfileStore = new Store(dispatcher);

ProfileStore.all = function() {
  return _profiles.slice();
};

var updateProfile = function(profile) {
  for(var i = 0; i < _profiles.length; i++){
    if(profile.id === _profiles[i].id){
      _profiles[i] = profile;
      return;
    }
  }
  _profiles.push(profile);
};

ProfileStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case ProfileConstants.RECEIVED_PROFILES:
      _profiles = payload.profiles;
      break;
    case ProfileConstants.RECEIVED_SINGLE_PROFILE:
      updateProfile(payload.profile);
      break;
  }
  this.__emitChange();
};

// for testing (remove for production)
window.ProfileStore = ProfileStore;

module.exports = ProfileStore;
