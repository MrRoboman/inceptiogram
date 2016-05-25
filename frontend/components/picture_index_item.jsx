var React = require('react');
var IndexItemHeader = require('./index_item_header');
var IndexItemFooter = require('./index_item_footer');
var imgTag = require('../utils/helper').imgTag;
var PictureStore = require('../stores/picture_store');

var PictureIndexItem = React.createClass({

  componentDidMount: function() {
    this.makeMosaic();
  },

  makeMosaic: function() {

    var imageUrls = PictureStore.getPictures().map(function(imgDeets){
      return imgDeets.url;
    });

    if(this.mosaic) {
      this.mosaic.imageUrls = imageUrls;
    }
    else {
    this.mosaic = new Mosaic({canvasId: "canvas",
                  imageUrls: imageUrls,
                  width: 640,
                  height: 640,
                  rows: 20,
                  cols: 20,
                  zoomMs: 2000
                });
    }
  },


  render: function() {
    return (
      <div className="item">

        <IndexItemHeader user={this.props.picture.owner} />

        <div className="pic-index-pic">
          <canvas id="canvas"></canvas>
        </div>

        <IndexItemFooter picture={this.props.picture} />

      </div>
    );
  }
});

module.exports = PictureIndexItem;

// {imgTag(this.props.picture.public_id, {scale: {width: 640, height: 640}})}
