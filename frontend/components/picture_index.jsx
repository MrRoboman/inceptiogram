var React = require('react');
var ClientActions = require('../actions/client_actions');
var PictureStore = require('../stores/picture_store');
var CurrentUserMixin = require('../mixins/current_user_mixin');
var PictureIndexItem = require('./picture_index_item');

module.exports = React.createClass({

  mixins: [CurrentUserMixin],

  getInitialState: function() {
    return {pictures: [], fetchReceived: false};
  },

  // componentDidMount: function() {
  //   this.pictureListener = PictureStore.addListener(this.onChange);
  //   ClientActions.fetchPictures();
  // },
  //
  // componentWillUnmount: function() {
  //   this.pictureListener.remove();
  // },
  //
  // onChange: function() {
  //   this.setState({pictures: PictureStore.getPictures(), fetchReceived: true});
  // },

  render: function() {
    var pictureIndexItems = <PictureIndexItem picture={[]}/>;
    // var pictureIndexItems = <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom center"></i>;
    // if(this.state.fetchReceived){
    //   pictureIndexItems = <div className="missing-content-message">{"You are not following anyone"}</div>;
    //   if(this.state.pictures.length > 0){
    //     pictureIndexItems = <PictureIndexItem pictures={this.state.pictures} />;
        // pictureIndexItems = this.state.pictures.map(function(pic){
        //   return <PictureIndexItem key={pic.id} picture={pic} />;
        // });
      // }
    // }
    return (
      <div>
        {pictureIndexItems}
      </div>
    );
  }
});
