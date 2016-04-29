var React = require('react');

var FollowButton = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    var btn = "";
    if(this.props.display){
      btn = <button>Follow</button>;
    }
    return (
      <div>
        {btn}
      </div>
    );
  }
});

module.exports = FollowButton;
