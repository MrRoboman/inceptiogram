var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var ProfileConstants = require('../constants/profile_constants');
var arrayToObject = require('../utils/array_to_object');
var objectToArray = require('../utils/object_to_array');

var _profiles = [];
var _singleProfile = {};
var _singleProfilePics = {};

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

ProfileStore.getSingleProfile = function(){
  return _singleProfile;
};

ProfileStore.getSingleProfilePic = function(id) {
  return _singleProfilePics[id];
};

var updateShowProfilePics = function() {
  var pics = _singleProfile.pictures;
  for(var i = 0; i < pics.length; i++){
    _singleProfilePics[pics[i].id] = pics[i];
  }
};

ProfileStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case ProfileConstants.RECEIVED_PROFILES:
      _profiles = payload.profiles;
      this.__emitChange();
      break;
    case ProfileConstants.RECEIVED_SINGLE_PROFILE:
      updateProfile(payload.profile);
      _singleProfile = payload.profile;
      updateShowProfilePics();
      this.__emitChange();
      break;
  }
};

// for testing (remove for production)
window.ProfileStore = ProfileStore;

module.exports = ProfileStore;
