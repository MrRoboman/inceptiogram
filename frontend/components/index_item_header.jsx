var React = require('react');
var FollowButton = require('./follow_button');
var linkToProfile = require('../utils/helper').linkToProfile;
var imgTag = require('../utils/helper').imgTag;

var IndexItemHeader = React.createClass({

  render: function() {
    var flwBtn = "";

    var profilePicId = this.props.user.picture_public_id || 'falcon_hmlgcs';
    var profilePic = "";
    if(this.props.user.id) {
      profilePic = imgTag(profilePicId, {circle: {width: 60, height: 60}});
    }

    return (
      <div className="index-item-header">

        <div className="pic-and-name">
          {profilePic}
          <span className="name">{linkToProfile(this.props.user)}</span>
        </div>

        <FollowButton display={this.props.showFlwBtn}
                      profile={this.props.user}/>
      </div>
    );
  }
});

module.exports = IndexItemHeader;
