var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');

var _pictures = {};

var PictureStore = new Store(dispatcher);

PictureStore.all = function() {
  return Object.assign({}, _pictures);
};

// for testing (remove for production)
window.PictureStore = PictureStore;

module.exports = PictureStore;

