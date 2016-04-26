var ServerActions = require('../actions/server_actions.js');

module.exports = {
  fetchCurrentUser: function() {
    $.ajax({
      type: 'GET',
      url: 'api/user',
      dataType: 'json',
      success: ServerActions.receiveCurrentUser
    });
  },
  login: function() {

  },
  logout: function() {

  },
  createUser: function() {

  }

};
