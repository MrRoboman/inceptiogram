var React = require('react');
var FollowButton = require('./follow_button');
var LogoutButton = require('./logout_button');

var ProfileHeader = React.createClass({

  // componentDidReceiveProps: function() {
  //   console.log(this.props);
  // },

  render: function() {
    var button = <FollowButton display={this.props.showFlwBtn}
                  profile={this.props.profile}/>;
                console.log(this.props.isCurrentUser);

    if(this.props.isCurrentUser) {
      button = <LogoutButton/>;
    }
    return (
      <div className="profile-header">
        <div className="profile-header-pic-username">
          <img src="http://astrologia.ge/wp-content/uploads/2015/12/rr.jpg"/>
          <span className="profile-header-username">{this.props.profile.username}</span>
        </div>
        {button}
      </div>
    );
  }
});

module.exports = ProfileHeader;
