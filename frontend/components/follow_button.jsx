var React = require('react');
var ClientActions = require('../actions/client_actions');

var FollowButton = React.createClass({
  getInitialState: function() {
    return {};
  },

  createFollow: function() {
    ClientActions.createFollow(this.props.profile.id);
  },

  render: function() {
    var btn = "";
    var btnTxt = this.props.profile.following ? "FOLLOWING" : "FOLLOW";
    var className = "follow-button";
    className += this.props.profile.following ? " following" : " follow";
    if(this.props.display){
      btn = <button className={className} onClick={this.createFollow}>{btnTxt}</button>;
    }
    return (
      <div>
        {btn}
      </div>
    );
  }
});

module.exports = FollowButton;
