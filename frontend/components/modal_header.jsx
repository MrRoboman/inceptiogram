var React = require('react');
var linkToProfile = require('../utils/helper').linkToProfile;
var imgTag = require('../utils/helper').imgTag;
var FollowButton = require('./follow_button');
var hashHistory = require('react-router').hashHistory;

var ModalHeader = React.createClass({

  clickUsernameInModal: function() {
    console.log(this.props.profile);
    hashHistory.push('profile/' + this.props.profile.id);
    this.props.closeModal();
  },

  render: function() {
    // var flwBtn = this.props.flwBtn ? <FollowButton/> : "";
    var flwBtn = "";
    return (
      <div className="modal-header">
        <div className="pic-and-name">
          {imgTag('falcon_hmlgcs', {circle: {width: 60, height: 60}})}
          <span className="name"><a className="link" onClick={this.clickUsernameInModal}>{this.props.profile.username}</a></span>
        </div>
      </div>
    );
  }
});

module.exports = ModalHeader;
