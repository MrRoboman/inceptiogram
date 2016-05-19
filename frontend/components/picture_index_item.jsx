var React = require('react');
var IndexItemHeader = require('./index_item_header');
var IndexItemFooter = require('./index_item_footer');
var imgTag = require('../utils/helper').imgTag;

var PictureIndexItem = React.createClass({

  render: function() {
    return (
      <div className="item">

        <IndexItemHeader user={this.props.picture.owner} />

        <div className="pic-index-pic">
          {imgTag(this.props.picture.public_id, {scale: {width: 640, height: 640}})}
        </div>

        <IndexItemFooter picture={this.props.picture} />

      </div>
    );
  }
});

module.exports = PictureIndexItem;
