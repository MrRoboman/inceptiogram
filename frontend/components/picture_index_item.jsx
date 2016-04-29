var React = require('react');
var pictureStore = require('../stores/picture_store');
var PictureIndexItemHeader = require('./picture_index_item_header');
var PictureIndexItemFooter = require('./picture_index_item_footer');

var PictureIndexItem = React.createClass({

  render: function() {
    return (
      <div className="item">
        <PictureIndexItemHeader username={this.props.picture.owner} />
        <img src={this.props.picture.url}/>
        <PictureIndexItemFooter picture={this.props.picture} />
      </div>
    );
  }
});

module.exports = PictureIndexItem;
