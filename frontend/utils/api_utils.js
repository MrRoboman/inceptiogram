var ServerActions = require('../actions/server_actions.js');

module.exports = {
  fetchCurrentUser: function() {
    $.ajax({
      type: 'GET',
      url: 'api/user',
      dataType: 'json',
      success: ServerActions.receiveCurrentUser,
    });
  },
  login: function(creds) {
    $.ajax({
      type: 'POST',
      url: 'api/session',
      dataType: 'json',
      data: {user: {username: creds.username, password: creds.password}},
      success: ServerActions.receiveCurrentUser,
      error: ServerActions.receiveErrors
    });
  },
  logout: function() {
    $.ajax({
      type: 'DELETE',
      url: 'api/session',
      dataType: 'json',
      success: ServerActions.receiveCurrentUser
    });
  },
  createUser: function(creds) {
    $.ajax({
      type: 'POST',
      url: 'api/user',
      dataType: 'json',
      data: {user: {username: creds.username, password: creds.password}},
      success: ServerActions.receiveCurrentUser,
      error: ServerActions.receiveErrors
    });
  },


  fetchPictures: function() {
    $.ajax({
      type: 'GET',
      url: 'api/pictures',
      dataType: 'json',
      success: ServerActions.receivePictures
    });
  },

  fetchSinglePicture: function(id) {
    $.ajax({
      type: 'GET',
      url: 'api/pictures/' + id,
      dataType: 'json',
      success: ServerActions.receiveSinglePicture
    });
  },

  createComment: function(data) {
    $.ajax({
      type: 'POST',
      url: 'api/comments',
      dataType: 'json',
      data: {comment: {picture_id: data.pictureId, body: data.body}},
      success: ServerActions.receiveSinglePicture
    });
  },

  createLike: function(data) {
    $.ajax({
      type: 'POST',
      url: 'api/likes',
      dataType: 'json',
      data: {like: {picture_id: data}},
      success: ServerActions.receiveSinglePicture
    });
  },

  createFollow: function(data) {
    $.ajax({
      type: 'POST',
      url: 'api/follows',
      dataType: 'json',
      data: {follow: {user_id: data}},
      success: ServerActions.receiveSingleProfile
    });
  },

  fetchProfiles: function(profiles) {
    $.ajax({
      type: 'GET',
      url: 'api/profiles',
      dataType: 'json',
      success: ServerActions.receiveProfiles
    });
  },

  fetchSingleProfile: function(id) {
    // debugger;
    $.ajax({
      type: 'GET',
      url: 'api/profiles/' + id,
      dataType: 'json',
      success: ServerActions.receiveSingleProfile
    });
  },

  uploadImages: function(images) {
    var params = {picture: {}};
    images.forEach(function(img, idx) {
      params.picture[idx.toString()] = {url: img.url, public_id: img.public_id};
    });
    $.ajax ({
      type: 'POST',
      url: 'api/pictures',
      dataType: 'json',
      data: params,
      success: function(profile) {
        ServerActions.receiveSingleProfile(profile);
      },
      error: function(error) {
        console.log(error);
      }
    });
  },

  uploadProfileImage: function(image) {
    var params = {picture: {url: image.url, public_id: image.public_id}};
    $.ajax ({
      type: 'PATCH',
      url: 'api/profiles/0',
      dataType: 'json',
      data: params,
      success: function(profile) {
        ServerActions.receiveSingleProfile(profile);
      },
      error: function(error) {
        console.log(error);
      }
    });
  }

};
