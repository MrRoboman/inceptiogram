var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var ProfileConstants = require('../constants/profile_constants');

var _profiles = [];
var _showProfile = {};
var _showProfilePics = {};

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

ProfileStore.getShowProfile = function(){
  return _showProfile;
};

var updateShowProfilePics = function() {
  var pics = _showProfile.pictures;
  for(var i = 0; i < pics.length; i++){
    _showProfilePics[pics[i].id] = pics[i];
  }
};

ProfileStore.getShowProfilePic = function(id) {
  return _showProfilePics[id];
};

ProfileStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case ProfileConstants.RECEIVED_PROFILES:
      _profiles = payload.profiles;
      this.__emitChange();
      break;
    case ProfileConstants.RECEIVED_SINGLE_PROFILE:
      updateProfile(payload.profile);
      _showProfile = payload.profile;
      updateShowProfilePics();
      this.__emitChange();
      break;
  }
};

// for testing (remove for production)
window.ProfileStore = ProfileStore;

module.exports = ProfileStore;
