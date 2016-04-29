var React = require('react');

var PictureIndexItemHeader = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div className="header">
        <span><a href="#">{this.props.username}</a></span>
      </div>
    );
  }
});

module.exports = PictureIndexItemHeader;
