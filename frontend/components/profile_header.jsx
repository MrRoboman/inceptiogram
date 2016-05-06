var React = require('react');
var FollowButton = require('./follow_button');
var LogoutButton = require('./logout_button');
var imgTag = require('../utils/helper').imgTag;

var ProfileHeader = React.createClass({

  render: function() {
    var button = <FollowButton display={this.props.showFlwBtn}
                  profile={this.props.profile}/>;

    if(this.props.isCurrentUser) {
      button = <LogoutButton/>;
    }
    return (
      <div className="profile-header">
        <div className="profile-header-pic-username">

          {imgTag('falcon_hmlgcs', {circle: {width: 180, height: 180}})}
          <span className="profile-header-username">{this.props.profile.username}</span>
        </div>
        <div className="profile-header-right">
          <i className="fa fa-cloud-upload fa-5x"></i>
          {button}
        </div>
      </div>
    );
  }
});

module.exports = ProfileHeader;
