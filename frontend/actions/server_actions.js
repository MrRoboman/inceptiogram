var Dispatcher = require('../dispatcher/dispatcher.js');
var UserConstants = require('../constants/user_constants.js');
var pictureConstants = require('../constants/picture_constants');

var ServerActions = {
  receiveCurrentUser: function(currentUser) {
    Dispatcher.dispatch({
      actionType: UserConstants.RECEIVED_CURRENT_USER,
      currentUser: currentUser
    });
  },
  receiveErrors: function(errors) {
    Dispatcher.dispatch({
      actionType: UserConstants.RECEIVED_ERROR,
      errors: errors.responseJSON
    });
  },


  receivePictures: function(pictures) {
    Dispatcher.dispatch({
      actionType: pictureConstants.RECEIVED_PICTURES,
      pictures: pictures
    });
  },

  receiveSinglePicture: function(picture) {
    Dispatcher.dispatch({
      actionType: pictureConstants.RECEIVED_SINGLE_PICTURE,
      picture: picture
    });
  }
  // ,
  // receiveComment: function(comment) {
  //   Dispatcher.dispatch({
  //     actionType: pictureConstants.RECEIVED_PICTURES,
  //     pictures: pictures
  //   });
  // }
};

module.exports = ServerActions;
