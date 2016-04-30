var ApiUtil = require('../utils/api_utils.js');

var ClientActions = {
  fetchCurrentUser: ApiUtil.fetchCurrentUser,
  login: ApiUtil.login,
  logout: ApiUtil.logout,
  createUser: ApiUtil.createUser,

  fetchPictures: ApiUtil.fetchPictures,

  createComment: ApiUtil.createComment,
  createLike: ApiUtil.createLike,
  createFollow: ApiUtil.createFollow,

  fetchProfiles: ApiUtil.fetchProfiles,
  fetchSingleProfile: ApiUtil.fetchSingleProfile
};

window.CA = ClientActions;
module.exports = ClientActions;
