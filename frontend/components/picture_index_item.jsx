var React = require('react');
var pictureStore = require('../stores/picture_store');
var PictureIndexItemHeader = require('./picture_index_item_header');
var PictureIndexItemFooter = require('./picture_index_item_footer');
var imgTag = require('../utils/helper').imgTag;

var PictureIndexItem = React.createClass({

  render: function() {
    return (
      <div className="item">
        <PictureIndexItemHeader owner={this.props.picture.owner} />
        <div className="pic-index-pic">{imgTag(this.props.picture.public_id, {scale: {width: 640, height: 640}})}</div>
        <PictureIndexItemFooter picture={this.props.picture} />
      </div>
    );
  }
});

module.exports = PictureIndexItem;
