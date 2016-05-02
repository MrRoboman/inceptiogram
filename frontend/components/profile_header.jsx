var React = require('react');
var FollowButton = require('./follow_button');

var ProfileHeader = React.createClass({

  render: function() {
    // var flwBtn = this.props.flwBtn ? <FollowButton/> : "";
    var flwBtn = "";
    return (
      <div className="profile-header">
        <span>{this.props.profile.username}</span>
        <FollowButton display={this.props.showFlwBtn}
                      profile={this.props.profile}/>
      </div>
    );
  }
});

module.exports = ProfileHeader;
