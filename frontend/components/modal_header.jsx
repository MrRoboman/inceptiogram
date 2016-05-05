var React = require('react');
var linkToProfile = require('../utils/helper').linkToProfile;
var imgTag = require('../utils/helper').imgTag;
var FollowButton = require('./follow_button');

var ModalHeader = React.createClass({

  render: function() {
    // var flwBtn = this.props.flwBtn ? <FollowButton/> : "";
    var flwBtn = "";
    return (
      <div className="modal-header">
        <div className="pic-and-name">
          {imgTag('falcon_hmlgcs', {circle: {width: 60, height: 60}})}
          <span className="name">{linkToProfile(this.props.profile)}</span>
        </div>
      </div>
    );
  }
});

module.exports = ModalHeader;
