var React = require('react');
var ProfileStore = require('../stores/profile_store');
var ProfileHeader = require('./profile_header');
var ClientActions = require('../actions/client_actions');
var CurrentUserMixin = require('../mixins/current_user_mixin');
var InceptionModal = require('./Inception_modal');

var Profile = React.createClass({
  mixins: [CurrentUserMixin],

  getInitialState: function() {
    return {profile: {}, modalOpen: false};
  },

  closeModal: function() {
    this.setState({modalOpen: false});
  },

  openModal: function() {
    this.setState({modalOpen: true});
  },

  componentDidMount: function() {
    this.listener = ProfileStore.addListener(this.onChange);
    ClientActions.fetchSingleProfile(this.props.params.id);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onChange: function() {
    this.setState({profile: ProfileStore.getShowProfile()});
  },

  isCurrentUser: function() {
    return SessionStore.getCurrentUserId() == this.props.params.id;
  },

  componentWillReceiveProps: function() {
    ClientActions.fetchSingleProfile(this.props.params.id);
  },

  render: function() {
    this.isCurrentUser();
    var content = <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom center"></i>

    if(this.state.profile.pictures){
      var pics = this.state.profile.pictures.map(function(pic){
        return <div key={pic.id} className="overlay"><img className="profile-pics" src={pic.url}/></div>;
      });

      content = (
        <div className="profile">

          <button onClick={this.openModal}>Open</button>
          <InceptionModal modalOpen={this.state.modalOpen} closeModal={this.closeModal}/>

          <ProfileHeader profile={this.state.profile}
                         showFlwBtn={true}
                         isCurrentUser={this.isCurrentUser()}/>
          <div className="profile-pics">
            {pics}
          </div>
        </div>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
});

module.exports = Profile;
