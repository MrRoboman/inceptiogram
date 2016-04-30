var React = require('react');
var linkToProfile = require('../utils/helper').linkToProfile;
var FollowButton = require('./follow_button');

var IndexItemHeader = React.createClass({

  render: function() {
    // var flwBtn = this.props.flwBtn ? <FollowButton/> : "";
    var flwBtn = "";
    return (
      <div>
        {linkToProfile(this.props.profile)}
        <FollowButton display={this.props.showFlwBtn}
                      profile={this.props.profile}/>
      </div>
    );
  }
});

module.exports = IndexItemHeader;
