var React = require('react');
var linkToProfile = require('../utils/helper').linkToProfile;

var PictureIndexItemHeader = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div className="header">
        {linkToProfile(this.props.owner)}
      </div>
    );
  }
});

module.exports = PictureIndexItemHeader;
