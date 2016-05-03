var React = require('react');
var ProfileStore = require('../stores/profile_store');
var ClientActions = require('../actions/client_actions');
var ProfileIndexItem = require('./profile_index_item');
var CurrentUserMixin = require('../mixins/current_user_mixin');

var ProfileIndex = React.createClass({
  mixins: [CurrentUserMixin],

  getInitialState: function() {
    return {profiles: []};
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
      <div className="profile-index">
        {profileIndexItems}
      </div>
    );
  }
});

module.exports = ProfileIndex;
