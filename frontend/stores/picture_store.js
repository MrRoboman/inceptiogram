var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var PictureConstants = require('../constants/picture_constants');

var _pictures = [];

var PictureStore = new Store(dispatcher);

PictureStore.getPictures = function() {
  return _pictures.slice();
};

PictureStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PictureConstants.RECEIVED_PICTURES:
      _pictures = payload.pictures;
      break;
  }
};

// for testing (remove for production)
window.PictureStore = PictureStore;

module.exports = PictureStore;
