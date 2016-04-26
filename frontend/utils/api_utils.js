var ServerActions = require('../actions/server_actions.js');

module.exports = {
  fetchCurrentUser: function() {
    $.ajax({
      type: 'GET',
      url: 'api/user',
      dataType: 'json',
      success: ServerActions.receiveCurrentUser,
    });
  },
  login: function(creds) {
    $.ajax({
      type: 'POST',
      url: 'api/session',
      dataType: 'json',
      data: {user: {username: creds.username, password: creds.password}},
      success: ServerActions.receiveCurrentUser
    });
  },
  logout: function() {
    $.ajax({
      type: 'DELETE',
      url: 'api/session',
      dataType: 'json',
      success: ServerActions.receiveCurrentUser
    });
  },
  createUser: function(creds) {
    $.ajax({
      type: 'POST',
      url: 'api/user',
      dataType: 'json',
      data: {user: {username: creds.username, password: creds.password}},
      success: ServerActions.receiveCurrentUser
    });
  }

};
