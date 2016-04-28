var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var PictureConstants = require('../constants/picture_constants');

var _pictures = [];

var PictureStore = new Store(dispatcher);

var insertPicture = function(picture) {
  for(var i = 0; i < _pictures.length; i++){
    if(picture.id === _pictures[i].id){
      _pictures[i] = picture;
      return;
    }
  }
  _pictures.push(picture);
};

PictureStore.getPictures = function() {
  return _pictures.slice();
};

PictureStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PictureConstants.RECEIVED_PICTURES:
      _pictures = payload.pictures;
      break;
    case PictureConstants.RECEIVED_SINGLE_PICTURE:
      insertPicture(payload.picture);
      break;
  }
  this.__emitChange();
};

// for testing (remove for production)
window.PictureStore = PictureStore;

module.exports = PictureStore;
