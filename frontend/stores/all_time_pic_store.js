var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var PictureConstants = require('../constants/picture_constants');
var ProfileConstants = require('../constants/profile_constants');

var _allTimePics = {};

var AllTimePicStore = new Store(dispatcher);

AllTimePicStore.all = function() {
  return Object.assign({}, _allTimePics);
};

AllTimePicStore.empty = function() {
  return Object.keys(_allTimePics).length === 0;
};

AllTimePicStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PictureConstants.RECEIVED_PICTURES:
      payload.pictures.forEach(function(pic){
        _allTimePics[pic.id] = pic;
      });
      break;
    case PictureConstants.RECEIVED_SINGLE_PICTURE:
      _allTimePics[payload.picture.id] = payload.picture;
      break;
    case ProfileConstants.RECEIVED_PROFILES:
      payload.profiles.forEach(function(profile){
        profile.pictures.forEach(function(pic){
          _allTimePics[pic.id] = pic;
        });
      });
      break;
    case ProfileConstants.RECEIVED_SINGLE_PROFILE:
      payload.profile.pictures.forEach(function(pic) {
        _allTimePics[pic.id] = pic;
      });
      break;
  }
};

// for testing (remove for production)
window.AllTimePicStore = AllTimePicStore;

module.exports = AllTimePicStore;
