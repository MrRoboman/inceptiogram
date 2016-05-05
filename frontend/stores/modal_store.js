var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');

var _modals = {};

var ModalStore = new Store(dispatcher);

ModalStore.all = function() {
  return Object.assign({}, _modals);
};

// for testing (remove for production)
window.ModalStore = ModalStore;

module.exports = ModalStore;

