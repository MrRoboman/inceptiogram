var React = require('react');
var ProfileStore = require('../stores/profile_store');
var ClientActions = require('../actions/client_actions');
var ProfileIndexItem = require('./profile_index_item');

var ProfileIndex = React.createClass({
  getInitialState: function() {
    return {profiles: ProfileStore.all()};
  },

  componentDidMount: function() {
    this.listener = ProfileStore.addListener(this.onChange);
    ClientActions.fetchProfiles();
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onChange: function() {
    this.setState({profiles: ProfileStore.all()});
  },

  render: function() {
    var profileIndexItems = this.state.profiles.map(function(profile){
      return  <ProfileIndexItem key={profile.id} profile={profile}/>;
    });

    return (
      <div>
        <ul>
        {profileIndexItems}
        </ul>
      </div>
    );
  }
});

module.exports = ProfileIndex;
