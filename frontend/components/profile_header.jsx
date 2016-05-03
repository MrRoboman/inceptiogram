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

          {imgTag('qdoiqtyte3olcbv4sutm', {circle: {width: 180, height: 180}})}
          <span className="profile-header-username">{this.props.profile.username}</span>
        </div>
        {button}
      </div>
    );
  }
});

module.exports = ProfileHeader;
