var ApiUtil = require('../utils/api_utils.js');

var ClientActions = {
  fetchCurrentUser: ApiUtil.fetchCurrentUser,
  login: ApiUtil.login,
  logout: ApiUtil.logout,
  createUser: ApiUtil.createUser,

  fetchPictures: ApiUtil.fetchPictures,

  createComment: ApiUtil.createComment,
  createLike: ApiUtil.createLike,

  fetchProfiles: ApiUtil.fetchProfiles
};

window.CA = ClientActions;
module.exports = ClientActions;
