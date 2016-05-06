//Picture Index
var CurrentUserMixin = require('../mixins/current_user_mixin');
var ClientActions = require('../actions/client_actions');
var SessionStore = require('../stores/session_store');
var HashHistory = require('react-router').hashHistory;
var PictureIndexItem = require('./picture_index_item');
var PictureStore = require('../stores/picture_store');

var React = require('react');

module.exports = React.createClass({

  mixins: [CurrentUserMixin],

  getInitialState: function() {
    return {pictures: [], fetchReceived: false};
  },

  componentDidMount: function() {
    // this.sessionListener = SessionStore.addListener(this.onChange);
    this.pictureListener = PictureStore.addListener(this.onChange);
    // ClientActions.fetchCurrentUser();
    ClientActions.fetchPictures();
    // debugger;
  },

  componentWillUnmount: function() {
    // this.sessionListener.remove();
    this.pictureListener.remove();
  },

  onChange: function() {
    // if(SessionStore.getCurrentUser() === ""){
    //   HashHistory.push("login");
    // } else{
      this.setState({pictures: PictureStore.getPictures(), fetchReceived: true});
      // debugger;
    // }
  },

  render: function() {
    // debugger;
    var pictureIndexItems = <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom center"></i>;
    if(this.state.fetchReceived){
      pictureIndexItems = <div className="not-following">{"You are not following anyone"}</div>;
      if(this.state.pictures.length > 0){
        pictureIndexItems = this.state.pictures.map(function(pic){
          return <PictureIndexItem key={pic.id} picture={pic} />;
        });
      }
    }
    return (
      <div>
        {pictureIndexItems}
      </div>
    );
  }
});
