var React = require('react');
var Link = require('react-router').Link;

var PictureIndexItemHeader = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div className="header">
        <Link to={"profile/"+this.props.owner.id}>{this.props.owner.username}</Link>
      </div>
    );
  }
});

module.exports = PictureIndexItemHeader;
