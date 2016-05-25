var React = require('react');
var PictureStore = require('../stores/picture_store');
var IndexItemHeader = require('./index_item_header');
var IndexItemFooter = require('./index_item_footer');
var imgTag = require('../utils/helper').imgTag;
var ClientActions = require('../actions/client_actions');

var PictureIndexItem = React.createClass({

  getInitialState: function() {
    return {picture: null};
  },

  componentDidMount: function() {
    this.pictureListener = PictureStore.addListener(this.onChange);
    ClientActions.fetchPictures();
  },

  componentWillUnmount: function() {
    this.pictureListener.remove();
  },

  onChange: function() {
    this.makeMosaic();
    this.setState({picture: PictureStore.getPictures()[0]});
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
    var iih, iif;
    if(this.state.picture){
      iih = <IndexItemHeader user={this.state.picture.owner} />;
      iif = <IndexItemFooter picture={this.state.picture} />;
    }else {
      iih = "";
      iif = "";
    }
    return (
      <div className="item">

        {iih}

        <div className="pic-index-pic">
          <canvas id="canvas"></canvas>
        </div>

        {iif}

      </div>
    );
  }
});

module.exports = PictureIndexItem;

// {imgTag(this.props.picture.public_id, {scale: {width: 640, height: 640}})}
