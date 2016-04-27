//Picture Index
var UserStore = require('../stores/user_store');

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        Welcome to Inceptiogram {UserStore.getCurrentUser()}
      </div>
    );
  }
});
