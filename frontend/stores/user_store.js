var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');

var _currentUser = null;
var _authErrors = [];

var UserStore = new Store(dispatcher);

// UserStore.all = function() {
//   return Object.assign({}, _users);
// };

// for testing (remove for production)
window.UserStore = UserStore;

module.exports = UserStore;
