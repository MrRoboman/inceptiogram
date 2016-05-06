var React = require('react');
var FollowButton = require('./follow_button');
var LogoutButton = require('./logout_button');
var imgTag = require('../utils/helper').imgTag;
var ClientActions = require('../actions/client_actions');

var ProfileHeader = React.createClass({

  openUploadWidget: function() {
  	cloudinary.openUploadWidget(
  		window.cloudinary_options,
  		function(error, images){
  			if(error === null){
  				ClientActions.uploadImages(images);
  			}
  	});
  },

  openProfileImageUpload: function() {
    cloudinary.openUploadWidget(
  		window.cloudinary_options,
  		function(error, images){
  			if(error === null){
  				ClientActions.uploadProfileImage(images[0]);
  			}
  	});
  },

  render: function() {
    var button = <FollowButton display={this.props.showFlwBtn}
                  profile={this.props.profile}/>;
    var profileUploadButton = "";
    var profilePicId = this.props.profile.picture_public_id || 'falcon_hmlgcs';
    var profilePic = "";
    if(this.props.profile.id) {
      profilePic = imgTag(profilePicId, {circle: {width: 180, height: 180}});
    }
    // debugger;
    if(this.props.isCurrentUser) {
      button = <i className="fa fa-camera-retro fa-5x" onClick={this.openUploadWidget}></i>;
      profileUploadButton = <i className="fa fa-camera-retro fa-5x profile-upload-button" onClick={this.openProfileImageUpload}></i>;
    }

    return (
      <div className="profile-header">
        <div className="profile-header-pic-username">

          {profilePic}
          <span className="profile-header-username">{this.props.profile.username}</span>
          {profileUploadButton}
        </div>
        <div className="profile-header-right">
          {button}
        </div>
      </div>
    );
  }
});

module.exports = ProfileHeader;
