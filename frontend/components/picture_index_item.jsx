var React = require('react');
var pictureStore = require('../stores/picture_store');
var PictureIndexItemHeader = require('./picture_index_item_header');
var PictureIndexItemFooter = require('./picture_index_item_footer');

var PictureIndexItem = React.createClass({

  render: function() {
    return (
      <div>
        <PictureIndexItemHeader username={this.props.picture.owner} />
        <img src={this.props.picture.url}/>
        <PictureIndexItemFooter comments={this.props.picture.comments} />
      </div>
    );
  }
});

module.exports = PictureIndexItem;
