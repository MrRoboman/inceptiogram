var ApiUtil = require('../utils/api_utils.js');
var SessionStore = require('../stores/session_store');
var Dispatcher = require('../dispatcher/dispatcher');
var ProfileConstants = require('../constants/profile_constants');
var PictureConstants = require('../constants/picture_constants');

var ClientActions = {
  fetchCurrentUser: ApiUtil.fetchCurrentUser,
  login: ApiUtil.login,
  logout: ApiUtil.logout,
  createUser: ApiUtil.createUser,

  fetchPictures: ApiUtil.fetchPictures,
  fetchSinglePicture: function(id) {
    ApiUtil.fetchSinglePicture(id);
    // Dispatcher.dispatch({
    //   actionType: PictureConstants.CLEAR_SINGLE_PICTURE
    // });
  },

  createComment: ApiUtil.createComment,
  createLike: ApiUtil.createLike,
  createFollow: ApiUtil.createFollow,

  fetchProfiles: ApiUtil.fetchProfiles,
  fetchSingleProfile: ApiUtil.fetchSingleProfile,

  uploadImages: ApiUtil.uploadImages,
  uploadProfileImage: ApiUtil.uploadProfileImage
};

window.CA = ClientActions;
module.exports = ClientActions;
