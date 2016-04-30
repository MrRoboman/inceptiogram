var React = require('react');

var Profile = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div>
        I'm a profile! {this.props.params.id}
      </div>
    );
  }
});

module.exports = Profile;
