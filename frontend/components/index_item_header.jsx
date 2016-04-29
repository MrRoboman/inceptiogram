var React = require('react');
var FollowButton = require('./follow_button');

var IndexItemHeader = React.createClass({

  render: function() {
    // var flwBtn = this.props.flwBtn ? <FollowButton/> : "";
    var flwBtn = "";
    return (
      <div>
        <span><a href="#">{this.props.profile.username}</a></span>
        <FollowButton display={this.props.showFlwBtn} />
      </div>
    );
  }
});

module.exports = IndexItemHeader;
