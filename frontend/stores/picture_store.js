var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var PictureConstants = require('../constants/picture_constants');

var _pictures = [];
var _singlePicture = {};

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

PictureStore.getPicture = function(id){
  for(var i = 0; i < _pictures.length; i++){
    if(id === _pictures[i].id){
      return _pictures[i];
    }
  }
  return null;
};

PictureStore.getPictures = function() {
  return _pictures.slice();
};

PictureStore.getSinglePicture = function() {
  return _singlePicture;
};

PictureStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PictureConstants.RECEIVED_PICTURES:
      _pictures = payload.pictures;
      this.__emitChange();
      break;
    case PictureConstants.RECEIVED_SINGLE_PICTURE:
      insertPicture(payload.picture);
      _singlePicture = payload.picture;
      this.__emitChange();
      break;
    case PictureConstants.CLEAR_SINGLE_PICTURE:
      _singlePicture = {};
      break;
  }

};

// for testing (remove for production)
window.PictureStore = PictureStore;

module.exports = PictureStore;
