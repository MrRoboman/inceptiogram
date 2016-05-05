var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var PictureConstants = require('../constants/picture_constants');

var _pictures = [];
var _pictureHash = {};

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

PictureStore.getRandomPicture = function() {
  var keys = Object.keys(_pictureHash);
  var r = Math.floor(Math.random() * keys.length);
  _pictures;
  return _pictureHash[keys[r]];
};

PictureStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PictureConstants.RECEIVED_PICTURES:
      _pictures = payload.pictures;
      _pictures.forEach(function(pic){
        _pictureHash[pic.id] = pic;
      });
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
