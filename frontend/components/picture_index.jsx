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

  render: function() {
    var pictureIndexItems = <PictureIndexItem picture={[]}/>;
    return (
      <div>
        {pictureIndexItems}
      </div>
    );
  }
});
