var React = require('react');
var linkToProfile = require('../utils/helper').linkToProfile;
var imgTag = require('../utils/helper').imgTag;

var PictureIndexItemHeader = React.createClass({

  render: function() {

    var profilePicId = this.props.owner.picture_public_id || 'falcon_hmlgcs';
    var profilePic = "";
    if(this.props.owner.id) {
      profilePic = imgTag(profilePicId, {circle: {width: 60, height: 60}});
    }

    return (
      <div className="header">
        {profilePic}
        <span>{linkToProfile(this.props.owner)}</span>
      </div>
    );
  }
});

module.exports = PictureIndexItemHeader;
