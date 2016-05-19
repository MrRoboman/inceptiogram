var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var PictureConstants = require('../constants/picture_constants');

var _pictures = {};

var PictureStore = new Store(dispatcher);

PictureStore.getPictures = function() {
  var picArray = [];
  var keys = Object.keys(_pictures);
  keys.forEach(function(key){
    picArray.push(_pictures[key]);
  });
  return picArray;
};

PictureStore.getPicture = function(id){
  return _pictures[id];
};


PictureStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PictureConstants.RECEIVED_PICTURES:
      _pictures = payload.pictures;
      this.__emitChange();
      break;
    case PictureConstants.RECEIVED_SINGLE_PICTURE:
      _pictures[payload.picture.id] = payload.picture;
      this.__emitChange();
      break;
  }

};

// for testing (remove for production)
window.PictureStore = PictureStore;

module.exports = PictureStore;
