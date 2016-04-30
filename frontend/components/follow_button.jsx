var React = require('react');

var FollowButton = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    var btn = "";
    var btnTxt = this.props.following ? "Unfollow" : "Follow";
    if(this.props.display){
      btn = <button>{btnTxt}</button>;
    }
    return (
      <div>
        {btn}
      </div>
    );
  }
});

module.exports = FollowButton;
