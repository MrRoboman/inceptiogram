var React = require('react');
var Link = require('react-router').Link;
var FollowButton = require('./follow_button');

var IndexItemHeader = React.createClass({

  render: function() {
    // var flwBtn = this.props.flwBtn ? <FollowButton/> : "";
    var flwBtn = "";
    return (
      <div>
        <Link to={"profile/"+this.props.profile.id}>{this.props.profile.username}</Link>
        <FollowButton display={this.props.showFlwBtn}
                      profile={this.props.profile}/>
      </div>
    );
  }
});

module.exports = IndexItemHeader;
