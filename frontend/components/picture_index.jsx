//Picture Index
var ClientActions = require('../actions/client_actions');
var SessionStore = require('../stores/session_store');
var HashHistory = require('react-router').hashHistory;
var PictureIndexItem = require('./picture_index_item');
var pictureStore = require('../stores/picture_store');

var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {pictures: pictureStore.getPictures()};
  },

  componentDidMount: function() {
    this.listener = SessionStore.addListener(this.onChange);
    ClientActions.fetchCurrentUser();
    ClientActions.fetchPictures();
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  onChange: function() {
    if(SessionStore.getCurrentUser() === ""){
      HashHistory.push("login");
    } else{
      //fetch pictures of this users followees
      this.setState({pictures: pictureStore.getPictures()});
    }
  },

  render: function() {
    var pictureIndexItems = this.state.pictures.map(function(pic){
      return <PictureIndexItem key={pic.id} picture={pic} />;
    });
    return (
      <div>
        {pictureIndexItems}
      </div>
    );
  }
});
