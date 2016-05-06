var React = require('react');
var linkToProfile = require('../utils/helper').linkToProfile;
var imgTag = require('../utils/helper').imgTag;
var FollowButton = require('./follow_button');

var IndexItemHeader = React.createClass({

  render: function() {
    // var flwBtn = this.props.flwBtn ? <FollowButton/> : "";
    var flwBtn = "";
// debugger;
    var profilePicId = this.props.profile.picture_public_id || 'falcon_hmlgcs';
    var profilePic = "";
    if(this.props.profile.id) {
      profilePic = imgTag(profilePicId, {circle: {width: 60, height: 60}});
    }

    return (
      <div className="index-item-header">
        <div className="pic-and-name">
          {profilePic}
          <span className="name">{linkToProfile(this.props.profile)}</span>
        </div>
        <FollowButton display={this.props.showFlwBtn}
                      profile={this.props.profile}/>
      </div>
    );
  }
});

module.exports = IndexItemHeader;
