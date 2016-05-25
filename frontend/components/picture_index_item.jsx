var React = require('react');
var PictureStore = require('../stores/picture_store');
var IndexItemHeader = require('./index_item_header');
var IndexItemFooter = require('./index_item_footer');
var imgTag = require('../utils/helper').imgTag;
var ClientActions = require('../actions/client_actions');

var PictureIndexItem = React.createClass({

  getInitialState: function() {
    return {pictureId: null, loading: true};
  },

  componentDidMount: function() {
    this.pictureListener = PictureStore.addListener(this.onChange);
    ClientActions.fetchPictures();
  },

  componentWillUnmount: function() {
    this.pictureListener.remove();
    this.mosaic.dismount();
  },

  onChange: function() {
    this.makeMosaic();
    if(this.state.pictureId){
      this.setState({pictureId: this.state.pictureId});
    }else {
      this.setState({pictureId: PictureStore.getPictures()[0].id});
    }

  },

  makeMosaic: function() {
    var imageUrls = PictureStore.getPictures().map(function(imgDeets){
      return {id: imgDeets.id, url: imgDeets.url};
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
                  zoomMs: 2000,
                  callback: this.changePicture
                });
    }
  },

  changePicture: function(id) {
    this.setState({pictureId: id, loading: false});
    this.mosaic.start();
  },



  render: function() {
    var loading = this.state.loading ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom center"></i> : "";
    var picture = PictureStore.getPicture(this.state.pictureId);
    var iih, iif;
    if(picture){
      iih = <IndexItemHeader user={picture.owner} />;
      iif = <IndexItemFooter picture={picture} />;
    }else {
      iih = "";
      iif = "";
    }
    return (
      <div className="item">

        {iih}

        <div className="pic-index-pic">
          {loading}
          <canvas id="canvas"></canvas>
        </div>

        {iif}

      </div>
    );
  }
});

module.exports = PictureIndexItem;

// {imgTag(this.props.picture.public_id, {scale: {width: 640, height: 640}})}
