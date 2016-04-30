var React = require('react');
var Link = require('react-router').Link;

var Helper = {
  linkToProfile: function(user) {
    return <Link to={"profile/"+user.id}>{user.username}</Link>;
  }
};

module.exports = Helper;
