var React = require('react');
var ProfileStore = require('../stores/profile_store');
var PictureStore = require('../stores/picture_store');
var ProfileHeader = require('./profile_header');
var ClientActions = require('../actions/client_actions');
var CurrentUserMixin = require('../mixins/current_user_mixin');
var InceptionModal = require('./inception_modal');
var imgTag = require('../utils/helper').imgTag;

var Profile = React.createClass({
  mixins: [CurrentUserMixin],

  getInitialState: function() {
    return {profile: {}, modalOpen: false};
  },

  closeModal: function() {
    this.setState({modalOpen: false});
  },

  openModal: function(e) {
    ClientActions.fetchSinglePicture(e.currentTarget.id);
    this.setState({modalOpen: true, modalPicId: e.currentTarget.id});
  },

  componentDidMount: function() {
    this.listener = ProfileStore.addListener(this.onChange);
    ClientActions.fetchSingleProfile(this.props.params.id);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onChange: function() {
    console.log("howmanytimes");
    this.setState({profile: ProfileStore.getShowProfile()});
  },

  isCurrentUser: function() {
    return SessionStore.getCurrentUserId() == this.props.params.id;
  },

//Get pics at 640x640 and scale. Then just use the pic in the modal
  render: function() {

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

          <InceptionModal modalOpen={this.state.modalOpen} picId={this.state.modalPicId} closeModal={this.closeModal}/>

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
