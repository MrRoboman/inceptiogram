var React = require('react');

var PictureIndexItemHeader = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div>
        <span>{this.props.username}</span>
      </div>
    );
  }
});

module.exports = PictureIndexItemHeader;
