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

  render: function() {
    var button = <FollowButton display={this.props.showFlwBtn}
                  profile={this.props.profile}/>;

    if(this.props.isCurrentUser) {
      button = <i className="fa fa-camera-retro fa-5x" onClick={this.openUploadWidget}></i>;
    }
    return (
      <div className="profile-header">
        <div className="profile-header-pic-username">

          {imgTag('falcon_hmlgcs', {circle: {width: 180, height: 180}})}
          <span className="profile-header-username">{this.props.profile.username}</span>
        </div>
        <div className="profile-header-right">
          {button}
        </div>
      </div>
    );
  }
});

module.exports = ProfileHeader;
