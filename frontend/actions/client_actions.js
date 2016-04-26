var ApiUtil = require('../utils/api_utils.js');

var ClientActions = {
  fetchCurrentUser: ApiUtil.fetchCurrentUser,
  login: ApiUtil.login,
  logout: ApiUtil.logout,
  createUser: ApiUtil.createUser
};

window.CA = ClientActions;
module.exports = ClientActions;
