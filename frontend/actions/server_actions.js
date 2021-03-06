var Dispatcher = require('../dispatcher/dispatcher.js');
var SessionConstants = require('../constants/session_constants.js');
var PictureConstants = require('../constants/picture_constants');
var ProfileConstants = require('../constants/profile_constants');

var ServerActions = {
  receiveCurrentUser: function(currentUser) {
    Dispatcher.dispatch({
      actionType: SessionConstants.RECEIVED_CURRENT_USER,
      currentUser: currentUser
    });
  },

  receiveErrors: function(errors) {
    Dispatcher.dispatch({
      actionType: SessionConstants.RECEIVED_ERROR,
      errors: errors.responseJSON
    });
  },


  receivePictures: function(pictures) {
    Dispatcher.dispatch({
      actionType: PictureConstants.RECEIVED_PICTURES,
      pictures: pictures
    });
  },

  receiveSinglePicture: function(picture) {
    // debugger;
    Dispatcher.dispatch({
      actionType: PictureConstants.RECEIVED_SINGLE_PICTURE,
      picture: picture
    });
  },


  receiveProfiles: function(profiles) {
    Dispatcher.dispatch({
      actionType: ProfileConstants.RECEIVED_PROFILES,
      profiles: profiles
    });
  },

  receiveSingleProfile: function(profile) {
    Dispatcher.dispatch({
      actionType: ProfileConstants.RECEIVED_SINGLE_PROFILE,
      profile: profile
    });
    Dispatcher.dispatch({
      actionType: PictureConstants.RECEIVED_PICTURES,
      pictures: profile.pictures
    });
  }
};

module.exports = ServerActions;
