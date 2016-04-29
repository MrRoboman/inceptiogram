var React = require('react');

var IndexItemHeader = React.createClass({

  render: function() {
    // var flwBtn = this.props.flwBtn ? <FollowButton/> : "";
    var flwBtn = "";
    return (
      <div>
        <span><a href="#">{this.props.username}</a></span>
        {flwBtn}
      </div>
    );
  }
});

module.exports = IndexItemHeader;
