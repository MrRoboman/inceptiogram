var React = require('react');
var SessionStore = require('../stores/session_store');
var PictureStore = require('../stores/picture_store');
var IndexItemHeader = require('./index_item_header');
var IndexItemFooter = require('./index_item_footer');
var imgTag = require('../utils/helper').imgTag;
var ClientActions = require('../actions/client_actions');

var PictureIndexItem = React.createClass({

  getInitialState: function() {
    return {pictureId: null, loading: false};
  },

  componentDidMount: function() {
    this.sessionListener = SessionStore.addListener(this.onChange);
    this.pictureListener = PictureStore.addListener(this.onChange);
    ClientActions.fetchPictures();
  },

  componentWillUnmount: function() {
    this.sessionListener.remove();
    this.pictureListener.remove();
    if(this.mosaic) this.mosaic.dismount();
  },

  onChange: function() {
    if(SessionStore.loggedIn() && PictureStore.getPictures().length > 0){
      this.makeMosaic();
      if(this.state.pictureId){
        // this.setState({pictureId: this.state.pictureId});
      }else {
        if(PictureStore.getPictures()[0]){
          // this.setState({pictureId: PictureStore.getPictures()[0].id});
        }
      }
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
      var width;
      var height;
      var appNavHeight = 86;
      var windowHeight = window.innerHeight - appNavHeight;
      var windowWidth = window.innerWidth;

      if(windowHeight < window.innerWidth){
        width = height = windowHeight < 640 ? windowHeight : 640;
      }
      else {
        width = height = windowWidth < 640 ? windowWidth : 640;
      }
    this.mosaic = new Mosaic({canvasId: "canvas",
                  imageUrls: imageUrls,
                  width: width,
                  height: height,
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
    var deets = null;
    if(picture) {
      deets = (
        <div className="modal-deets">
          <IndexItemHeader user={picture.owner} />
          <IndexItemFooter picture={picture} />
        </div>
      ); //deets = null;
    }
    // var iih, iif;
    // if(picture){
    //   iih = <IndexItemHeader user={picture.owner} />;
    //   iif = <IndexItemFooter picture={picture} />;
    // }else {
    //   iih = "";
    //   iif = "";
    // }
    return (
      <div className="modal-components">

        <div className="pic-index-pic">
          {loading}
          <canvas id="canvas"></canvas>
        </div>
        {deets}

      </div>
    );
  }
});

module.exports = PictureIndexItem;

// {imgTag(this.props.picture.public_id, {scale: {width: 640, height: 640}})}
