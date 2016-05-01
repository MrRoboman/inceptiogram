var React = require('react');
var linkToProfile = require('../utils/helper').linkToProfile;
var FollowButton = require('./follow_button');

var IndexItemHeader = React.createClass({

  render: function() {
    // var flwBtn = this.props.flwBtn ? <FollowButton/> : "";
    var flwBtn = "";
    return (
      <div className="index-item-header">
        <div className="pic-and-name">
          <img src="http://astrologia.ge/wp-content/uploads/2015/12/rr.jpg"/>
          <span className="name">{linkToProfile(this.props.profile)}</span>
        </div>
        <FollowButton display={this.props.showFlwBtn}
                      profile={this.props.profile}/>
      </div>
    );
  }
});

module.exports = IndexItemHeader;
