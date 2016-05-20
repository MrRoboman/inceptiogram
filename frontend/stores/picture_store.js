var Store = require('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var PictureConstants = require('../constants/picture_constants');

var _pictures = {};

var PictureStore = new Store(dispatcher);

PictureStore.getPictures = function() {
  return objectToArray(_pictures);
};

PictureStore.getPicture = function(id){
  return _pictures[id];
};


PictureStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PictureConstants.RECEIVED_PICTURES:
      _pictures = arrayToObject(payload.pictures);
      this.__emitChange();
      break;
    case PictureConstants.RECEIVED_SINGLE_PICTURE:
      _pictures[payload.picture.id] = payload.picture;
      this.__emitChange();
      break;
  }

};

var arrayToObject = function(arr){
  var obj = {};
  arr.forEach(function(item){
    obj[item.id] = item;
  });
  return obj;
};

var objectToArray = function(obj){
  var arr = [];
  var keys = Object.keys(obj);
  keys.forEach(function(key){
    arr.push(obj[key]);
  });
  return arr;
};

// for testing (remove for production)
window.PictureStore = PictureStore;

module.exports = PictureStore;
