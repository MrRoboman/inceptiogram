var React = require('react');
var linkToProfile = require('../utils/helper').linkToProfile;
var imgTag = require('../utils/helper').imgTag;

var PictureIndexItemHeader = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div className="header">
        {imgTag('falcon_hmlgcs', {circle: {width: 60, height: 60}})}
        <span>{linkToProfile(this.props.owner)}</span>
      </div>
    );
  }
});

module.exports = PictureIndexItemHeader;
