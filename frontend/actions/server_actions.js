var Dispatcher = require('../dispatcher/dispatcher.js');
var UserConstants = require('../constants/user_constants.js');

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
  }
};

module.exports = ServerActions;
