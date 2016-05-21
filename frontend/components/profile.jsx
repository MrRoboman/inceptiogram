var React = require('react');
var ClientActions = require('../actions/client_actions');
var SessionStore = require('../stores/session_store');
var ProfileStore = require('../stores/profile_store');
var ProfileHeader = require('./profile_header');
var PictureModal = require('./picture_modal');
var CurrentUserMixin = require('../mixins/current_user_mixin');
var imgTag = require('../utils/helper').imgTag;

var Profile = React.createClass({
  mixins: [CurrentUserMixin],

  getInitialState: function() {
    return {profile: {}, modalOpen: false};
  },

  componentDidMount: function() {
    this.profileListener = ProfileStore.addListener(this.onChange);
    ClientActions.fetchSingleProfile(this.props.params.id);
  },

  componentWillUnmount: function() {
    this.profileListener.remove();
  },

  onChange: function() { 
    this.setState({profile: ProfileStore.getSingleProfile()});
  },

  closeModal: function() {
    this.setState({modalOpen: false});
  },

  openModal: function(e) {
    this.setState({modalOpen: true, modalPicId: e.currentTarget.id});
  },

  isCurrentUser: function() {
    return SessionStore.isCurrentUser(this.props.params.id);
  },

  render: function() {
    // debugger;

    var content = <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom center"></i>;

    var pics = "";

    if(this.state.profile.pictures && this.state.profile.pictures.length > 0){
      pics = this.state.profile.pictures.map(function(pic){
        return (
          <div key={pic.id} id={pic.id} className="overlay profile-pics" onClick={this.openModal}>
            {imgTag(pic.public_id, {scale: {width: 300, height: 300}})}
          </div>
        );
      }.bind(this));
    }

      content = (
        <div className="profile">

          <PictureModal modalOpen={this.state.modalOpen} picId={this.state.modalPicId} closeModal={this.closeModal}/>

          <ProfileHeader profile={this.state.profile}
                         showFlwBtn={true}
                         isCurrentUser={this.isCurrentUser()}/>

          <div className="profile-pics">
            {pics}
          </div>

        </div>
      );

    return (
      <div>
        {content}
      </div>
    );
  }
});

module.exports = Profile;
